import React, { useEffect, useState } from "react";

import * as S from './PostPlan.styles';
import Page from "../Page";
import { AiOutlineDown, AiOutlineHeart, AiOutlineUp, AiTwotoneHeart } from "react-icons/ai";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import PlanMap from "../../shared/PlanMap";
import { koreaRegions } from "../../utils/Data/mapData";
import UserPreview from "../../components/UserPreview";
import { useAsync } from "../../utils/API/useAsync";
import { useParams } from "react-router-dom";
import { tripThema } from "../../utils/Data/tripThema";

const PostPlan: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any>([]);
  const [dayPlan, setDayPlan] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(null);
  
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  // const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const placeId = useParams<{ id: string }>();
  const [state, _] = useAsync({ url: `/api/posts/${placeId.id}`, method: "GET" });

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      setData(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (data.length !== 0) {
      setTitle(data.plan.planName);
      setStartDate(data.plan.planStartDate);
      setEndDate(data.plan.planEndDate);
      setRegions(data.plan.planLocation);
      setThema(data.plan.planThema.map((value: string) => tripThema.filter((item: any) => item.name === value)));
      setDayPlan(data.plan.content);
      setSelectedDayPlan(data.plan.content);
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

  return (
    <Page headersProps={{ isHome: false }}>
      <S.InforFirstContainer>
        <div>제목 {title}</div>
      </S.InforFirstContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            작성일자
          </S.InforContainer>
          <S.InforInputContainer>
          {data.postRegistrationDate}
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
            {data.views}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            추천수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.bookmarks}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            북마크수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.comments}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalContainer>

      <S.MapAndDayPlanContainer>
        {dayPlan && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => setSelectDay(day)} placeList={dayPlan} center={koreaRegions.filter((region) => { return region.name === regions })[0].center} page="detail" width="50%" />}
        <S.DayPlanPostContainer>
          <S.DayPlanPostInnerContainer>
            <DayPlanPost dayList={selectedDayPlan} selectDay={selectDay} />
          </S.DayPlanPostInnerContainer>
        </S.DayPlanPostContainer>
      </S.MapAndDayPlanContainer>

      <UserPreview nickName="날탱이탱날" keyword={["배낭", "자전거"]} />

      <S.CommentContainer>
        <S.HorizontalFirstStartContainer>
          <S.CommentText>
            댓글
            <S.CommentTextNumber>
              {data.comments}
            </S.CommentTextNumber>
            {isCommentOpen ?
              <AiOutlineUp size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
              :
              <AiOutlineDown size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
            }
          </S.CommentText>
          <S.CommentText>
            좋아요
            {isLike ?
              <AiTwotoneHeart size={"1rem"} style={{ margin: "0 0 0 0.5rem", color: "#FF0000" }} onClick={() => setIsLike(!isLike)} />
              :
              <AiOutlineHeart size={"1rem"} style={{ margin: "0 0 0 0.5rem", color: "#FF0000" }} onClick={() => setIsLike(!isLike)} />
            }
          </S.CommentText>
        </S.HorizontalFirstStartContainer>
      </S.CommentContainer>

      <S.RecommendContainer>
        <S.RecommendText>
          &#123;검색결과&#125;에 대한 다른 장소 추천 결과 입니다.
        </S.RecommendText>
      </S.RecommendContainer>
    </Page>
  )
}

export default PostPlan;