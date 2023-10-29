import React from "react";
import * as S from "./ProfileImage.style";
import { ProfileImageProps } from "./ProfileImage.type";
import { AiOutlineCamera } from "react-icons/ai";
import avatar from "../../assets/images/default_avatar.png"

const ProfileImage: React.FC<ProfileImageProps> = (props: ProfileImageProps) => {
  const imageSrc = props.src? props.src : avatar;
  console.log(props.isMe);
  if(props.type === "big") {
    return (
      <S.BigContainer margin={props.margin}>
        <S.ProfileImage src={imageSrc} alt="profile" />
        {props.isMe===true && <S.CameraContainer><AiOutlineCamera color="#fff" size="1.5rem"/></S.CameraContainer>}
      </S.BigContainer>
    );
  } else if(props.type === "small") {
    return (
      <S.SmallContainer margin={props.margin}>
        <S.ProfileImage src={imageSrc} alt="profile" />
      </S.SmallContainer>
    );
  }
};

export default ProfileImage;