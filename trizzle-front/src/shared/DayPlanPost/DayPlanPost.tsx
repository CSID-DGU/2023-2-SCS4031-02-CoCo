import React, { useEffect, useState } from "react";
import * as S from './DayPlanPost.styles';

import { PiDotsThree } from 'react-icons/pi';
import logo from '../../assets/logo/nonTextLogo.svg'
import { Link } from "react-router-dom";
import res from "src/assets/keywords/trans.svg"
import trans from "../../assets/keywords/trans.svg"
import rest from "../../assets/keywords/rest.svg"
import shopping from "../../assets/keywords/shopping.svg"
import NullList from "../../components/NullList";

type DayPlanPostProps = {
  type?: string;
  planId?: string;
  dayList: any;
  selectDay: number;
  onNewPostPlace?: (day: number, value: any) => void;
  onConnectPostPlace?: (day: number, value: any) => void;
  onDeleteConnect?: (day: number, value: any) => void;
  
}

const KeywordList: { keyword: string; src: string; }[] = [
  { keyword: "식사", src: res },
  { keyword: "이동", src: trans },
  { keyword: "휴식", src: rest },
  { keyword: "쇼핑", src: shopping },
];

const DayPlanPost: React.FC<DayPlanPostProps> = (props: DayPlanPostProps) => {
  const [data, setData] = useState<any>([]);
  const [isDdetailOpen, setIsDdetailOpen] = useState<any>([]);

  const openAndCloseDetail = (idx: number, innerIdx: number) => {
    const newArray = [...isDdetailOpen];
    newArray[idx][innerIdx] = !newArray[idx][innerIdx];
    setIsDdetailOpen(newArray);
  }

  useEffect(() => {
    setData(props.dayList);
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
              <div key={index}>
                <S.DayContainer key={index}>
                  {plans.day}일차
                </S.DayContainer>
                {plans.placeList.length === 0 ? (
                  <NullList content="공유된 일정이 없습니다" />
                ) : (
                  plans.placeList.map((place: any, innerIndex: number) => (
                    <div key={innerIndex}>
                      {place.review && place.review !== null ? (
                        <Link to={`/post/places/${place.review.id}`} target="_blank">
                          <S.PlacePostContainer>
                            <div style={{ width: '100%', height: '100%' }}>
                              {
                                place.review.thumbnail === '' ?
                                  <S.PlaceLogo>
                                    <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
                                  </S.PlaceLogo>
                                  :
                                  <S.PlaceImage src={place.review.thumbnail} alt="image" />
                              }
                              <S.PlaceInfo>
                                <S.PlaceName>{place.review.reviewTitle}</S.PlaceName>
                                <S.PlacePostName>{place.review.place.placeName}</S.PlacePostName>
                              </S.PlaceInfo>
                            </div>
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
                    </div>
                  )))}
              </div>
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
              <div key={index}>
                <S.DayContainer>
                  {plans.day}일차
                </S.DayContainer>
                {plans.placeList.length === 0 ? (
                  <NullList content="공유된 일정이 없습니다" />
                ) : (plans.placeList.map((place: any, innerIndex: number) =>
                  <div key={innerIndex}>
                    {place.review && place.review !== null ? (
                      <S.PlacePostNoneContainer>
                        <div style={{ width: '100%', height: '100%' }}>
                          {
                            place.review.thumbnail === '' ?
                              <S.PlaceLogo>
                                <img src={logo} alt="logo" style={{ width: "2.2rem", height: "auto" }} />
                              </S.PlaceLogo>
                              :
                              <S.PlaceImage src={place.review.thumbnail} alt="image" />
                          }
                          <S.PlaceInfo>
                            <S.PlaceName>{place.review.reviewTitle}</S.PlaceName>
                            <S.PlacePostName>{place.review.place.placeName}</S.PlacePostName>
                          </S.PlaceInfo>
                        </div>
                        <S.ModifyButton onClick={() => openAndCloseDetail(index, innerIndex)}>
                          변경
                          {isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                            <S.ToggleButtonContainer>
                              <S.ToggleButtonOption onClick={() => {
                                if (props.onNewPostPlace) {
                                  props.onNewPostPlace(plans.day, data[index].placeList[innerIndex]);
                                  openAndCloseDetail(index, innerIndex);
                                }
                              }}>
                                새 리뷰 작성
                              </S.ToggleButtonOption>
                              <S.ToggleButtonOption onClick={() => {
                                if (props.onConnectPostPlace) {
                                  props.onConnectPostPlace(plans.day, data[index].placeList[innerIndex]);
                                  openAndCloseDetail(index, innerIndex);
                                }
                              }}>
                                리뷰 불러오기
                              </S.ToggleButtonOption>
                              <S.ToggleButtonOption onClick={() => {
                                if (props.onDeleteConnect) {
                                  props.onDeleteConnect(plans.day, data[index].placeList[innerIndex]);
                                  openAndCloseDetail(index, innerIndex);
                                }
                              }}>
                                연동 해제
                              </S.ToggleButtonOption>
                            </S.ToggleButtonContainer>
                          }
                        </S.ModifyButton>
                      </S.PlacePostNoneContainer>
                    ) : (
                      place.keyword !== null ? (
                        <S.PlaceContainer key={innerIndex} type={true}>
                          <div>
                            <img src={KeywordList.filter((item) => item.keyword === place.keyword)[0].src} alt="keywordImg" style={{ width: "4rem", height: "auto" }} />
                            <S.PlaceAddress style={{ width: "auto", marginLeft: "0.4rem" }}>{place.keyword}</S.PlaceAddress>
                          </div>
                        </S.PlaceContainer>
                      ) : (
                        <S.PlaceContainer key={innerIndex} >
                          <S.ThreeDotsButton onClick={() => openAndCloseDetail(index, innerIndex)}>
                            <PiDotsThree size={25} />
                            {isDdetailOpen[index] && isDdetailOpen[index][innerIndex] &&
                              <S.ToggleButtonContainer2>
                                <S.ToggleButtonOption onClick={() => {
                                  if (props.onNewPostPlace) {
                                    props.onNewPostPlace(plans.day, data[index].placeList[innerIndex]);
                                    openAndCloseDetail(index, innerIndex);
                                  }
                                }}>
                                  새 리뷰 작성
                                </S.ToggleButtonOption>
                                <S.ToggleButtonOption onClick={() => {
                                  if (props.onConnectPostPlace) {
                                    props.onConnectPostPlace(plans.day, data[index].placeList[innerIndex]);
                                    openAndCloseDetail(index, innerIndex);
                                  }
                                }}>
                                  리뷰 불러오기
                                </S.ToggleButtonOption>
                              </S.ToggleButtonContainer2>
                            }
                          </S.ThreeDotsButton>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <S.PalceText>
                              {place.placeName}
                            </S.PalceText>
                          </div>
                        </S.PlaceContainer>
                      )
                    )}
                  </div >
                ))}
              </div>
            ))}
          </>
        )
      }
  }
}

export default DayPlanPost;