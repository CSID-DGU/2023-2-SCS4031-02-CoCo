import React, {useState, useEffect} from "react";
import { MyfeedLayout } from "../Page";

const PlanList = () => {

  return (
    <MyfeedLayout isMe={true} selectTab={{name:"여행 계획", URL:"plans"}}>
      <div>PlanList</div>
    </MyfeedLayout>
  )
};

export default PlanList;