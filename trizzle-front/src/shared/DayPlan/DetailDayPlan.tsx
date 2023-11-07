import React,{useState} from "react";
import * as S from "./DayPlan.style";
import DayPlace from "./DayPlace";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

//Drag & Drop 가능하도록 수정 예정

type DayPlanProps = {
  dayPlan: dayPlan;
  isPlan: boolean;
  isPost?: boolean;
  onPostClick?: () => void;
  onDayPlaceClick?: (day:number) => void;
  handleDragEnd?: (result:any) => void;
  handleDragStart?: (result:any) => void;
}

type dayPlan = {
  day: number;
  placeList: any[];
}

const DetailDayPlan: React.FC<DayPlanProps> = (props: DayPlanProps) => {
  
  return(
    <S.DayPlanContainer>
        <S.DayPlanTitle>{props.dayPlan.day}일차</S.DayPlanTitle>
        {props.dayPlan.placeList.length > 0 && props.dayPlan.placeList.map((place, index) => (
          <DayPlace key={index} place={place} day={props.dayPlan.day} isPlan={props.isPlan} isPost={props.isPost} onPostClick={props.onPostClick} index={index} />
        ))
        }
    </S.DayPlanContainer>
  )
};

export default DetailDayPlan;