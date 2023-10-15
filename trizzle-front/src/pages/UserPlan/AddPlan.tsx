import React,{useState, useEffect} from "react";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import Page from "../Page";
import * as S from "./AddPlan.styles";
import Maps from "../../components/KakaoMap";
import KeywordModal from "../../shared/KeywordModal";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import { koreaRegions } from "../../utils/mapData";
import {AiOutlinePlus} from "react-icons/ai";
import DayPlan from "../../shared/DayPlan";


type dayPlan = {
  day: number;
  placeList: any[];
}

const AddPlanPage = () => {
  const [allDay, setDay] = useState(3); //기본으로 3일 지정
  const [placeList, setPlaceList] = useState<dayPlan[]>([{day:1, placeList:[]}, {day:2, placeList:[]}, {day:3, placeList:[]}]); //기본 3일이기 때문에
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [region, setRegion] = useState<any>({name: "서울특별시", center: {lat: 37.55767200694191, lng: 127.000260306464}});
  const [thema, setThema] = useState<string>("");
  const [selectDay, setSelectDay] = useState<number>(0);
  const [markerList, setMarkerList] = useState<any[]>([]);
  const [addClickDay, setAddClickDay] = useState<number>(0);

  const onPlaceAddButtonClick = (place:any, day:number) => {
    const updatedPlaceList = placeList.map((dayPlan) => {
      if(day === 0) {
        if(dayPlan.day === allDay) {
          return {
            day: allDay,
            placeList: [...dayPlan.placeList, place],
          }} else {
          return dayPlan;
          }
      }else if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: [...dayPlan.placeList, place],
        }
      } else {
        return dayPlan;
      }
    })
    setPlaceList(updatedPlaceList);
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  const onKeywordAddButtonClick = (keyword:string, day:number) => {
    const updatedPlaceList = placeList.map((dayPlan) => {
      if(day === 0) {
        if(dayPlan.day === allDay){
        return {
          day: allDay,
          placeList: [...dayPlan.placeList, keyword],
        }
      } else {
        return dayPlan;
      }
      } else if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: [...dayPlan.placeList, keyword],
        }
      } else {
        return dayPlan;
      }
    })
    setPlaceList(updatedPlaceList);
    setIsKeywordModalOpen(!isKeywordModalOpen);
  };


  const onDayPlusButtonClick = () => {
    setDay(allDay+1);
    setPlaceList((prev) => [...prev, {day:allDay+1, placeList:[]}]);
  };


  useEffect(() => {
    if (selectDay === 0) {
      const filteredPlaces = placeList
        .map((dayPlan) => dayPlan.placeList)
        .reduce((acc, cur) => acc.concat(cur), [])
        .filter((place) => typeof place === 'object' && place.hasOwnProperty('y') && place.hasOwnProperty('x'));
  
      const allMarkerList = filteredPlaces.map((place) => {
        return {
          position: { lat: place.y, lng: place.x },
          placeInfo: place,
          selected: false,
          type: "plan",
        };
      });
  
      setMarkerList(allMarkerList);
    } else {
      const filteredPlaces = placeList[selectDay - 1].placeList.filter((place) => typeof place === 'object' && place.hasOwnProperty('y') && place.hasOwnProperty('x'));
      const markerList = filteredPlaces.map((place) => {
        return {
          position: { lat: place.y, lng: place.x },
          placeInfo: place,
          selected: false,
          type: "plan",
        };
      });
  
      setMarkerList(markerList);
    }
  }, [placeList, selectDay]);
  

  return (
    <Page headersProps={{isHome:false, isLogin:true}}>
      <S.PageTitleContainer>
        <S.PageTitle>나만의 일정 등록</S.PageTitle>
      </S.PageTitleContainer>
      <form>
        <S.ButtonContainer>
          <S.Button>임시저장</S.Button>
          <S.Button>저장</S.Button>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{width: "100%"}} id="title" onChange={(event) => setTitle(event.target.value)} value={title}/>
          <S.HorizontalContainer>
            <S.SelectTitle>
              지역
            </S.SelectTitle>
            <DropdownMenu name={region.name} items={koreaRegions} onClick={(region) => {setRegion(region)}}/>
            <S.SelectTitle style={{marginLeft:"15rem"}}>여행기간</S.SelectTitle>
          </S.HorizontalContainer>
          <TextInput name="thema" title="테마" placeholder="테마를 입력해주세요." styleProps={{width: "100%"}} id="thema" onChange={(event) => setThema(event.target.value)} value={thema}/>
          <S.HorizontalLine/>
          </S.FormContainer>

          <S.MapContainer>
            <S.DaysContainer>
              <S.Day isClicked={selectDay === 0? true : false} onClick={() => setSelectDay(0)}>전체</S.Day>
              {placeList.map((dayPlan, index) => (
                <S.Day key={index} isClicked={selectDay === dayPlan.day ? true : false} onClick={() => setSelectDay(dayPlan.day)}>{dayPlan.day}일차</S.Day>
              ))}
              <S.Day onClick={() => onDayPlusButtonClick()} isClicked={false} >추가</S.Day>
            </S.DaysContainer>
            <Maps markerList={markerList} center={region.center} type="plan"/>
            <S.OverlayButtonContainer>
                <S.OverlayButton onClick={() => setIsSearchModalOpen(!isSearchModalOpen) } type="button">장소 추가
                  <AiOutlinePlus color="#FCC400"/>
                </S.OverlayButton>
                <S.OverlayButton onClick={() => setIsKeywordModalOpen(!isKeywordModalOpen) } type="button">키워드 추가
                  <AiOutlinePlus color="#FCC400"/>
                </S.OverlayButton>
              </S.OverlayButtonContainer>
          </S.MapContainer>
      </form>

      <div style={{height:"50rem"}}/>
      {isSearchModalOpen && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace, addClickDay)} center={region.center} onCloseClick={() => setIsSearchModalOpen(!isSearchModalOpen)}/>
      }
      {isKeywordModalOpen && <KeywordModal onAddButtonClick={(seletedKeyword) => onKeywordAddButtonClick(seletedKeyword, addClickDay)} onCloseClick={() => setIsKeywordModalOpen(!isKeywordModalOpen)}/>
      }
    </Page>
  );

};

export default AddPlanPage;