import React, {useEffect, useState} from "react";
import { FollowModalProps, follow } from "./FollowModal.type";
import * as S from "./FollowModal.style";
import Tabs from "../../components/Tabs";
import ProfileImage from "../../components/ProfileImage";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";

const FollowModal: React.FC<FollowModalProps> = (props: FollowModalProps) => {
  const [tab, setTab] = useState<any>(props.tab);
  const [followerList, setFollowerList] = useState<follow[]>(props.followerList);
  const [followingList, setFollowingList] = useState<follow[]>(props.followingList);
  const [state, ] = useAsync({url:""});
  const tabItems = [{name: "팔로워", URL:"follower"}, {name:"팔로잉", URL:"following"}];
  const navigate = useNavigate();

  // const onFollowCancel = (accountId: string) => {
  //   fetchData(`/api/follows/${accountId}`, "DELETE"); 
  // }

  // const onFollow = (accountId: string) => {
  //   fetchData(`/api/follows/${accountId}`, "POST"); 
  // }

  useEffect(() => {
    setFollowerList(props.followerList);
    setFollowingList(props.followingList);
  },[props]);

  useEffect(() => {}, [state]);

  return (
    <Modal title="팔로워/팔로잉" styleProps={{width:"40rem", height:"40rem"}} onCloseClick={props.setOpened}>
      <S.Container>
        <Tabs tabs={tabItems} selectedTab={tab} onClick={(tab) => setTab(tab)}/>
        {tab.name === "팔로워" ? (
          <S.SubContainer>
            {followerList.map((follower, index) => (
              <S.ItemContainer key={index} onClick={() => navigate(`/feed/${follower.accountId}`)}>
                <ProfileImage src={follower.profileImage} type="small"/>
                <S.ItemText>{follower.nickname}</S.ItemText>
                <S.FollowButton type="follow" onClick={() => console.log("팔로우")}>팔로우</S.FollowButton>
              </S.ItemContainer>
            ))}
          </S.SubContainer>
        ): (
          <S.SubContainer>
            {followingList.map((follower, index) => (
              <S.ItemContainer key={index} onClick={() => navigate(`/feed/${follower.accountId}`)}>
                <ProfileImage src={follower.profileImage} type="small"/>
                <S.ItemText>{follower.nickname}</S.ItemText>
                <S.FollowButton type="follower" onClick={() => console.log("팔로우 취소")}>취소</S.FollowButton>
              </S.ItemContainer>
            ))}
          </S.SubContainer>
        )}
      </S.Container>
    </Modal>
  )
}

export default FollowModal;