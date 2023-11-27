import {useState, useEffect} from "react";
import { MyfeedLayout } from "../Page";
import * as S from "./PlanList.style";
import {AiOutlinePlus} from "react-icons/ai";
import { PlanListContainer } from "../../shared/PlanListContainer";
import { useAsync } from "../../utils/API/useAsync";
import { Link, useNavigate } from "react-router-dom";
import NullList from "../../components/NullList";


const PlanList = () => {
  const [nextPlan, setNextPlan] = useState<any[]>([]);
  const [pastPlan, setPastPlan] = useState<any[]>([]);
  const [state, fetchData] = useAsync({url:"/api/plans/myplans"});
  const [dDay, setDDay] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(state.error) {
      console.error(state.error);
      alert("데이터를 불러올 수 없습니다. 잠시 후 다시 접속해주세요");
      return;
    } else if(state.data) {

      let data;
      if(state.data.message === "delete success" && state.data.myplans) {
        data = state.data.myplans;
      } else{
        data = state.data;
      }
        const today = new Date();
        const nextArray:any[] = [];
        const pastArray:any[] = [];
        data.map((plan:any) => {
          const end_date = new Date(plan.planEndDate);
          const start_date = new Date(plan.planStartDate);
          if(today.getTime() > end_date.getTime()){
            pastArray.push(plan);
          } else {
            const diff = start_date.getTime() - today.getTime();
            const diffDay = Math.ceil(diff / (1000 * 3600 * 24));
            let dday;
            if(diffDay <= 0 ) dday = -1;
            else dday=diffDay;

            if(dDay === 0) setDDay(dday);
            else if(dDay > dday) setDDay(dday);
            nextArray.push(plan);
          };
        });
        setNextPlan(nextArray);
        setPastPlan(pastArray);
    };
  }, [state])

  const onDeleteClick = (id:string) => {
    fetchData(`api/plans/myplans/${id}`);
  }

  return (
    <MyfeedLayout isMe={true} selectTab={{name:"여행 계획", URL:"plans"}}>
      <S.Container>
        <S.HeadContainer>
          {dDay === 0 ? <S.DDay>다음 여행</S.DDay> :
          <S.DDay>다음 여행 {dDay === -1 ? " - TODAY!" : `D-${dDay}`}</S.DDay>
          }
          <S.PlusButton onClick={() => navigate("/mypage/plans/add")}>
            <AiOutlinePlus size="1.5rem"/>
            새 일정 추가
          </S.PlusButton>
        </S.HeadContainer>
        <S.HorizontalLine/>

          {nextPlan.length === 0 ? <NullList content="다음 여행 일정이 없습니다" />: (
            <S.PlanList>
            {nextPlan.map((plan:any) => (
              <Link to={`/myfeed/plans/${plan.id}`}>
              <PlanListContainer key={plan.id} plan={plan} past={false} onDeleteClick={(id:string) => onDeleteClick(id)}/>
              </Link>
            ))}
          </S.PlanList>
          )}

          <S.PastTitle>지난 일정</S.PastTitle>
          {pastPlan.length === 0 ? <NullList content="지난 여행 일정이 없습니다"/> : (
            <S.PlanList>
              {pastPlan.map((plan:any) => (
                <Link to={`/myfeed/plans/${plan.id}`}>
                  <PlanListContainer key={plan.id} plan={plan} past={true} onDeleteClick={(id:string) => onDeleteClick(id)}/>
                </Link>
              ))}
            </S.PlanList>
          )}
      </S.Container>
    </MyfeedLayout>
  )
};

export default PlanList;