import { useEffect, useState } from "react";
import { MyfeedLayout } from "../Page";
import * as S from "./UserInfoEdit.style"
import Tabs from "../../components/Tabs";
import UserInfo from "../../shared/UserInfo";
import CommentRecord from "../../shared/CommentRecord";

const UserInfoEdit = () => {
  const [tabs, setTabs] = useState([{name: "회원 정보"}, {name: "댓글 기록"}]);
  const [selectTab, setSelectTab] = useState({name: "회원 정보"});


  const onTabClick = (tab: any) => {
    setSelectTab(tab);
  }

  return (
    <MyfeedLayout isMe={true} selectTab={{name:"내 정보", URL:"info"}}>
      <S.Container tab={selectTab.name}>
        <S.TabContainer>        
          <Tabs tabs={tabs} selectedTab={selectTab} onClick={(tab) => {onTabClick(tab)}}/>
        </S.TabContainer>
        {selectTab.name === "회원 정보" ? (
          <UserInfo />
        ) : (
          <CommentRecord />
        )}
      </S.Container>
    </MyfeedLayout>
  )

}

export default UserInfoEdit;