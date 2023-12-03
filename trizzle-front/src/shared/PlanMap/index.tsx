import * as S from "./PlanMap.style";
import React, { useState, useEffect } from "react";
import Maps from "../../components/KakaoMap";
import { AiOutlinePlus } from "react-icons/ai";
import DayMarker from "../../components/KakaoMap/DayMarker";
import Menu from "../../components/Menu";

type PlanMapProps = {
  selectDay: number;
  setSelectDay: (day: number) => void;
  placeList: any[];
  // markerList: any[];
  center: any;
  isSearchModalOpen?: boolean;
  setIsSearchModalOpen?: (isOpen: boolean) => void;
  isKeywordModalOpen?: boolean;
  setIsKeywordModalOpen?: (isOpen: boolean) => void;
  onDayPlusButtonClick?: () => void;
  setAddClickDay?: (day: number) => void;
  page: string; //page가 add면 overlay버튼이 보이고, detail이면 안보임
  width?: string; // half 면 반토막 아니면, full screen
}

const PlanMap: React.FC<PlanMapProps> = (props: PlanMapProps) => {
  const [markerList, setMarkerList] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (props.selectDay === 0) {
      const filteredPlaces = props.placeList
        .map((dayPlan) => dayPlan.placeList)
        .reduce((acc, cur) => acc.concat(cur), [])
        .filter((place: any) => typeof place === 'object' && place.hasOwnProperty('y') && place.hasOwnProperty('x'));

      const allMarkerList = filteredPlaces.map((place: any) => {
        return {
          position: { lat: place.y, lng: place.x },
          placeInfo: place,
          selected: false,
          type: "plan",
          day: props.placeList.findIndex((dayPlan) => dayPlan.placeList.includes(place)) + 1,
        };
      });

      setMarkerList(allMarkerList);
    } else {
      const filteredPlaces = props.placeList[props.selectDay - 1].placeList.filter((place: any) => typeof place === 'object' && place.hasOwnProperty('y') && place.hasOwnProperty('x'));
      const markerList = filteredPlaces.map((place: any) => {
        return {
          position: { lat: place.y, lng: place.x },
          day: props.selectDay,
          placeInfo: place,
          selected: false,
          type: "plan",
        };
      });

      setMarkerList(markerList);
    }

    setMarkerList((prevMarkerList) => {
      if (props.selectDay === 0) {
        const allMarkerList = prevMarkerList.map((marker) => {
          // 여기서 각 마커의 day 속성을 업데이트합니다.
          return {
            ...marker,
            day: props.placeList.findIndex((dayPlan) => dayPlan.placeList.includes(marker.placeInfo)) + 1,
          };
        });
        return allMarkerList;
      } else {
        const markerList = prevMarkerList.filter((marker) => {
          return (
            marker.day === props.selectDay &&
            typeof marker.placeInfo === 'object' &&
            marker.placeInfo.hasOwnProperty('y') &&
            marker.placeInfo.hasOwnProperty('x')
          );
        });
        // 여기서 각 마커의 day 속성을 업데이트합니다.
        markerList.forEach((marker) => {
          marker.day = props.selectDay;
        });
        return markerList;
      }
    });
    if(props.page === "post" && props.placeList.length >3) {
      const listItems:any[] = [];
      props.placeList.map((_:any , index:number) => {
        if(index>3) {
          listItems.push({content: `${index+1}일차`, onClick: () => props.setSelectDay(index+1)})
        }
      })
      setItems(listItems);
    } else if(props.page === "add" && props.placeList.length >8) {
      const listItems:any[] = [];
      props.placeList.map((_:any , index:number) => {
        if(index>7) {
          listItems.push({content: `${index+1}일차`, onClick: () => props.setSelectDay(index+1)})
        }
      })
      setItems(listItems);
    } else if(props.page === "detail" && props.placeList.length >9) {
      const listItems:any[] = [];
      props.placeList.map((_:any , index:number) => {
        if(index>8) {
          listItems.push({content: `${index+1}일차`, onClick: () => props.setSelectDay(index+1)})
        }
      })
      setItems(listItems);
    }
  }, [props.placeList, props.selectDay]);


  return (
    <S.MapContainer width={props.width}>
      <S.DaysContainer>
        <S.Day
          isClicked={props.selectDay === 0 ? true : false}
          onClick={() => props.setSelectDay(0)}
        >
          전체
        </S.Day>
        {props.placeList.map((dayPlan, index) => ( 
          (props.page === "add" && index < 8) || (props.page === "post" && index<3 ) || (props.page === "detail" && index<9 )? (
          <S.Day
            key={index}
            isClicked={props.selectDay === dayPlan.day ? true : false}
            onClick={() => props.setSelectDay(dayPlan.day)}
          >
            <DayMarker day={dayPlan.day} size="small"/>
            &nbsp;&nbsp;{dayPlan.day}일차
          </S.Day>
        ): (
          null
        )
        ))}
        {items.length > 0 && (
          <S.Day isClicked={false}>
            더보기
            <Menu item={items} />
          </S.Day>
        )}
        {props.page === "add" && (
          <S.Day
            onClick={() =>
              props.onDayPlusButtonClick && props.onDayPlusButtonClick()
            }
            isClicked={false}
          >
            추가
          </S.Day>
        )}
      </S.DaysContainer>
      <Maps markerList={markerList} center={props.center} type="plan" />
      {props.page === "add" && (
        <S.OverlayButtonContainer>
          <S.OverlayButton
            onClick={() => {
              props.setIsSearchModalOpen &&
                props.setIsSearchModalOpen(!props.isSearchModalOpen);
              props.setAddClickDay && props.setAddClickDay(props.selectDay);
            }}
            type="button"
          >
            장소 추가
            <AiOutlinePlus color="#FCC400" />
          </S.OverlayButton>
          <S.OverlayButton
            onClick={() => {
              props.setIsKeywordModalOpen &&
                props.setIsKeywordModalOpen(!props.isKeywordModalOpen);
              props.setAddClickDay && props.setAddClickDay(props.selectDay);
            }}
            type="button"
          >
            키워드 추가
            <AiOutlinePlus color="#FCC400" />
          </S.OverlayButton>
        </S.OverlayButtonContainer>
      )}
    </S.MapContainer>
  );
};

export default PlanMap;