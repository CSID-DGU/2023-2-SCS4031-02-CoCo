import React from "react";
import * as S from "./Tabs.style";
import { TabsProps } from "./Tabs.type";
import { FaMapSigns } from "react-icons/fa";
import { BsPinMapFill } from "react-icons/bs";

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {

  if(props.type === "roundButton") {
    return (
      <S.RoundTabContainer>
        {props.tabs.map((tab, index) => (
          <S.RoundTab key={index} onClick={() => props.onClick(tab)} active={props.selectedTab.name === tab.name}>
            {tab.id === "post" ? <><FaMapSigns size="1.1rem" className="icon"/> {tab.name}</>: <><BsPinMapFill size="1.1rem"  className="icon"/>{tab.name}</>}
          </S.RoundTab>
        )
        )}
      </S.RoundTabContainer>
    )
  }else {
  return (
    <S.TabContainer>
      {props.tabs.map((tab, index) => (
        <S.Tab key={index} onClick={() => props.onClick(tab)} active={props.selectedTab.name === tab.name}>{tab.name}</S.Tab>
      )
      )}
    </S.TabContainer>
  )
  };
};

export default Tabs;