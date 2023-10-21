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
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import { tripThema } from "../../utils/tripThema";
import DatePicker, {CustomInput} from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";


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
  const [region, setRegion] = useState<any>(koreaRegions[0]);
  const [thema, setThema] = useState<any[]>([]);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [markerList, setMarkerList] = useState<any[]>([]);
  const [addClickDay, setAddClickDay] = useState<number>(0);
  const [center, setCenter] = useState<any>(region.center);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>();
  const navigate = useNavigate();


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
    setCenter({lat: place.y, lng: place.x});
  }

  useEffect(() => {
    const furturDate = new Date(startDate);
    furturDate.setDate(furturDate.getDate() + allDay);
    const formattedDate = furturDate.toISOString().slice(0, 10);
    setEndDate(formattedDate);
  
  }, [startDate, allDay]);

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
          day: placeList.findIndex((dayPlan) => dayPlan.placeList.includes(place)) + 1,
        };
      });
  
      setMarkerList(allMarkerList);
    } else {
      const filteredPlaces = placeList[selectDay - 1].placeList.filter((place) => typeof place === 'object' && place.hasOwnProperty('y') && place.hasOwnProperty('x'));
      const markerList = filteredPlaces.map((place) => {
        return {
          position: { lat: place.y, lng: place.x },
          day: selectDay,
          placeInfo: place,
          selected: false,
          type: "plan",
        };
      });
  
      setMarkerList(markerList);
    }

    setMarkerList((prevMarkerList) => {
      if (selectDay === 0) {
        const allMarkerList = prevMarkerList.map((marker) => {
          // 여기서 각 마커의 day 속성을 업데이트합니다.
          return {
            ...marker,
            day: placeList.findIndex((dayPlan) => dayPlan.placeList.includes(marker.placeInfo)) + 1,
          };
        });
        return allMarkerList;
      } else {
        const markerList = prevMarkerList.filter((marker) => {
          return (
            marker.day === selectDay &&
            typeof marker.placeInfo === 'object' &&
            marker.placeInfo.hasOwnProperty('y') &&
            marker.placeInfo.hasOwnProperty('x')
          );
        });
        // 여기서 각 마커의 day 속성을 업데이트합니다.
        markerList.forEach((marker) => {
          marker.day = selectDay;
        });
        return markerList;
      }
    });
    console.log(JSON.parse(JSON.stringify(placeList)));
  }, [placeList, selectDay]);
  
  const onThemaBadgeClick = (select: any) => {
    // 선택한 아이템이 thema 배열에 이미 존재하는지 확인
    const itemExists = thema.some((item) => item.id === select.id);
  
    if (itemExists) {
      // 이미 선택한 아이템이 있는 경우, 해당 아이템을 제거
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      setThema((prev) => [...prev, select]);
    }
  };
  
  const onDeleteButtonClick = (place:any, day:number, index:number) => {
    const updatePlaceList = placeList.map((dayPlan) => {
      if(dayPlan.day === day) {
        return {
          day: dayPlan.day,
          placeList: dayPlan.placeList.filter((_, idx) => idx !== index),}
      } else {
        return dayPlan;
      }
    });
    setPlaceList(updatePlaceList);
  }

  const onSubmitButtonClick = () => {
    if(title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if(thema.length === 0) {
      alert("여행 테마를 선택해주세요.");
      return;
    };

    const submitData = {
      plan_id:Math.floor(Math.random() * 1000000000) + 1,
      plan_name: title,
      plan_start_date: startDate,
      plan_end_date: endDate,
      plan_location: region.name,
      plan_theme: thema,
      content: placeList
    }
    localStorage.setItem("submitData", JSON.stringify(submitData));
    navigate(`/myfeed/plans/${submitData.plan_id}}`);
  };


  return (
    <Page headersProps={{isHome:false, isLogin:true}}>
      <S.PageTitleContainer>
        <S.PageTitle>나만의 일정 등록</S.PageTitle>
      </S.PageTitleContainer>
      {/* <form> */}
        <S.ButtonContainer>
          {/* <S.Button>임시저장</S.Button> */}
          <S.Button onClick={onSubmitButtonClick}>저장</S.Button>
        </S.ButtonContainer>
        <S.FormContainer>
          <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{width: "100%"}} id="title" onChange={(event) => setTitle(event.target.value)} value={title}/>
          <S.HorizontalContainer>
            <S.SelectTitle>지역</S.SelectTitle>
            <DropdownMenu name={region.name} items={koreaRegions} onClick={(region) => {setRegion(region); setCenter(region.center)}}/>
            <S.PlanDateContainer>
            <S.SelectTitle >여행기간</S.SelectTitle>
            <DatePicker setStartDate={setStartDate} startDate={startDate}/>
            <div style={{color:"#7e7e7e", margin:"0 0.5rem 0 0.3rem", fontSize:"1.3rem"}}>~</div>
            <CustomInput value={endDate} onClick={() => {}}/>
            </S.PlanDateContainer>
          </S.HorizontalContainer>
          <S.HorizontalContainer>
            <S.SelectTitle>여행테마</S.SelectTitle>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
          </S.HorizontalContainer>
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
            <Maps markerList={markerList} center={center} type="plan"/>
            <S.OverlayButtonContainer>
                <S.OverlayButton onClick={() => {setIsSearchModalOpen(!isSearchModalOpen); setAddClickDay(selectDay)} } type="button">장소 추가
                  <AiOutlinePlus color="#FCC400"/>
                </S.OverlayButton>
                <S.OverlayButton onClick={() => {setIsKeywordModalOpen(!isKeywordModalOpen); setAddClickDay(selectDay)} } type="button">키워드 추가
                  <AiOutlinePlus color="#FCC400"/>
                </S.OverlayButton>
              </S.OverlayButtonContainer>
          </S.MapContainer>

          <HorizontalScrollContainer moveDistance={200}>
            {placeList.map((dayPlan, index) => (
              <DayPlan isPlan={false} key={index} onPlaceClick={(day) => {setAddClickDay(day); setIsSearchModalOpen(!isSearchModalOpen)}} onKeywordClick={(day) => {setAddClickDay(day); setIsKeywordModalOpen(!isKeywordModalOpen)}} dayPlan={dayPlan} onDeleteClick={(place, day, index) => onDeleteButtonClick(place, day, index)}/>
            ))}
          </HorizontalScrollContainer>
      {/* </form> */}

      <div style={{height:"10rem"}}/>
      {isSearchModalOpen && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace, addClickDay)} center={region.center} onCloseClick={() => setIsSearchModalOpen(!isSearchModalOpen)}/>
      }
      {isKeywordModalOpen && <KeywordModal onAddButtonClick={(seletedKeyword) => onKeywordAddButtonClick(seletedKeyword, addClickDay)} onCloseClick={() => setIsKeywordModalOpen(!isKeywordModalOpen)}/>
      }
    </Page>
  );

};

export default AddPlanPage;