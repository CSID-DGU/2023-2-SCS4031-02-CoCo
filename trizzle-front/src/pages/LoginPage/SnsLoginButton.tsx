import React from "react";
import Page from "../Page";
import * as S from './SnsLoginButton.styles';
import kakaoImg from '../../assets/images/KakaoTalk_logo.png';
import googleImg from '../../assets/images/GoogleLogo.png';

export const GoogleLogin = ({onLogin}) => {

  return (
    <S.GoogleButton onClick={onLogin}>
      <S.logoImage src={googleImg} />
      <S.text>구글로 계속하기</S.text>
    </S.GoogleButton>
  )
}

export const KakaoLogin = ({onLogin}) => {

  return (
    <S.KakaoButton onClick={onLogin}>
      <S.logoImage src={kakaoImg} />
      <S.text>카카오로 계속하기</S.text>
    </S.KakaoButton>
  )
}

