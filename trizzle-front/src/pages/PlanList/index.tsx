import React, {useState, useEffect} from "react";
import { MyfeedLayout } from "../Page";
import * as S from "./PlanList.style";
import {AiOutlinePlus} from "react-icons/ai";
import { PlanListContainer } from "../../shared/PlanListContainer";

const past = [
  {plan_name: "즐거운 제주도 여행", location: "제주특별자치도", id: 1, plan_start_date: "2021-08-01", plan_end_date: "2021-08-05"},
  {plan_name: "즐거운 서울 여행", location: "서울특별시", id: 2, plan_start_date: "2021-08-08", plan_end_date: "2021-08-09"},
];

const next = [
  {plan_name: "즐거운 제주도 여행2", location: "제주특별자치도", id: 1, plan_start_date: "2023-12-01", plan_end_date: "2023-12-05"},
  {plan_name: "즐거운 제주도 여행2", location: "제주특별자치도", id: 1, plan_start_date: "2023-12-01", plan_end_date: "2023-12-05"},
  {plan_name: "즐거운 제주도 여행2", location: "제주특별자치도", id: 1, plan_start_date: "2023-12-01", plan_end_date: "2023-12-05"},
]

const PlanList = () => {
  const [nextPlan, setNextPlan] = useState<any>(next);
  const [pastPlan, setPastPlan] = useState<any>(past);

  return (
    <MyfeedLayout isMe={true} selectTab={{name:"여행 계획", URL:"plans"}}>
      <S.Container>
        <S.HeadContainer>
          <S.DDay>다음 여행</S.DDay>
          <S.PlusButton>
            <AiOutlinePlus size="1.5rem"/>
            새 일정 추가
          </S.PlusButton>
        </S.HeadContainer>
        <S.HorizontalLine/>

          {nextPlan.length === 0 ? <div>다음 여행이 없습니다.</div> : (
            <S.PlanList>
            {nextPlan.map((plan:any) => (
              <PlanListContainer key={plan.id} plan={plan} past={false}/>
            ))}
          </S.PlanList>
          )}

          <S.PastTitle>지난 일정</S.PastTitle>
          {pastPlan.length === 0 ? <div>지난 일정이 없습니다.</div> : (
            <S.PlanList>
              {pastPlan.map((plan:any) => (
                <PlanListContainer key={plan.id} plan={plan} past={true}/>
              ))}
            </S.PlanList>
          )}
      </S.Container>
    </MyfeedLayout>
  )
};

export default PlanList;