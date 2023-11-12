import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PiDotsThree } from 'react-icons/pi';

import * as S from './DayPlanPost.styles';
type DayPlanPostProps = {
  dayList: any;
  selectDay: number;
  onNewPostPlace?: (value: any) => void;
  onConnetPostPlace?: (value: any) => void;
}

const DayPlanPost: React.FC<DayPlanPostProps> = (props: DayPlanPostProps) => {
  const [data, setData] = useState<any>(props.dayList);
  const [isDdetailOpen, setIsDdetailOpen] = useState<any>(Array.from({ length: data.length }, () =>
    Array.from({ length: data[0].placeList.length }, () => false)))

  const openDetail = (idx: number, innerIdx: number) => {
    const newArray = [...isDdetailOpen];
    newArray[idx][innerIdx] = !newArray[idx][innerIdx];
    setIsDdetailOpen(newArray);
  }

  return (
    <>
      {props.dayList.map((plans, index) => (
        <>
          <S.DayContainer key={index}>
            {plans.day}일차
          </S.DayContainer>
          {plans.placeList.map((place: number, innerIndex: number) => (
            <div>
              <S.PalceContainer key={innerIndex}>
                <S.ThreeDotsButton onClick={() => openDetail(index, innerIndex)}>
                  <PiDotsThree size={20} />
                  {
                    isDdetailOpen[index][innerIndex] &&
                    <S.ToggleButtonContainer>
                      <S.ToggleButtonOption onClick={() => props.onNewPostPlace(data[index].placeList[innerIndex])}>새 게시글 작성</S.ToggleButtonOption>
                      <S.ToggleButtonOption onClick={() => props.onConnetPostPlace(data[index].placeList[innerIndex])}>게시글 불러오기</S.ToggleButtonOption>
                    </S.ToggleButtonContainer>
                  }
                </S.ThreeDotsButton>
                <S.PalceText>
                  {place.place_name}
                </S.PalceText>
              </S.PalceContainer>
            </div>
          ))}
        </>
      ))}
    </>
  )
}

export default DayPlanPost;