import { useState, useEffect } from "react";
import {MyfeedLayout} from "../Page";
import Tabs from "../../components/Tabs";
import { useParams } from "react-router-dom";
import UserProfile from "../../shared/UserProfile";
import PlaceCard from "../../components/PlaceCard";
import PlanCard from "../../components/PlanCard";
import * as S from "./Myfeed.style";

const PlanList = [
  {planId:1, region:"서울특별시", title:"즐거운 서울 나들이", startDate:"2021.10.31", endDate:"2021.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:2, region:"제주특별자치도", title:"즐거운 제주도 나들이", startDate:"2022.10.31", endDate:"2022.11.01", thumbnail:"https://news.tbs.seoul.kr/Upload/Image/20230520/00000000000001325124.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:3, region:"경기도", title:"즐거운 경기도 나들이", startDate:"2023.10.31", endDate:"2023.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
];

const PlaceList = [
  {placeName:"서울시청", userName:"김희진", postDate:"2023.10.31", postTitle:"서울시청은 존재이유가 뭐냐", postContent:"둘째날 서울시청에 갔다. 시청은 뭔가 랜드마크라는 기대감이 있어서 갔었는데 외관이 굉장히 별로고 주변 동네가 더럽...", src:"https://upload.wikimedia.org/wikipedia/commons/9/90/Seoul_City_Hall_20190608_001.jpg", postId:1},
  {placeName:"한라산", userName:"김희진", postDate:"2023.10.31", postTitle:"즐거운 등산", postContent:"둘째날 한라산 갔다. 역시 한라산 공기가 너무 좋고 자연이 아름답다", src:"https://upload.wikimedia.org/wikipedia/commons/9/90/Seoul_City_Hall_20190608_001.jpg", postId:2},
  {placeName:"차이나타운", userName:"김희진", postDate:"2023.10.31", postTitle:"차이나타운은 재미없다", postContent:"차이나 타운은 뭐가 없고 사람은 더럽게 많다. 그냥 사람 구경만 하고 온 듯", src:"https://a.cdn-hotels.com/gdcs/production164/d1193/0953a842-cf63-4a44-93c6-57b00ad72a67.jpg", postId:3},
];

const Myfeed = () => {
  const {id} = useParams<{id:string}>();
  const [plan, setPlan] = useState<any[]>(PlanList);
  const [place, setPlace] = useState<any[]>(PlaceList);

  return (
    <MyfeedLayout isMe={id? false : true}>
      <UserProfile nickName="김희진" keyword={["카페", "맛집", "공원"]} follower={["김희진", "김희진", "김희진"]} following={["김희진", "김희진", "김희진"]} isMe={id? false : true} planCount={1} placeCount={4}/>
      <S.HorizontalContainer>
        <S.ListTitle>{id? "김희진님의 여행 일정 목록" : "나의 여행 일정 목록"}</S.ListTitle>
        <S.PlusButton>더보기</S.PlusButton>
      </S.HorizontalContainer>
      <S.PlanListContainer>
        {plan.map((item, index) => (
          <PlanCard key={index} region={item.region} title={item.title} startDate={item.startDate} endDate={item.endDate} thumbnail={item.thumbnail} likeCount={item.likeCount} commentCount={item.commentCount} planId={item.planId} thema={item.thema} userId={item.userId}/>
        ))}
      </S.PlanListContainer>
      <S.HorizontalContainer>
        <S.ListTitle>{id? "김희진님의 여행지" : "나의 여행지"}</S.ListTitle>
        <S.PlusButton>더보기</S.PlusButton>
      </S.HorizontalContainer>
      <S.PlaceListContainer>
        {place.map((item, index) => (
          <PlaceCard key={index} placeName={item.placeName} userName={item.userName} postDate={item.postDate} postTitle={item.postTitle} postContent={item.postContent} src={item.src} postId={item.postId}/>
        ))}
      </S.PlaceListContainer>
    </MyfeedLayout>
  );
};

export default Myfeed;