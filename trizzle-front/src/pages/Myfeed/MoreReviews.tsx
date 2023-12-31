import { useState, useEffect } from "react";
import { MyfeedLayout } from "../Page";
import Paging from "../../components/Paging";
import { useAsync } from "../../utils/API/useAsync";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./Myfeed.style";

const MoreReviews = () => {
  const {id} = useParams<{id:string}>();
  const [place, setPlace] = useState<any>(null);
  const url = id? `/api/reviews/otherreviews/${id}` : "/api/reviews/myreviews";
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
      setPlace(state.data);
    }
  },[state]);

  return (
    <MyfeedLayout isMe={id? false : true}>
      <S.ListTitle>{id? "공유한 리뷰" : "나의 리뷰 목록"}</S.ListTitle>
      {place &&
        <Paging perPage={9} items={place} type="verticalReview"/>
      }
    </MyfeedLayout>
  )
}

export default MoreReviews;