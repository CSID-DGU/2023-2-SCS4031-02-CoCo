import { useState, useEffect } from "react";
import { MyfeedLayout } from "../Page";
import Paging from "../../components/Paging";
import { useAsync } from "../../utils/API/useAsync";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./Myfeed.style";

const MorePosts = () => {
  const {id} = useParams<{id:string}>();
  const [plan, setPlan] = useState<any>(null);
  const url = id? `/api/posts/otherposts/${id}` : "/api/posts/myposts";
  const [state, _] = useAsync({url: url});
  const navigate = useNavigate();

  useEffect(() => {
    if(state.error) {
      if(id) navigate("/404");
      else {
        alert("로그인이 필요합니다");
        navigate("/");
      }
    }
    if (state.data) {
      setPlan(state.data);
    }
  },[state]);

  return (
    <MyfeedLayout isMe={id? false : true}>
      <S.ListTitle style={{marginBottom:"2rem"}}>{id? "공유한 일정" : "나의 공유 여행 일정 목록"}</S.ListTitle>
      {plan &&
      <Paging perPage={9} items={plan} type="horizontalPlan"/>
      }
    </MyfeedLayout>
  )
}

export default MorePosts;