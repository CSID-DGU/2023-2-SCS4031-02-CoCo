import {  useSetRecoilState } from "recoil";
import { PlanListState } from "./selector";


const addPlaceToPlan = (place:any, day:number, planList:any, allDay:number) => {
  const updatedPlaceList = planList.map((dayPlan:any) => {
    if(day === 0) {
      if(dayPlan.day === allDay) {
        return {
          day: allDay,
          place_list: [...dayPlan.place_list, place],
        }} else {
        return dayPlan;
        }
    }else if(dayPlan.day === day) {
      return {
        day: dayPlan.day,
        place_list: [...dayPlan.place_list, place],
      }
    } else {
      return dayPlan;
    }
  })
  return updatedPlaceList;
};

export const useAddPlaceToPlan = () => {
  const setPlanList = useSetRecoilState(PlanListState);
  const addPlace = (place:any, day:number, planList:any, allDay:number) => {
    const updatedPlaceList = addPlaceToPlan(place, day, planList, allDay);
    setPlanList(updatedPlaceList);
  };
  return addPlace;
};


const deletePlaceFromPlan = (place:any, day:number, planList:any, index:number) => {
  const updatedPlaceList = planList.map((dayPlan:any) => {
    if(dayPlan.day === day) {
      return {
        day: dayPlan.day,
        place_list: dayPlan.place_list.filter((placeItem:any, idx:any) => idx !== index),
      }
    } else {
      return dayPlan;
    }
  })
  return updatedPlaceList;
}

export const useDeletePlaceFromPlan = () => {
  const setPlanList = useSetRecoilState(PlanListState);
  const deletePlace = (place:any, day:number, planList:any, index:number) => {
    const updatedPlaceList = deletePlaceFromPlan(place, day, planList, index);
    setPlanList(updatedPlaceList);
  };
  return deletePlace;
};

const onPlaceDragEnd = (result:any, planList:any) => {
  
  if(!result.destination) return planList;
  const {source, destination} = result;
  const sourceDay = source.droppableId.split('-')[0];
  const destinationDay = destination.droppableId.split('-')[0];
  const sourceIndex = source.droppableId.split('-')[1];
  const destinationIndex = destination.droppableId.split('-')[1];
  const place = planList[Number(sourceDay)-1].place_list[sourceIndex];

  if(sourceDay === destinationDay && sourceIndex === destinationIndex) {
    return planList;
  };

  if(sourceDay === destinationDay && sourceIndex !== destinationIndex) {
    const updatedPlaceList = planList.map((dayPlan:any) => {
      if(dayPlan.day === Number(sourceDay)){
        const newPlaceList = [...dayPlan.place_list];
        newPlaceList.splice(Number(destinationIndex), 0, newPlaceList.splice(Number(sourceIndex), 1)[0]);
        return {
          day: dayPlan.day,
          place_list: newPlaceList,
        }
      } else {
        return dayPlan;
      }
    });
    return updatedPlaceList;
  }

  const updatedPlaceList = planList.map((dayPlan:any) => {
    if(dayPlan.day === Number(sourceDay)){
      return {
        day: dayPlan.day,
        place_list: dayPlan.place_list.filter((placeItem:any, idx:any) => {return idx !== Number(sourceIndex)}),
      }
    } else if(dayPlan.day === Number(destinationDay)) {
      console.log(dayPlan.place_list);
      if(dayPlan.place_list.length === 0) {
        return {
          day: dayPlan.day,
          place_list: [place],
        }
      }
      const newPlaceList = [...dayPlan.place_list];
      newPlaceList.splice(Number(destinationIndex), 0, place);
      return {
        day: dayPlan.day,
        place_list: newPlaceList,
      }
    } else {
      return dayPlan;
    }
  });
  return updatedPlaceList;
};

export const useOnPlaceDragEnd = () => {
  const setPlanList = useSetRecoilState(PlanListState);
  const onDragEnd = (result:any, planList:any[]) => {
    const updatedPlaceList = onPlaceDragEnd(result, planList);
    setPlanList(updatedPlaceList);
  };
  return onDragEnd;
};

export const deleteDay = (day:number, planList:any) => {
  const filteredPlanList = planList.filter((dayPlan:any) => dayPlan.day !== day );
  const updatePlanList = filteredPlanList.map((dayPlan:any, index:number) => {
    if(dayPlan.day < day) {
      return {
        day : dayPlan.day,
        place_list: dayPlan.place_list,
      }}
      else {
      return {
        day: dayPlan.day -1,
        place_list : dayPlan.place_list,
      }
    }
  });

  return updatePlanList;

};

export const useDeleteDay = () => {
  const setPlanList = useSetRecoilState(PlanListState);
  const deleteDayPlan = (day:number, planList:any) => {
    const updatePlanList = deleteDay(day, planList);
    setPlanList(updatePlanList);
  }
  return deleteDayPlan;
}