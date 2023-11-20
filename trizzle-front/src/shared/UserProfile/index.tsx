import React from "react";
import ProfileImage from "../../components/ProfileImage";
import * as S from "./UserProfile.style";
import { AiOutlineSetting } from "react-icons/ai";

type UserProfileProps = {
  nickName: string;
  keyword: string[];
  isFollow?: boolean;
  isMe?: boolean;
  src?: string;
  planCount: number;
  placeCount: number;
  follower: any[];
  following: any[];
  onFollowClick?: () => void;
};

const UserProfile: React.FC<UserProfileProps> = (props: UserProfileProps) => {

  return (
    <S.Container>
      <ProfileImage type="big" isMe={false} src={props.src? props.src: ""}/>
      <S.RightContainer>
        <S.HorizontalContainer>
          <S.Nickname>{props.nickName}</S.Nickname>
          {props.isMe === true && <AiOutlineSetting size="1.8rem" color="#dadada"/>}
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
          <S.FollowText>팔로워</S.FollowText>
          <S.CountText>{props.follower.length}</S.CountText>
          <S.FollowText>팔로잉</S.FollowText>
          <S.CountText>{props.following.length}</S.CountText>
        </S.HorizontalContainer>
        {props.isMe===false &&
        <S.FollowButton onClick={props.onFollowClick} isFollow={props.isFollow} >{props.isFollow ? "팔로우중" : "팔로우"}</S.FollowButton>
        }
      </S.RightContainer>
    </S.Container>
  )
}

export default UserProfile;

