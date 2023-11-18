import React, { useEffect, useState } from "react";
import * as S from './DayPlanPost.styles';

import { PiDotsThree } from 'react-icons/pi';
import logo from '../../assets/logo/nonTextLogo.svg'


type DayPlanPostProps = {
  planId?: string;
  dayList: any;
  selectDay: number;
  onNewPostPlace?: (value: any) => void;
  onConnetPostPlace?: (value: any) => void;
}

const DayPlanPost: React.FC<DayPlanPostProps> = (props: DayPlanPostProps) => {
  const [data, setData] = useState<any>([]);
  const [isDdetailOpen, setIsDdetailOpen] = useState<any>([])

  const openDetail = (idx: number, innerIdx: number) => {
    const newArray = [...isDdetailOpen];
    newArray[idx][innerIdx] = !newArray[idx][innerIdx];
    setIsDdetailOpen(newArray);
  }

  useEffect(() => {
    console.log(props.dayList);
    setData(props.dayList);
  }, [props.dayList]);

  useEffect(() => {
    if (data && data.length !==0 ) {
      setIsDdetailOpen(Array.from({ length: data.length }, () =>
        Array.from({ length: data[0].placeList.length }, () => false)));
    }
  }, [data]);

  if (!(data && data.length)) {
    return (
      <div>정해진 일정이 없습니다.</div>
    )
  } else {
    return (
      <>
        {data.map((plans: any, index: number) => (
          <>
            <S.DayContainer key={index}>
              {plans.day}일차
            </S.DayContainer>
            {plans.placeList.map((place: any, innerIndex: number) => (
              <div>
                {place.planId === props.planId ? (
                  <S.PlacePostContainer>
                    <S.ThreeDotsButton >
                      수정
                      {
                        isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                        <S.ToggleButtonContainer>
                          <S.ToggleButtonOption onClick={() => props.onNewPostPlace(data[index].placeList[innerIndex])}>새 게시글 작성</S.ToggleButtonOption>
                          <S.ToggleButtonOption onClick={() => props.onConnetPostPlace(data[index].placeList[innerIndex])}>게시글 불러오기</S.ToggleButtonOption>
                        </S.ToggleButtonContainer>
                      }
                    </S.ThreeDotsButton>
                    <S.PlaceLogo>
                      <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
                    </S.PlaceLogo>
                    <S.PlaceInfo>
                      <S.PlaceName>리뷰 제목이라네!!</S.PlaceName>
                      <S.PlacePostName>{place.placeName}</S.PlacePostName>
                    </S.PlaceInfo>
                  </S.PlacePostContainer>
                ) : (
                  <S.PlaceContainer key={innerIndex}>
                    <S.ThreeDotsButton onClick={() => openDetail(index, innerIndex)}>
                      <PiDotsThree size={20} />
                      {
                        isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                        <S.ToggleButtonContainer>
                          <S.ToggleButtonOption onClick={() => props.onNewPostPlace(data[index].placeList[innerIndex])}>새 게시글 작성</S.ToggleButtonOption>
                          <S.ToggleButtonOption onClick={() => props.onConnetPostPlace(data[index].placeList[innerIndex])}>게시글 불러오기</S.ToggleButtonOption>
                        </S.ToggleButtonContainer>
                      }
                    </S.ThreeDotsButton>
                    <S.PalceText>
                      {place.placeName}
                    </S.PalceText>
                  </S.PlaceContainer>
                )}
              </div>
            ))}
          </>
        ))}
      </>
    )
  }
}

export default DayPlanPost;