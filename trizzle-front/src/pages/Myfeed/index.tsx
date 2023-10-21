import { useState, useEffect } from "react";
import {MyfeedLayout} from "../Page";
import Tabs from "../../components/Tabs";
import { useParams } from "react-router-dom";

const Myfeed = () => {
  const {id} = useParams<{id:string}>();
  


  return (
    <MyfeedLayout isMe={id? false : true}>
      
    </MyfeedLayout>
  );
};

export default Myfeed;