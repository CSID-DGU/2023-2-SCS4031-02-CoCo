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
  const tabItems = [{name: "팔로워", URL:"follower"}, {name:"팔로잉", URL:"following"}];
  

  useEffect(() => {
    setFollowerList(props.followerList);
    setFollowingList(props.followingList);
  },[props]);

  return (
    <Modal title="팔로워/팔로잉" styleProps={{width:"40rem", height:"40rem"}} onCloseClick={props.setOpened}>
      <S.Container>
        <Tabs tabs={tabItems} selectedTab={tab} onClick={(tab) => setTab(tab)}/>
        {tab.name === "팔로워" ? (
          <S.SubContainer>
            {followerList.map((follower, index) => (
              <ItemContainer key={index} follow={follower} />
            ))}
          </S.SubContainer>
        ): (
          <S.SubContainer>
            {followingList.map((follower, index) => (
              <ItemContainer key={index} follow={follower} />
            ))}
          </S.SubContainer>
        )}
      </S.Container>
    </Modal>
  )
}

const ItemContainer:React.FC<{follow:follow}> = ({follow}) => {
  const [state, fetchData] = useAsync({url:""});
  const [isFollow, setIsFollow] = useState<boolean>(follow.follow);
  const navigate = useNavigate();
  const myAccountId = sessionStorage.getItem("accountId");

  const onFollow = (accountId: string) => {
    const followData = {
      followeeId: accountId,
    }
    fetchData(`/api/follows`, "POST", followData); 
  }

  useEffect(() => {
    setIsFollow(follow.follow);
  }, [follow]);

  useEffect(() => {
    if(state.error) {
      alert("error");
    } else if(state.data) {
      setIsFollow(state.data.isFollow);
    }
  }, [state]);

  return (
    <S.ItemContainer >
      <ProfileImage src={follow.profileImage} type="small"/>
      <S.ItemText onClick={() => navigate(`/feed/${follow.accountId}`)}>{follow.nickname}</S.ItemText>
      {myAccountId !== follow.accountId && 
      <S.FollowButton type={isFollow} onClick={() => onFollow(follow.accountId)}>{isFollow ? "취소" : "팔로우"}</S.FollowButton>
      }
    </S.ItemContainer>
  )

}

export default FollowModal;