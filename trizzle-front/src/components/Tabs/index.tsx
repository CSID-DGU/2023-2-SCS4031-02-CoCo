import React from "react";
import * as S from "./Tabs.style";
import { TabsProps } from "./Tabs.type";

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  return (
    <S.TabContainer>
      {props.tabs.map((tab, index) => (
        <S.Tab key={index} onClick={() => props.onClick(tab)} active={props.selectedTab.name === tab.name}>{tab.name}</S.Tab>
      )
      )}
    </S.TabContainer>
  )
};

export default Tabs;