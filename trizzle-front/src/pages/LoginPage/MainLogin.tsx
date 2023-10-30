import React, { useState } from "react";
import Page from "../Page";
import * as S from './MainLogin.styles';
import { GoogleLogin, KakaoLogin } from "./SnsLoginButton";

import { tripThema } from "../../utils/tripThema";
import DropdownMenu from "../../components/DropdownMenu";

export default function MainLogin({ onClose }) {
  const [isStart, setIsStart] = useState('');
  const [userSearch, setUserSearch] = useState(false);
  const [thema, setThema] = useState<any[]>([]);
  let components;

  const onThemaBadgeClick = (select: any) => {
    // 선택한 아이템이 thema 배열에 이미 존재하는지 확인
    const itemExists = thema.some((item) => item.id === select.id);

    if (itemExists) {
      // 이미 선택한 아이템이 있는 경우, 해당 아이템을 제거
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      setThema((prev) => [...prev, select]);
    }
  };

  if (isStart === '회원가입') {
    components = (
      <S.userModalWrapper>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
          <S.title>회원정보 입력</S.title>
          <S.content>
            가입되지 않은 회원이기에 <br />회원으로 등록하시려면 정보를 입력해주세요
          </S.content>
          <S.userContainer>
            <S.userContents>어떤 이름으로 활동하시겠습니까?</S.userContents>
            <S.userInput />
            <S.userContents>자신의 여행테마를 선택해주세요</S.userContents>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
          </S.userContainer>
        </div>
        <S.checkButton>회원 정보 등록</S.checkButton>
      </S.userModalWrapper>
    );
  } else if (isStart === '회원 정보 검색') {
    components = (
      <S.userModalWrapper>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
          <S.title>회원 정보 확인</S.title>
          <S.content>
            이메일로 본인 정보 확인 부탁드립니다.
          </S.content>
          <S.userContainer>
            <S.userContents>이름</S.userContents>
            <S.userInput />
            <S.userContents>이메일</S.userContents>
            <S.userInput />
            <S.userContents>이메일 인증</S.userContents>
            <S.userInput />
          </S.userContainer>
        </div>
        <S.checkButton>회원 정보 확인</S.checkButton>
      </S.userModalWrapper>
    );
  } else {
    components = (
      <S.loginModalWrapper>
        <S.title>로그인</S.title>
        <S.content>Trizzle에 방문해 주셔서 감사합니다</S.content>
        <S.ButtonContainer>
          <KakaoLogin onLogin={() => setIsStart('회원가입')} />
          <GoogleLogin onLogin={() => setIsStart('회원가입')} />
        </S.ButtonContainer>
        <S.findContainer>
          <S.findContents onClick={() => setIsStart('회원 정보 검색')}>소셜회원정보확인</S.findContents>
        </S.findContainer>
      </S.loginModalWrapper >
    );
  }

  return (
    <>
      <S.Blur onClick={onClose} />
      {components}
    </>
  )
}
