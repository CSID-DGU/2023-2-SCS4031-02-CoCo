import React, { useEffect, useState } from "react";
import * as S from "./Headers.style";
import { HeadersProps } from "./Headers.type";
import { AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/images/default_avatar.png"
import logo from "../../assets/logo/Logo.svg"
import homeLogo from "../../assets/logo/homeLogo.svg"
import MainLogin from "../../pages/LoginPage/MainLogin";

const Headers: React.FC<HeadersProps> = (props: HeadersProps) => {
  const location = useLocation();
  const isLogin = false;
  const isHome = props.isHome || false;
  const [isLoginModal, setIsLoginModal] = useState(false);
  let headerContent;

  if (isLogin) {
    if (location.pathname.includes('/myfeed/plans/')) {
      headerContent = (
        <Link to="/myfeed/plans/add">
          <S.HeaderText>일정추가</S.HeaderText>
        </Link>
      );
    } else if (location.pathname.includes('/post/places/')) {
      headerContent = (
        <Link to="/post/places/add">
          <S.HeaderText>장소추가</S.HeaderText>
        </Link>
      );
    } else {
      headerContent = (
        <Link to="/myfeed/plans/add">
          <S.HeaderText>일정추가</S.HeaderText>
        </Link>
      );
    }
  }

  return (
    <>
      {isLogin === true ? (
        <S.Header isHome={isHome}>
          <S.LogoImg>
            {isHome ? (
              <img src={homeLogo} alt="logo" width="100%" height="100%" />
            ) : (
              <img src={logo} alt="logo" width="100%" height="100%" />
            )}
          </S.LogoImg>
          <S.RightWrapper>
            <S.HeaderIconText>
              <AiOutlinePlus size="1.1rem" />
              {headerContent}
            </S.HeaderIconText>
            <S.HeaderIconText>
              <AiOutlineBell size="1.1rem" />
              <S.HeaderText>알림</S.HeaderText>
              {props.alarmCount && props.alarmCount !== 0 && (
                <S.AlarmBadge>{props.alarmCount}</S.AlarmBadge>
              )}
            </S.HeaderIconText>
            <Link to="/myfeed">
              <S.Avatar src={props.avatarSrc ? props.avatarSrc : avatar} alt="avatar" />
            </Link>
          </S.RightWrapper>
        </S.Header>
      ) : (
        <S.Header isHome={isHome}>
          <S.LogoImg>
            {isHome ? (
              <img src={homeLogo} alt="logo" width="100%" height="100%" />
            ) : (
              <img src={logo} alt="logo" width="100%" height="100%" />
            )}
          </S.LogoImg>
          <S.RightWrapper>
            <button onClick={() => setIsLoginModal(!isLoginModal)}>로그인</button>
          </S.RightWrapper>
        </S.Header>
      )}

      {
        isLoginModal && <MainLogin onClose={() => setIsLoginModal(!isLoginModal)} />
      }
    </>


  )
};

export default Headers;