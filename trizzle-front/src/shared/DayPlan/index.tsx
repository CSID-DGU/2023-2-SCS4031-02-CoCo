import React from "react";
import * as S from "./DayPlan.style";
import DayPlace from "./DayPlace";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import { useOnPlaceDragEnd } from "../../recoil/PlanList";
import {PlanListState} from "../../recoil/PlanList/selector";
import { useRecoilValue } from "recoil";
import Menu from "../../components/Menu";

//Drag & Drop 가능하도록 수정 예정

type DayPlanProps = {
  onPlaceClick: (day:number) => void;
  onKeywordClick: (day:number) => void;
  isPlan: boolean;
  isPost?: boolean;
  onPostClick?: () => void;
  onDeleteClick: (place:any, day:number, index:number) => void;
  onDayDeleteClick: (day:any) => void;
}


const DayPlan: React.FC<DayPlanProps> = (props: DayPlanProps) => {
  const onPlaceDragEnd = useOnPlaceDragEnd();
  const placeList = useRecoilValue(PlanListState);
  // const [open, setOpen] = useState<boolean[]>([]);

  // useEffect(() => {
  //   let array = [];

  //   for(let i=0; i<placeList.length; i++) {
  //     array.push(false);
  //   };
  //   setOpen(array);
  // },[placeList]);

  // const onOpen = (index:number) => {
  //   const newOpen = open.map((_, idx) => {
  //     if(idx === index) return !open[idx];
  //     else return open[idx];
  // })
  // setOpen(newOpen);
  // }

  // const onDayDelete = (day:number) => {
  //   props.onDayDeleteClick(day)
  // }



  return(
    <DragDropContext onDragEnd={(result) => onPlaceDragEnd(result, placeList)}>
      <HorizontalScrollContainer moveDistance={200}>
        {placeList.map((dayPlan) => (
          <S.DayPlanContainer>
            <S.DayPlanTitle>{dayPlan.day}일차
            <Menu item={[{ content: "삭제", onClick: () => props.onDayDeleteClick(dayPlan.day), isDelete: true }]} />
                {/* <AiOutlineEllipsis size="1.5rem" className='menu' onClick={() => {
                  onOpen(index);
                }}/>
              {open[index] && (
                <S.MenuContainer>
                    <S.MenuItem delete={true} onClick={() => { props.onDayDeleteClick(dayPlan.day); onOpen(index) }}>삭제</S.MenuItem>
                </S.MenuContainer>

              )} */}
            </S.DayPlanTitle>
            {dayPlan.placeList.length > 0 && dayPlan.placeList.map((place:any, index:number) => (
              <Droppable droppableId={`${dayPlan.day}-${index}`} key={index} type="ITEM">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{width: "100%", height:"auto"}} key={`${dayPlan.day}-${index}`}>
                    <Draggable draggableId={`${dayPlan.day}-${index}`} index={index} key={`${dayPlan.day}-${index}`}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                          <DayPlace key={`${dayPlan.day}-${index}`} place={place} day={dayPlan.day} isPlan={props.isPlan} isPost={props.isPost} onPostClick={props.onPostClick} index={index} onDeleteClick={(place, day, index) => props.onDeleteClick(place, day, index)}/>
                        </div>
                      )}
                    </Draggable>
                  </div>
                )}
              </Droppable>
            ))
            }
            <Droppable droppableId={`${dayPlan.day}-${dayPlan.placeList.length}`} key={dayPlan.placeList.length} type="ITEM">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{width: "100%"}}>
                  <S.PlusButtonContainer>
                    <S.AddButton onClick={() => props.onPlaceClick(dayPlan.day)} type="button">장소 추가</S.AddButton>
                    <S.AddButton onClick={() => props.onKeywordClick(dayPlan.day)} type="button">키워드 추가</S.AddButton>
                  </S.PlusButtonContainer>
                </div>
              )}
            </Droppable>
          </S.DayPlanContainer>
        ))}
      </HorizontalScrollContainer>
    </DragDropContext>
  )
};

export default DayPlan;