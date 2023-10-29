import { useState, useEffect } from "react";
import {MyfeedLayout} from "../Page";
import Tabs from "../../components/Tabs";
import { useParams } from "react-router-dom";
import UserProfile from "../../shared/UserProfile";
import PlaceCard from "../../components/PlaceCard";

const Myfeed = () => {
  const {id} = useParams<{id:string}>();
  

  return (
    <MyfeedLayout isMe={id? false : true}>
      <UserProfile nickName="김희진" keyword={["카페", "맛집", "공원"]} follower={["김희진", "김희진", "김희진"]} following={["김희진", "김희진", "김희진"]} isMe={id? false : true} planCount={1} placeCount={4}/>
      <PlaceCard placeName="서울시청" userName="김희진" postDate="2023.10.31" postTitle="서울시청은 존재이유가 뭐냐" postContent="둘째날 서울시청에 갔다. 시청은 뭔가 랜드마크라는 기대감이 있어서 갔었는데 외관이 굉장히 별로고 주변 동네가 더럽..." src="https://upload.wikimedia.org/wikipedia/commons/9/90/Seoul_City_Hall_20190608_001.jpg" postId={1}/>
    </MyfeedLayout>
  );
};

export default Myfeed;