import React,{useState} from "react";
import * as S from "./DayPlan.style";
import logo from "../../assets/logo/nonTextLogo.svg"
import {AiOutlineEllipsis} from "react-icons/ai";
import DayPlace from "./DayPlace";

type DayPlanProps = {
  onPlaceClick: (day:number) => void;
  onKeywordClick: (day:number) => void;
  dayPlan: dayPlan;
  isPlan: boolean;
  isPost?: boolean;
  onPostClick?: () => void;
  onDeleteClick: (place:any, day:number) => void;
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
        <DayPlace key={index} place={place} day={props.dayPlan.day} isPlan={props.isPlan} isPost={props.isPost} onPostClick={props.onPostClick} onDeleteClick={(place, day) => props.onDeleteClick(place, day)}/>
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