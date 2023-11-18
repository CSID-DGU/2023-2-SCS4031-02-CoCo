import React, { useEffect, useState } from "react";

import * as S from './PostPlan.styles';
import Page from "../Page";
import { AiOutlineDown, AiOutlineHeart,AiOutlineUp, AiTwotoneHeart } from "react-icons/ai";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import PlanMap from "../../shared/PlanMap";
import { koreaRegions } from "../../utils/Data/mapData";
import UserPreview from "../../components/UserPreview";
import { useAsync } from "../../utils/API/useAsync";
import { useParams } from "react-router-dom";

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
  plan_theme: [{ name: "도심속여행", id: 2 }, { name: "도심속여행", id: 2 }, { name: "도심속여행", id: 2 }]
}

const SampleComment = [
  {
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_42E5B8F3E27A193D9A4A71E8A5511DB3.jpg&type=l340_165',
    id: '날탱이탱날',
    content: '너무 좋아요'
  },
  {
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_42E5B8F3E27A193D9A4A71E8A5511DB3.jpg&type=l340_165',
    id: '날탱이탱날',
    content: '너무 좋아요'
  },
]


const PostPlan: React.FC = () => {
  const [isLogin, setIsLogin] = useState<string>(true);
  const [data, setData] = useState<any>(sampleData);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(sampleData.content);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [regions, setRegions] = useState<string>('서울특별시');

  const placeId = useParams<{ id: string }>();
  const [state, fetchData] = useAsync({url: `/reviews/${placeId.id}`});

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      if (state.data.message === "delete success") console.log('아쉽지만 데이터가 없어용!');
      else {
        setData(state.data);
      }
    }
  }, [state]);

  const selectedDay = (day: number) => {
    if (day === 0) setSelectedDayPlan(sampleData.content)
    else setSelectedDayPlan(sampleData.content.filter((plan) => plan.day === day));
    setSelectDay(day)
  }
z

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>

      <S.InforFirstContainer>
        <div>제목 {data.plan_name}</div>
      </S.InforFirstContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            작성일자
          </S.InforContainer>
          <S.InforInputContainer>
            {Date.now()}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            여행 기간
          </S.InforContainer>
          <S.InforInputContainer>
            {sampleData.plan_start_date} ~ {sampleData.plan_end_date}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            여행 테마
          </S.InforContainer>
          <S.Content>
            {data.plan_theme.map((thema: any) => (
              <S.ThemaBadge key={thema.id}>{thema.name}</S.ThemaBadge>
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
        {data.content && <PlanMap selectDay={selectDay} setSelectDay={(day: number) => selectedDay(day)} placeList={data.content} center={koreaRegions.filter((region) => { return region.name === regions })[0].center} page="detail" width="50%" />}
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
        {isCommentOpen && (
          SampleComment.map((value, index) => (
            <S.CommentTextContainer key={index}>
              <S.CommentImage />
              <S.CommentVerticalFirstStartContainer>
                <S.CommentIdText>
                  {value.id}
                </S.CommentIdText>
                <S.CommentContent>
                  {value.content}
                </S.CommentContent>
              </S.CommentVerticalFirstStartContainer>
            </S.CommentTextContainer>
          ))
        )}
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