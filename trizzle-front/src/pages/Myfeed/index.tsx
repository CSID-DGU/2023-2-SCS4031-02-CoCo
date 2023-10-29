import { useState, useEffect } from "react";
import {MyfeedLayout} from "../Page";
import Tabs from "../../components/Tabs";
import { useParams } from "react-router-dom";
import UserProfile from "../../shared/UserProfile";

const Myfeed = () => {
  const {id} = useParams<{id:string}>();
  

  return (
    <MyfeedLayout isMe={id? false : true}>
      <UserProfile nickName="김희진" keyword={["카페", "맛집", "공원"]} follower={["김희진", "김희진", "김희진"]} following={["김희진", "김희진", "김희진"]} isMe={id? false : true} planCount={1} placeCount={4}/>
      
    </MyfeedLayout>
  );
};

export default Myfeed;