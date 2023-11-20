import React, { useEffect, useState } from "react";
import * as S from './DayPlanPost.styles';

import { PiDotsThree } from 'react-icons/pi';
import logo from '../../assets/logo/nonTextLogo.svg'


type DayPlanPostProps = {
  type?: string;
  planId?: string;
  dayList: any;
  selectDay: number;
  onNewPostPlace?: (value: any) => void;
  onConnetPostPlace?: (day: number, value: any) => void;
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
    setData(props.dayList);
    console.log("epdlxj", props.dayList);
  }, [props.dayList]);

  useEffect(() => {
    if (data && data.length !== 0) {
      setIsDdetailOpen(Array.from({ length: data.length }, () =>
        Array.from({ length: data[0].placeList.length }, () => false)));
    }
  }, [data]);

  switch (props.type) {
    case 'post':
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
                    {Object.prototype.hasOwnProperty.call(place, 'review') ? (
                      <Link to={`${import.meta.env.VITE_PUBLIC_URL}/post/places/${place.reviewId}`} target="_blank"> {/**잠시 고민 좀 해봐야겠어 */}
                        <S.PlacePostContainer>
                          <S.PlaceLogo>
                            <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
                          </S.PlaceLogo>
                          <S.PlaceInfo>
                            <S.PlaceName>리뷰 제목이라네!!</S.PlaceName>
                            <S.PlacePostName>{place.placeName}</S.PlacePostName>
                          </S.PlaceInfo>
                        </S.PlacePostContainer>
                      </Link>
                    ) : (
                      place.keyword !== null ? (
                        <S.PlaceContainer key={innerIndex} type={true}>
                          <img src={KeywordList.filter((item) => item.keyword === place.keyword)[0].src} alt="keywordImg" style={{ width: "4rem", height: "auto" }} />
                          <S.PlaceAddress style={{ width: "auto", marginLeft: "0.4rem" }}>{place.keyword}</S.PlaceAddress>
                        </S.PlaceContainer>
                      ) : (
                        <S.PlaceContainer key={innerIndex} >
                          <S.PalceText>
                            {place.placeName}
                          </S.PalceText>
                        </S.PlaceContainer>
                      )
                    )}
                  </div >
                ))}
              </>
            ))
            }
          </>
        )
      }
    default:
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
                    {Object.prototype.hasOwnProperty.call(place, 'review') ? (
                      <S.PlacePostContainer>
                        <S.ThreeDotsButton >
                          수정
                          {
                            isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                            <S.ToggleButtonContainer>
                              {/* <S.ToggleButtonOption onClick={() => props.onNewPostPlace(data[index].placeList[innerIndex])}>새 게시글 작성</S.ToggleButtonOption> */}
                              <S.ToggleButtonOption onClick={() => props.onConnetPostPlace(plans.day, data[index].placeList[innerIndex])}>게시글 불러오기</S.ToggleButtonOption>
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
                      place.keyword !== null ? (
                        <S.PlaceContainer key={innerIndex} type={true}>
                          <img src={KeywordList.filter((item) => item.keyword === place.keyword)[0].src} alt="keywordImg" style={{ width: "4rem", height: "auto" }} />
                          <S.PlaceAddress style={{ width: "auto", marginLeft: "0.4rem" }}>{place.keyword}</S.PlaceAddress>
                        </S.PlaceContainer>
                      ) : (
                        <S.PlaceContainer key={innerIndex} >
                          <S.ThreeDotsButton onClick={() => openDetail(index, innerIndex)}>
                            <PiDotsThree size={20} />
                            {
                              isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                              <S.ToggleButtonContainer>
                                {/* <S.ToggleButtonOption onClick={() => props.onNewPostPlace(data[index].placeList[innerIndex])}>새 게시글 작성</S.ToggleButtonOption> */}
                                <S.ToggleButtonOption onClick={() => props.onConnetPostPlace(plans.day, data[index].placeList[innerIndex])}>게시글 불러오기</S.ToggleButtonOption>
                              </S.ToggleButtonContainer>
                            }
                          </S.ThreeDotsButton>
                          <S.PalceText>
                            {place.placeName}
                          </S.PalceText>
                        </S.PlaceContainer>
                      )
                    )}
                  </div >
                ))}
              </>
            ))
            }
          </>
        )
      }
  }
}

export default DayPlanPost;

