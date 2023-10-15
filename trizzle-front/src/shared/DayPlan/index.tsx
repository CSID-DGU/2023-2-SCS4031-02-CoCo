import React from "react";
import * as S from "./DayPlan.style";

type DayPlanProps = {
  onPlaceClick: (day:number) => void;
  onKeywordClick: (day:number) => void;
  dayPlan: dayPlan;
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
        place.hasOwnProperty('y') && place.hasOwnProperty('x') ? (
          <S.PlaceContainer key={index}>
            <S.PlaceLogo>

            </S.PlaceLogo>
            <S.PlaceInfo>
              <S.PlaceName>{place.place_name}</S.PlaceName>
              <S.PlaceAddress>{place.address_name}</S.PlaceAddress>
            </S.PlaceInfo>
          </S.PlaceContainer>
        ) : (
          <S.PlaceContainer>
            <img src={place.src} alt="keywordImg"/>
          </S.PlaceContainer>
        )
      ))}
      <S.PlusButtonContainer>
        <S.AddButton onClick={() => props.onPlaceClick(props.dayPlan.day)}>장소 추가</S.AddButton>
        <S.AddButton onClick={() => props.onKeywordClick(props.dayPlan.day)}>키워드 추가</S.AddButton>
      </S.PlusButtonContainer>
    </S.DayPlanContainer>
  )
};

export default DayPlan;