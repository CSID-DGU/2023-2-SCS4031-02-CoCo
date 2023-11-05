import React from "react";
import * as S from "./PlanListContainer.style";
import {BiMapPin} from "react-icons/bi";

type PlanListContainerProps = {
  past: boolean;
  plan : any;
};

export const PlanListContainer: React.FC<PlanListContainerProps> = (props: PlanListContainerProps) => {

  return (
        <S.Container past={props.past}>
          <S.LeftContainer past={props.past}/>
          <S.RightContainer>
            <S.Title past={props.past}>{props.plan.plan_name}</S.Title>
            <S.Location past={props.past}>
              <BiMapPin size="1.5rem" color={props.past? "#BDBDBD" : "#89711B"}/>
              {props.plan.plan_location}
            </S.Location>
            <S.Date past={props.past}>{props.plan.plan_start_date} ~ {props.plan.plan_end_date}</S.Date>
          </S.RightContainer>
        </S.Container>
  )
}

