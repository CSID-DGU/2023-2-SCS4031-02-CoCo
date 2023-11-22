import React, { useEffect, useState } from "react";

import * as S from './AddPostPlan.styles'
import TextInput from "../../components/TextInput";
import DropdownMenu from "../../components/DropdownMenu";
import Page from "../Page";
import { koreaRegions } from "../../utils/Data/mapData";
import { tripThema } from "../../utils/Data/tripThema";
import UploadPlanModal from "../../shared/UploadPlanModal";
import PlanMap from "../../shared/PlanMap";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import ConnectPlaceModal from "../../shared/ConnectPlaceModal";

const AddPostPlan: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [prevThema, setPrevThema] = useState<any>([]);
  const [thema, setThema] = useState<any>([]);
  const [dayPlan, setDayPlan] = useState<any>(null);
  const [secret, setSecret] = useState<boolean>(true);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [isUploadPlanModal, setIsUploadPlanModal] = useState<boolean>(false);

  const [isConnectPlaceModal, setIsConnectPlaceModal] = useState<boolean>(false);
  const [ConnectPlaceModalData, setConnectPlaceModalData] = useState<string>('');
  const [ConnectPlaceModalDay, setConnectPlaceModalDay] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [state, fetchData] = useAsync({ url: "", method: "" });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.error(state.error);
    } else if (state.data) {
      console.log(state.data);
      if (state.data.message === "update success" && state.data.reviewId) {
        // setData({ ...state.data, reviewId: state.data.reviewId });
      }
      // 저장 및 수정
      else if (!secret && state.data.message === "save success") navigate(`/post/plan/${state.data.postId}`);
      else if (secret && state.data.message === "save success") navigate(`/post/plan/secret/${state.data.postId}`);
    }
  }, [state]);

  useEffect(() => {
    if (data.length !== 0) {
      setTitle(data.planName);
      setStartDate(data.planStartDate);
      setEndDate(data.planEndDate);
      setRegions(data.planLocation);
      setPrevThema(data.planThema.map((value: string) => tripThema.filter((item: any) => item.name === value)));
      setDayPlan(data.content);
      setSelectedDayPlan(data.content);
    }
  }, [data]);

  useEffect(() => {
    if (selectDay === 0) {
      setSelectedDayPlan(dayPlan);
    } else {
      const newArray = [dayPlan[selectDay - 1]];
      setSelectedDayPlan(newArray);
    }
  }, [selectDay, dayPlan]);

  useEffect(() => {
    if (prevThema.length !== 0) {
      prevThema.map((value: any) => onThemaBadgeClick(value[0]));
    }
  }, [prevThema]);

  const onThemaBadgeClick = (select: any) => {
    const itemExists = thema.some((item: any) => item.id === select.id);

    if (itemExists) {
      setThema((prev: any) => prev.filter((item:any) => item.id !== select.id));
    } else {
      setThema((prev: any) => [...prev, select]);
    }
  };

  const onPostPlace = (data: any) => {
    window.open(`/post/places/add/${data._id}/${encodeURIComponent(data.placeName)}`, '_blank');
  }

  const connectPlace = (day: number, data: any) => {
    setIsConnectPlaceModal(!isConnectPlaceModal);
    setConnectPlaceModalDay(day);
    setConnectPlaceModalData(data);
  }

  //review에 planId 추가해서 디비로 put 보내기
  const connectReview = (review: any) => {
    const newArray = [...dayPlan];
    newArray[ConnectPlaceModalDay - 1].placeList = dayPlan[ConnectPlaceModalDay - 1].placeList.map((place: any) => {
      // _id와 ConnectPlaceModalData.placeId를 비교하여 객체를 찾습니다.
      if (place.id === ConnectPlaceModalData.id) {
        // 객체를 복사하여 reviewId를 추가한 후 반환합니다.
        return { ...place, review: review };
      }
      // 찾지 못한 경우 해당 객체를 그대로 반환합니다.
      return place;
    });
    setDayPlan(newArray);
    const reviewData = { ...review, reviewSecret: false, planId: data.id }
    fetchData(`/api/reviews/${review.id}`, 'PUT', reviewData);
  }

  const onSave = (type: string) => {
    const newArray = thema.map((value: any) => value.name);
    if (type === "save") {
      setSecret(false);
      data.content = dayPlan;
      data.planThema = newArray;
      const ResultData = {
        postTitle: title,
        postSecret: false,
        plan: { ...data }
      }

      const shouldProceed = window.confirm('게시하시면 다시 수정할 수 없습니다! 정말로 저장하시겠습니까?');
      if (shouldProceed) {
        const json = JSON.stringify(ResultData);
        console.log(json);
        fetchData(`/api/posts`, 'Post', json);
      }
    } else if (type === "secret") {
      setSecret(true);
      data.content = dayPlan;
      data.planThema = newArray;
      const ResultData = {
        postTitle: title,
        postSecret: true,
        plan: { ...data }
      }

      const json = JSON.stringify(ResultData);
      console.log(json);
      fetchData(`/api/posts`, 'Post', json);
    }
  }

  return (
    <Page headersProps={{ isHome: false }}>
      <S.PageTitleContainer>
        <S.PageTitle>일정 게시글 등록</S.PageTitle>
      </S.PageTitleContainer>
      {/* <form> */}
      <S.ButtonContainer>
        <S.Button onClick={() => onSave("secret")}>임시저장</S.Button>
        <S.Button onClick={() => onSave("save")}>게시</S.Button>
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

      {data.length !== 0 ? (
        <S.MapAndDayPlanContainer>
          {data.content && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => setSelectDay(day)} placeList={data.content} center={koreaRegions.filter((region) => { return region.name === regions })[0].center} page="detail" width="50%" />}
          <S.DayPlanPostContainer>
            <S.DayPlanPostInnerContainer>
              <DayPlanPost planId={data.id} dayList={selectedDayPlan} selectDay={selectDay} onNewPostPlace={(data: any) => onPostPlace(data)} onConnetPostPlace={(day: number, data: any) => connectPlace(day, data)} />
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
      {isUploadPlanModal && <UploadPlanModal onclose={() => setIsUploadPlanModal(!isUploadPlanModal)} onClickedPlan={(plan: any) => setData(plan)} />}
      {isConnectPlaceModal && <ConnectPlaceModal placeInfor={ConnectPlaceModalData} onclose={() => setIsConnectPlaceModal(!isConnectPlaceModal)} onClickedPlace={(place: any) => connectReview(place)} />}
    </Page >
  )
}

export default AddPostPlan;