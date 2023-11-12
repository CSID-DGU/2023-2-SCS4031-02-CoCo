import React, { useEffect, useState } from "react";

import * as S from './AddPostPlan.styles'
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import Page from "../Page";
import { koreaRegions } from "../../utils/Data/mapData";
import { tripThema } from "../../utils/Data/tripThema";
import UploadPlanModal from "../../shared/UploadPlanModal";
import PlanMap from "../../shared/PlanMap";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import DetailDayPlan from "../../shared/DayPlan/DetailDayPlan";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import ConnectPlaceModal from "../../shared/ConnectPlaceModal";


const sampleData = {
  content: [{
    day: 1, placeList: [{
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    },
    {
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }, {
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }, {
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }]
  }, {
    day: 2, placeList: [{
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }, {
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }]
  }, {
    day: 3, placeList: [{
      _id: "1254228746",
      place_name: "수잔나의앞치마",
      category_name: "음식점 > 카페",
      category_group_code: "CE7",
      category_group_name: "카페",
      phone: "",
      address_name: "서울 중구 충무로5가 36-12",
      road_address_name: "서울 중구 퇴계로49길 24",
      x: 126.999609510907,
      y: 37.5633050390399,
      place_url: "http://place.map.kakao.com/1254228746"
    }]
  }],
  plan_end_date: "2023-11-06",
  plan_id: 44418118,
  plan_location: "서울특별시",
  plan_name: "박예림",
  plan_start_date: "2023-11-03",
  plan_theme: [{ name: "도심속여행", id: 2 }]
}

const AddPostPlan: React.FC = () => {
  const [data, setData] = useState<any>({});

  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(sampleData.content);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any>([]);

  const [selectDay, setSelectDay] = useState<number>(0);

  const [isUploadPlanModal, setIsUploadPlanModal] = useState<boolean>(false);
  const [isConnectPlaceModal, setIsConnectPlaceModal] = useState<boolean>(false);
  const [ConnectPlaceModalData, setIsConnectPlaceModalData] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [isUploadPlan, setIsUploadPlan] = useState<boolean>(true);

  const navigate = useNavigate();

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

  const selectedDay = (day: number) => {
    if (day === 0) setSelectedDayPlan(sampleData.content)
    else setSelectedDayPlan(sampleData.content.filter((plan) => plan.day === day));
    setSelectDay(day)
  }

  const onPostPlace = (data: any) => {
    window.open(`/post/places/add/?place_id=${data._id}&place_name=${data.place_name}`, '_blank');
  }

  const connectPlace = (data: any) => {
    // 데이터 가지고 있고
    setIsConnectPlaceModal(!isConnectPlaceModal);
    setIsConnectPlaceModalData(data.place_name);
  }

  useEffect(() => {
    setData(sampleData);
    setTitle(sampleData.plan_name);
    setStartDate(sampleData.plan_start_date);
    setEndDate(sampleData.plan_end_date);
    setRegions(sampleData.plan_location);
    setThema(sampleData.plan_theme);
    setSelectedDayPlan(sampleData.content);
  }, []);

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <S.PageTitleContainer>
        <S.PageTitle>일정 게시글 등록</S.PageTitle>
      </S.PageTitleContainer>
      {/* <form> */}
      <S.ButtonContainer>
        {/* <S.Button>임시저장</S.Button> */}
        <S.Button onClick={()=>navigate('/post/plan/id')}>저장</S.Button>
      </S.ButtonContainer>
      <S.FormContainer>
        <TextInput name="title" title="제목" placeholder="일정 제목을 입력해주세요." styleProps={{ width: "100%" }} id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
        <S.HorizontalContainer>
          <S.SelectTitle>지역</S.SelectTitle>
          <div>{regions}</div>
          <S.PlanDateContainer>
            <S.SelectTitle >여행기간</S.SelectTitle>
            <div>{startDate}</div>
            <div style={{ color: "#7e7e7e", margin: "0 0.5rem 0 0.3rem", fontSize: "1.3rem" }}>~</div>
            <div>{endDate}</div>
          </S.PlanDateContainer>
        </S.HorizontalContainer>
        <S.HorizontalContainer>
          <S.DropTitle>여행테마</S.DropTitle>
          <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
        </S.HorizontalContainer>
        <S.HorizontalLine />
      </S.FormContainer>

      {isUploadPlan ? (
        <S.MapAndDayPlanContainer>
          {data.content && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => selectedDay(day) } placeList={data.content} center={koreaRegions.filter((region) => { return region.name === regions })[0].center} page="detail" width="50%" />}
          <S.DayPlanPostContainer>
            <S.DayPlanPostInnerContainer>
              <DayPlanPost dayList={selectedDayPlan} selectDay={selectDay} onNewPostPlace={(data: any) => onPostPlace(data)} onConnetPostPlace={connectPlace} />
            </S.DayPlanPostInnerContainer>
          </S.DayPlanPostContainer>
        </S.MapAndDayPlanContainer>
      ) : (
        <S.UploadContainer onClick={() => setIsUploadPlanModal(!isUploadPlanModal)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <S.UploadPlanButton onClick={() => setIsUploadPlanModal(!isUploadPlanModal)} isHovered={isHovered} >일정 불러오기</S.UploadPlanButton>
        </S.UploadContainer>
      )}
      {/* </form> */}

      <div style={{ height: "10rem" }} />
      {isUploadPlanModal && <UploadPlanModal data={[]} onclose={() => setIsUploadPlanModal(!isUploadPlanModal)} />}
      {isConnectPlaceModal && <ConnectPlaceModal data={ConnectPlaceModalData} onclose={() => setIsConnectPlaceModal(!isConnectPlaceModal)} />}
    </Page >
  )
}

export default AddPostPlan;