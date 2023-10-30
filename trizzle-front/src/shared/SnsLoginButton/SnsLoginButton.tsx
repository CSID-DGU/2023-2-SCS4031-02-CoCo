import React, { useState } from "react";
import Page from "../Page";
import * as S from './SnsLoginButton.styles';
import kakaoImg from '../../assets/images/KakaoTalk_logo.png';
import googleImg from '../../assets/images/GoogleLogo.png';

export const GoogleLogin = ({ onLogin }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <S.GoogleButton
      onClick={onLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.GoogleLogoImage src={googleImg} />
      <S.GoogleText isHover={isHovered}>구글 계정으로 로그인</S.GoogleText>
    </S.GoogleButton>
  )
}

export const KakaoLogin = ({ onLogin }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <S.KakaoButton
      onClick={onLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.KakaoLogoImage src={kakaoImg} />
      <S.KakaoText isHover={isHovered}>카카오 계정으로 로그인</S.KakaoText>
    </S.KakaoButton>
  )
}

