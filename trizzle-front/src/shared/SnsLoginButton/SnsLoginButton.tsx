import React, { useEffect, useState } from "react";
import * as S from './SnsLoginButton.styles';
import kakaoImg from '../../assets/images/KakaoTalk_logo.png';
import googleImg from '../../assets/images/GoogleLogo.png';

const url = import.meta.env.VITE_API_URL;

export const GoogleLogin = () => {
  const [isHovered, setIsHovered] = useState(false);

  const actionLogin = () => {
    window.location.href = `${url}/login/google`;
  }


  return (
    <S.GoogleButton
      onClick={actionLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.GoogleLogoImage src={googleImg} />
      <S.GoogleText isHover={isHovered}>구글 계정으로 로그인</S.GoogleText>
    </S.GoogleButton>
  )
}

export const KakaoLogin = () => {
  const [isHovered, setIsHovered] = useState(false);

  const actionLogin = () => {
    window.location.href = `${url}/login/kakao`;
  }

  return (
    <S.KakaoButton
      onClick={actionLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.KakaoLogoImage src={kakaoImg} />
      <S.KakaoText isHover={isHovered}>카카오 계정으로 로그인</S.KakaoText>
    </S.KakaoButton>
  )
}

