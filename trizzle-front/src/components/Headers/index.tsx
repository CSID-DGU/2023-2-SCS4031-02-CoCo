import React from "react";
import * as S from "./Headers.style";
import { HeadersProps } from "./Headers.type";
import {AiOutlineBell, AiOutlinePlus} from "react-icons/ai";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/default_avatar.png"
import logo from "../../assets/logo/Logo.svg"
import homeLogo from "../../assets/logo/homeLogo.svg"

const Headers: React.FC<HeadersProps> = (props: HeadersProps) => {
  const isLogin = props.isLogin || true;
  const isHome = props.isHome || false;
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  console.log(publicUrl);

  return (
    <>
    {isLogin === true? (
      <S.Header isHome={isHome}>
      <S.LogoImg>
        {isHome ? (
          <img src={homeLogo} alt="logo" width="100%" height="100%"/>
          ):(
          <img src={logo} alt="logo" width="100%" height="100%"/>
          )}
      </S.LogoImg>
      <S.RightWrapper>
        <S.HeaderIconText>
          <AiOutlinePlus size="1.1rem"/>
          <Link to="/id/plan/addPlan">
            <S.HeaderText>일정추가</S.HeaderText>
          </Link>
        </S.HeaderIconText>
        <S.HeaderIconText>
          <AiOutlineBell size="1.1rem"/>
          <S.HeaderText>알림</S.HeaderText>
          {props.alarmCount && props.alarmCount !== 0 && (
            <S.AlarmBadge>{props.alarmCount}</S.AlarmBadge>
    )}
        </S.HeaderIconText>
        <S.Avatar src={props.avatarSrc? props.avatarSrc : avatar} alt="avatar"/>
      </S.RightWrapper>
    </S.Header>
    ):(

      <>
      </>
    )}
    </>
    

  )
};

export default Headers;