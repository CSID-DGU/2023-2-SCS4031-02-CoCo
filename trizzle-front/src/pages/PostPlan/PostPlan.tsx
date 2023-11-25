import React, { useEffect, useState } from "react";

import * as S from './PostPlan.styles';
import Page from "../Page";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import PlanMap from "../../shared/PlanMap";
import { koreaRegions } from "../../utils/Data/mapData";
import UserPreview from "../../components/UserPreview";
import { useAsync } from "../../utils/API/useAsync";
import { useParams, useNavigate } from "react-router-dom";
import { tripThema } from "../../utils/Data/tripThema";
import CommentSection from "../../shared/CommentSection";
import SearchBar from "../../components/SearchBar";
import IconButton from "../../components/IconButton";
import Menu from "../../components/Menu";

const PostPlan: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any>([]);
  const [dayPlan, setDayPlan] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(null);
  const [planUser, setPlanUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const placeId = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, fetchData] = useAsync({ url: `/api/posts/${placeId.id}`, method: "GET" });

  useEffect(() => {

    if (state.error) {
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      if(state.data.message && state.data.message === "delete success") navigate("/myfeed");
      else setData(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (data !== null) {
      setTitle(data.post.plan.planName);
      setStartDate(data.post.plan.planStartDate);
      setEndDate(data.post.plan.planEndDate);
      setRegions(data.post.plan.planLocation);
      setThema(data.post.plan.planThema.map((value: string) => tripThema.filter((item: any) => item.name === value)));
      setDayPlan(data.post.plan.content);
      setSelectedDayPlan(data.post.plan.content);
      setIsLike(data.isLike);
      setIsBookmark(data.isBookmark);
      setPlanUser(data.postUser);
      if (data.postUser.accountId === sessionStorage.getItem('accountId')) {
        setIsMe(true);
  
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectDay === 0) {
      setSelectedDayPlan(dayPlan);
    } else {
      const newArray = [dayPlan[selectDay - 1]];
      setSelectedDayPlan(newArray);
    }
  }, [selectDay]);
  if(dayPlan !== null) {
  return (
    <Page headersProps={{ isHome: false }}>
      <SearchBar type="normal"/>

      <S.InforFirstContainer>
        <div>제목 {title}</div>
        {isMe ? <Menu item={[{ content: "삭제", onClick: () => {
            fetchData(`/api/posts/myposts/${placeId.id}`, "DELETE");
        }, isDelete: true }]}/>:
        <IconButton icon="bookmark" type="post" contentId={data.post.id} filled={isBookmark} />
      }
      </S.InforFirstContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            작성일자
          </S.InforContainer>
          <S.InforInputContainer>
          {data.post.postRegistrationDate.slice(0,10)}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            여행 기간
          </S.InforContainer>
          <S.InforInputContainer>
            {startDate} ~ {endDate}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            여행 테마
          </S.InforContainer>
          <S.Content>
            {thema.map((thema: any) => (
              <S.ThemaBadge key={thema.id}>{thema[0].name}</S.ThemaBadge>
            ))}
          </S.Content>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>

      <S.HorizontalContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            조회수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.post.views}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            추천수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.post.likeCount}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            북마크수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.post.bookmarkCount}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalContainer>

      <S.MapAndDayPlanContainer>
        {dayPlan && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => setSelectDay(day)} placeList={dayPlan} center={koreaRegions.filter((region) => { return region.name === regions })[0].center} page="detail" width="50%" />}
        <S.DayPlanPostContainer>
          <S.DayPlanPostInnerContainer>
            <DayPlanPost type='post' dayList={selectedDayPlan} selectDay={selectDay} />
          </S.DayPlanPostInnerContainer>
        </S.DayPlanPostContainer>
      </S.MapAndDayPlanContainer>

      <UserPreview accountId={planUser.accountId} nickName={planUser.nickname} keyword={planUser.thema} />

      <S.CommentContainer>
        <S.HorizontalFirstStartContainer>
          <S.CommentText>
            댓글
            <S.CommentTextNumber>
              
            </S.CommentTextNumber>
            {isCommentOpen ?
              <AiOutlineUp size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
              :
              <AiOutlineDown size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
            }
          </S.CommentText>
          <S.CommentText>
            좋아요
            <IconButton icon="like" type="post" filled={isLike} contentId={data.post.id}/>
          </S.CommentText>
        </S.HorizontalFirstStartContainer>
        {isCommentOpen && (
          <CommentSection page='post' postId={data.id} />
        )}
      </S.CommentContainer>

      {/* <S.RecommendContainer>
        <S.RecommendText>
          &#123;검색결과&#125;에 대한 다른 장소 추천 결과 입니다.
        </S.RecommendText>
      </S.RecommendContainer> */}
    </Page>
  )
        }
}

export default PostPlan;