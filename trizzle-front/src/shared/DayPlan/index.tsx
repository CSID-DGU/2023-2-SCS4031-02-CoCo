import React,{useState} from "react";
import React,{useState} from "react";
import * as S from "./DayPlan.style";
import DayPlace from "./DayPlace";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

//Drag & Drop 가능하도록 수정 예정

type DayPlanProps = {
  onPlaceClick: (day:number) => void;
  onKeywordClick: (day:number) => void;
  dayPlan: dayPlan;
  isPlan: boolean;
  isPost?: boolean;
  onPostClick?: () => void;
  onDeleteClick: (place:any, day:number, index:number) => void;
}

type dayPlan = {
  day: number;
  placeList: any[];
}

const DayPlan: React.FC<DayPlanProps> = (props: DayPlanProps) => {


  return(
    <S.DayPlanContainer>


      <S.DayPlanTitle>{props.dayPlan.day}일차</S.DayPlanTitle>
      {props.dayPlan.placeList.length > 0 && props.dayPlan.placeList.map((place, index) => (
        <DayPlace key={index} place={place} day={props.dayPlan.day} isPlan={props.isPlan} isPost={props.isPost} onPostClick={props.onPostClick} index={index} onDeleteClick={(place, day, index) => props.onDeleteClick(place, day, index)}/>
      ))
      }
        <DayPlace key={index} place={place} day={props.dayPlan.day} isPlan={props.isPlan} isPost={props.isPost} onPostClick={props.onPostClick} index={index} onDeleteClick={(place, day, index) => props.onDeleteClick(place, day, index)}/>
      ))
      }
      <S.PlusButtonContainer>
        <S.AddButton onClick={() => props.onPlaceClick(props.dayPlan.day)} type="button">장소 추가</S.AddButton>
        <S.AddButton onClick={() => props.onKeywordClick(props.dayPlan.day)} type="button">키워드 추가</S.AddButton>
      </S.PlusButtonContainer>
    </S.DayPlanContainer>
  )
};

export default DayPlan;