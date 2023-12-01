import React from "react";
import ProfileImage from "../../components/ProfileImage";
import * as S from "./UserProfile.style";
import FollowModal from "../FollowModal";
import { follow } from "../FollowModal/FollowModal.type";

type UserProfileProps = {
  nickName: string;
  keyword: string[];
  isFollow?: boolean;
  isMe?: boolean;
  src?: string;
  follower: follow[];
  following: follow[];
  onFollowClick?: () => void;
};

const UserProfile: React.FC<UserProfileProps> = (props: UserProfileProps) => {
  const [tab, setTab] = React.useState<any>(null);
  const [followModalOpened, setFollowModalOpened] = React.useState<boolean>(false);

  return (
    <S.Container>
      <ProfileImage type="big" isMe={false} src={props.src ? props.src : ""} />
      <S.RightContainer>
        <S.HorizontalContainer>
          <S.Nickname>{props.nickName}</S.Nickname>
        </S.HorizontalContainer>

        {/* <S.HorizontalContainer>
          <FaMapMarkedAlt size="1rem" color="#89711B"/>
          <S.CountText>{props.planCount}</S.CountText>
          <BiSolidMap size="1rem" color="#89711B"/>
          <S.CountText>{props.placeCount}</S.CountText>
        </S.HorizontalContainer> */}

        <S.TripThemaTitle>관심 여행 테마</S.TripThemaTitle>
        <S.TripThemaContainer>
          {props.keyword.map((item, index) => (
            <S.TripThema key={index}>{item}</S.TripThema>
          ))}
        </S.TripThemaContainer>
        <S.HorizontalContainer>
          <S.FollowText
            onClick={() => {
              setTab({ name: "팔로워", URL: "follower" });
              setFollowModalOpened(!followModalOpened);
            }}
          >
            팔로워
          </S.FollowText>
          <S.CountText>{props.follower.length}</S.CountText>
          <S.FollowText
            onClick={() => {
              setTab({ name: "팔로잉", URL: "following" });
              setFollowModalOpened(!followModalOpened);
            }}
          >
            팔로잉
          </S.FollowText>
          <S.CountText>{props.following.length}</S.CountText>
        </S.HorizontalContainer>
        {props.isMe === false && (
          <S.FollowButton
            onClick={props.onFollowClick}
            isFollow={props.isFollow}
          >
            {props.isFollow ? "팔로우중" : "팔로우"}
          </S.FollowButton>
        )}
      </S.RightContainer>
      {followModalOpened && (
        <FollowModal
          followerList={props.follower}
          followingList={props.following}
          tab={tab}
          setOpened={() => setFollowModalOpened(!followModalOpened)}
        />
      )}
    </S.Container>
  );
}

export default UserProfile;

