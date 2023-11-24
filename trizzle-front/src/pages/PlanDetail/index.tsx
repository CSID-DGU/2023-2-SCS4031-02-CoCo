import React, {useEffect, useState} from "react"
import { MyfeedLayout } from "../Page"
import * as S from "./PlanDetail.style"
import { useParams, useNavigate } from "react-router-dom";
import PlanMap from "../../shared/PlanMap";
import { koreaRegions } from "../../utils/Data/mapData";
import DetailDayPlan from "../../shared/DayPlan/DetailDayPlan";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import { useAsync } from "../../utils/API/useAsync";

const PlanDetail: React.FC = () => { 
  const [data, setData] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const planId = useParams<{id:string}>();
  const [state, fetchData] = useAsync({url:`/api/plans/${planId.id}`});
  const navigate = useNavigate();


  useEffect(() => {
    if(state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    }else if(state.data) {
      if(state.data.message === "delete success") navigate('/myfeed/plans');
      else {
        setData(state.data);
      }
    }
  },[state]);

  const onDeleteClick = () => {
    fetchData(`/api/plans/myplans/${planId.id}`, "DELETE");
  }

  return (
    
    <MyfeedLayout isMe={true} selectTab={{name:"여행 계획", URL:"plans"}}>
      <S.ButtonContainer>
        <S.ListButton onClick={() => {navigate("/myfeed/plans")}}>목록</S.ListButton>
        <S.ModButton onClick={() => navigate(`/mypage/plans/edit/${planId.id}`)}>수정</S.ModButton>
        <S.DeleteButton onClick={onDeleteClick}>삭제</S.DeleteButton>
      </S.ButtonContainer>
      {data === null || data.lenth === 0? <div>로딩중</div> :(
        <S.Container>
        <S.HorizontalContainer>
          <S.Title>제목</S.Title>
          <S.Content>{data.planName}</S.Content>
        </S.HorizontalContainer>
        <S.HorizontalContainer>
          <S.Title>여행 지역</S.Title>
          <S.Content>{data.planLocation}</S.Content>
        </S.HorizontalContainer>
        <S.HorizontalContainer>
          <S.Title>여행 기간</S.Title>
          <S.Content>{data.planStartDate.slice(0,10)}  ~  {data.planEndDate}</S.Content>
        </S.HorizontalContainer>
        <S.HorizontalContainer>
          <S.Title>여행 테마</S.Title>
          <S.Content>
            {data.planThema.map((thema:any) => (
              <S.ThemaBadge key={thema.id}>{thema}</S.ThemaBadge>
            ))}
          </S.Content>
        </S.HorizontalContainer>
        <PlanMap selectDay={selectDay} setSelectDay={(day:number) => setSelectDay(day)} placeList={data.content} center={koreaRegions.filter((region) => {return region.name === data.planLocation})[0].center} page="detail"/>
        <HorizontalScrollContainer moveDistance={200}>
          {data.content.map((dayPlan:any, index:number) => (
            <DetailDayPlan key={index} dayPlan={dayPlan} isPlan={false} onPostClick={() => {}} id={data.id}/>
          ))}
        </HorizontalScrollContainer>
      </S.Container>
      )}
    </MyfeedLayout>
  );
};

export default PlanDetail;