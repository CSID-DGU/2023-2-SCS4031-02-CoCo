import React,{useState, useEffect} from "react";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import Page from "../Page";
import * as S from "./AddPlan.styles";
import KeywordModal from "../../shared/KeywordModal";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import { koreaRegions } from "../../utils/mapData";
import DayPlan from "../../shared/DayPlan";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import { tripThema } from "../../utils/tripThema";
import DatePicker, {CustomInput} from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";
import PlanMap from "../../shared/PlanMap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


type dayPlan = {
  day: number;
  placeList: any[];
}

const AddPlanPage = () => {
  const [allDay, setDay] = useState(3); //기본으로 3일 지정
  const [placeList, setPlaceList] = useState<dayPlan[]>([{day:1, placeList:[]}, {day:2, placeList:[]}, {day:3, placeList:[]}]); //기본 3일이기 때문에
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [region, setRegion] = useState<any>(koreaRegions[0]);
  const [thema, setThema] = useState<any[]>([]);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [addClickDay, setAddClickDay] = useState<number>(0);
  const [center, setCenter] = useState<any>(region.center);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>();
  const navigate = useNavigate();


  const onPlaceAddButtonClick = (place:any, day:number) => {
    const updatedPlaceList = placeList.map((dayPlan) => {
      if(day === 0) {
        if(dayPlan.day === allDay) {
          return {
            day: allDay,
            placeList: [...dayPlan.placeList, place],
          }} else {
          return dayPlan;
          }
      }else if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: [...dayPlan.placeList, place],
        }
      } else {
        return dayPlan;
      }
    })
    setPlaceList(updatedPlaceList);
    setIsSearchModalOpen(!isSearchModalOpen);
    setCenter({lat: place.y, lng: place.x});
  }

  useEffect(() => {
    const furturDate = new Date(startDate);
    furturDate.setDate(furturDate.getDate() + allDay);
    const formattedDate = furturDate.toISOString().slice(0, 10);
    setEndDate(formattedDate);
  
  }, [startDate, allDay]);

  const onKeywordAddButtonClick = (keyword:string, day:number) => {
    const updatedPlaceList = placeList.map((dayPlan) => {
      if(day === 0) {
        if(dayPlan.day === allDay){
        return {
          day: allDay,
          placeList: [...dayPlan.placeList, keyword],
        }
      } else {
        return dayPlan;
      }
      } else if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: [...dayPlan.placeList, keyword],
        }
      } else {
        return dayPlan;
      }
    })
    setPlaceList(updatedPlaceList);
    setIsKeywordModalOpen(!isKeywordModalOpen);
  };


  const onDayPlusButtonClick = () => {
    setDay(allDay+1);
    setPlaceList((prev) => [...prev, {day:allDay+1, placeList:[]}]);
  };


  
  const onThemaBadgeClick = (select: any) => {
    // 선택한 아이템이 thema 배열에 이미 존재하는지 확인
    const itemExists = thema.some((item) => item.id === select.id);
  
    if (itemExists) {
      // 이미 선택한 아이템이 있는 경우, 해당 아이템을 제거
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      setThema((prev) => [...prev, select]);
    }
  };
  
  const onDeleteButtonClick = (place:any, day:number, index:number) => {
    const updatePlaceList = placeList.map((dayPlan) => {
      if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: dayPlan.placeList.filter((_, idx) => idx !== index),}
      } else {
        return dayPlan;
      }
    });
    setPlaceList(updatePlaceList);
  }

  const onSubmitButtonClick = () => {
    if(title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if(thema.length === 0) {
      alert("여행 테마를 선택해주세요.");
      return;
    };

    const submitData = {
      plan_id:Math.floor(Math.random() * 1000000000) + 1,
      plan_name: title,
      plan_start_date: startDate,
      plan_end_date: endDate,
      plan_location: region.name,
      plan_theme: thema,
      content: placeList
    }
    localStorage.setItem("submitData", JSON.stringify(submitData));
    navigate(`/myfeed/plans/${submitData.plan_id}}`);
  };


  return (
    <Page headersProps={{isHome:false, isLogin:true}}>
      <S.PageTitleContainer>
        <S.PageTitle>나만의 일정 등록</S.PageTitle>
      </S.PageTitleContainer>
      {/* <form> */}
        <S.ButtonContainer>
          {/* <S.Button>임시저장</S.Button> */}
          <S.Button onClick={onSubmitButtonClick}>저장</S.Button>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{width: "100%"}} id="title" onChange={(event) => setTitle(event.target.value)} value={title}/>
          <S.HorizontalContainer>
            <S.SelectTitle>지역</S.SelectTitle>
            <DropdownMenu name={region.name} items={koreaRegions} onClick={(region) => {setRegion(region); setCenter(region.center)}}/>
            <S.PlanDateContainer>
            <S.SelectTitle >여행기간</S.SelectTitle>
            <DatePicker setStartDate={setStartDate} startDate={startDate}/>
            <div style={{color:"#7e7e7e", margin:"0 0.5rem 0 0.3rem", fontSize:"1.3rem"}}>~</div>
            <CustomInput value={endDate} onClick={() => {}}/>
            </S.PlanDateContainer>
          </S.HorizontalContainer>
          <S.HorizontalContainer>
            <S.SelectTitle>여행테마</S.SelectTitle>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
          </S.HorizontalContainer>
          <S.HorizontalLine/>
          </S.FormContainer>
          <PlanMap selectDay={selectDay} setSelectDay={setSelectDay} placeList={placeList} center={center} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen} isKeywordModalOpen={isKeywordModalOpen} setIsKeywordModalOpen={setIsKeywordModalOpen} onDayPlusButtonClick={onDayPlusButtonClick} setAddClickDay={setAddClickDay} page="add"/>
          <DragDropContext onDragEnd={(result) => {
            if (!result.destination) return;
            const { source, destination } = result;
            const sourceDay = source.droppableId; // source에서 dayPlan의 day를 얻음
            const destDay = destination.droppableId; // destination에서 dayPlan의 day를 얻음
          
            const updatePlaceList = placeList.map((dayPlan) => {
              if (dayPlan.day === Number(sourceDay)) {
                // source의 dayPlan 찾기
                const placeList = [...dayPlan.placeList];
                const [removed] = placeList.splice(source.index, 1);
                // source에서 아이템 제거
          
                if (dayPlan.day === Number(destDay)) {
                  // 같은 dayPlan으로 이동하는 경우
                  placeList.splice(destination.index, 0, removed);
                  // 해당 위치에 아이템 삽입
                }
          
                return {
                  day: dayPlan.day,
                  placeList: placeList,
                };
              } else if (dayPlan.day === Number(destDay)) {
                // destination의 dayPlan 찾기
                const placeList = [...dayPlan.placeList];
                placeList.splice(destination.index, 0, removed);
                // 해당 위치에 아이템 삽입
          
                return {
                  day: dayPlan.day,
                  placeList: placeList,
                };
              } else {
                return dayPlan;
              }
            });
          
            setPlaceList(updatePlaceList);
          }
          }>
          <HorizontalScrollContainer moveDistance={200}>
            {placeList.map((dayPlan, index) => (
              <Droppable key={index} droppableId={`${dayPlan.day}`}>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    <Draggable draggableId={`${dayPlan.day}`} index={index}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps} 
                        >
                          <DayPlan isPlan={true} key={index} onPlaceClick={(day) => {setAddClickDay(day); setIsSearchModalOpen(!isSearchModalOpen)}} onKeywordClick={(day) => {setAddClickDay(day); setIsKeywordModalOpen(!isKeywordModalOpen)}} dayPlan={dayPlan} onDeleteClick={(place, day, index) => onDeleteButtonClick(place, day, index)} />
                          </div>
                      )}
                    </Draggable>
              </div>
                )}
              </Droppable>
            ))}
          </HorizontalScrollContainer>
          </DragDropContext>
      {/* </form> */}

      <div style={{height:"10rem"}}/>
      {isSearchModalOpen && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace, addClickDay)} center={region.center} onCloseClick={() => setIsSearchModalOpen(!isSearchModalOpen)}/>
      }
      {isKeywordModalOpen && <KeywordModal onAddButtonClick={(seletedKeyword) => onKeywordAddButtonClick(seletedKeyword, addClickDay)} onCloseClick={() => setIsKeywordModalOpen(!isKeywordModalOpen)}/>
      }
    </Page>
  );

};

export default AddPlanPage;