import React, { useEffect, useState } from "react";
import * as S from "./PlanListContainer.style";
import {BiMapPin} from "react-icons/bi";
import Menu from "../../components/Menu";



type PlanListContainerProps = {
  past: boolean;
  plan : any;
  onDeleteClick: (id:string) => void;
};



export const PlanListContainer: React.FC<PlanListContainerProps> = (props: PlanListContainerProps) => {
  const menuItem = [{content: "삭제", onClick:()=> props.onDeleteClick(props.plan.id), isDelete: true}];
  const [menuItems, setMenuItems] = useState<any[]>(menuItem);


  return (
        <S.Container past={props.past}>
          <S.LeftContainer past={props.past}/>
            <Menu item={menuItems} />
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

