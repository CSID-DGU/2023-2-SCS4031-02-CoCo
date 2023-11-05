import React,{useState, useEffect} from "react";
import AddPlaceModal from "../../shared/SearchPlaceModal";
import Page from "../Page";
import * as S from "./AddPlan.styles";
import KeywordModal from "../../shared/KeywordModal";
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import { koreaRegions } from "../../utils/Data/mapData";
import DayPlan from "../../shared/DayPlan";
import { tripThema } from "../../utils/Data/tripThema";
import DatePicker, {CustomInput} from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";
import PlanMap from "../../shared/PlanMap";
import { useDeletePlaceFromPlan, useAddPlaceToPlan, useDeleteDay } from "../../recoil/PlanList";
import { useRecoilState } from "recoil";
import { PlanState } from "../../recoil/PlanList/atoms";
import { useAsync } from "../../utils/API/useAsync";

const AddPlanPage:React.FC = () => {
  const [allDay, setDay] = useState(3); //기본으로 3일 지정
  const [placeList, setPlaceList] = useRecoilState<any[]>(PlanState);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [region, setRegion] = useState<any>(koreaRegions[0]);
  const [thema, setThema] = useState<any[]>([]);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [addClickDay, setAddClickDay] = useState<number>(0);
  const [center, setCenter] = useState<any>(region.center);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>();
  const navigate = useNavigate();
  const deletePlaceFromPlan = useDeletePlaceFromPlan();
  const addPlaceToPlan = useAddPlaceToPlan();
  const deleteDay = useDeleteDay();
  const [state, fetchData] = useAsync({url:"", method:""});

  const onPlaceAddButtonClick = (place:any, day:number) => {
    addPlaceToPlan(place, day, placeList, allDay);
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
    addPlaceToPlan(keyword, day, placeList, allDay);
    setIsKeywordModalOpen(!isKeywordModalOpen);
  };


  const onDayPlusButtonClick = () => {
    setDay(allDay+1);
    setPlaceList((prev) => [...prev, {day:allDay+1, place_list:[]}]);
  };

  const onDeleteDayClick = (day:number) => {
    if(allDay === 1) {
      alert("더 이상 삭제할 수 없습니다.");
      return;
    }

    deleteDay(day, placeList);
    setDay(allDay-1);
  }
  
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
    deletePlaceFromPlan(place, day, placeList, index);
  }

  const onSubmitButtonClick = () => {
    if(title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if(thema.length === 0) {
      alert("여행 테마를 선택해주세요.");
      return;
    };
    const themaNames = thema.map((item) => item.name);
    const formattedDate = startDate.toISOString().slice(0, 10);

    const data = {
      plan_name: title,
      plan_start_date: formattedDate,
      plan_end_date: endDate,
      plan_location: region.name,
      plan_thema: themaNames,
      content: placeList
    }


    const json = JSON.stringify(data);
    console.log(json);
    const url = `/api/plans`;
    fetchData(url, "POST",json);
    
    };

    useEffect(() => {
      console.log(state)
      if(state.data && state.data.message === "save success") navigate(`/myfeed/plans/${state.data.plan_id}`);
    }, [state])

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
          <PlanMap selectDay={selectDay} setSelectDay={setSelectDay} placeList={placeList} center={center} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen} isKeywordModalOpen={isKeywordModalOpen} setIsKeywordModalOpen={setIsKeywordModalOpen} onDayPlusButtonClick={onDayPlusButtonClick} setAddClickDay={setAddClickDay} page="add"/>
          
          <DayPlan isPlan={true} onPlaceClick={(day) => {setAddClickDay(day); setIsSearchModalOpen(!isSearchModalOpen)}} onKeywordClick={(day) => {setAddClickDay(day); setIsKeywordModalOpen(!isKeywordModalOpen)}} onDeleteClick={(place, day, index) => onDeleteButtonClick(place, day, index)} onDayDeleteClick={(day) => onDeleteDayClick(day)}/>
      

      {/* </form> */}

      <div style={{height:"10rem"}}/>
      {isSearchModalOpen && <AddPlaceModal onAddButtonClick={(selectedPlace) => onPlaceAddButtonClick(selectedPlace, addClickDay)} center={region.center} onCloseClick={() => setIsSearchModalOpen(!isSearchModalOpen)} region={region}/>
      }
      {isKeywordModalOpen && <KeywordModal onAddButtonClick={(seletedKeyword) => onKeywordAddButtonClick(seletedKeyword, addClickDay)} onCloseClick={() => setIsKeywordModalOpen(!isKeywordModalOpen)}/>
      }
    </Page>
  );
};

export default AddPlanPage;