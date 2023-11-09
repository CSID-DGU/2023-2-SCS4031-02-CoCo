import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from './MainLogin.styles';
import { GoogleLogin, KakaoLogin } from "../../shared/SnsLoginButton/SnsLoginButton";
import { useAsync } from "../../utils/API/useAsync";
import { tripThema } from "../../utils/Data/tripThema";
import DropdownMenu from "../../components/DropdownMenu";
import LogoImg from '../../assets/logo/nonTextLogo.svg'

interface MainLoginProps {
  type: string;
  data: {};
  onClose: (value: boolean) => void;
}

export default function MainLogin({ type, data, onClose }: MainLoginProps) {
  const naviation = useNavigate();
  const token = data.token;
  const [thema, setThema] = useState<any[]>([]);
  const [userData, setUserData] = useState({
    "accountId": '',
    "nickname": '',
    "thema": [],
    "registrationId": data.registrationId,
  });
  const [state, fetchData] = useAsync({ url: "" });
  let components;

  const onThemaBadgeClick = (select: any) => {

    // 선택한 아이템이 thema 배열에 이미 존재하는지 확인
    const itemExists = thema.some((item) => item.id === select.id);

    if (itemExists) {
      // 이미 선택한 아이템이 있는 경우, 해당 아이템을 제거
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      // 선택한 아이템이 없는 경우, 해당 아이템을 추가
      if (thema.length > 4) alert("5개 이하로 선택해주세요");
      else setThema((prev) => [...prev, select]);
    }

  };

  // const addUser = () => {
  //   fetchData(`/login/additionalUserInfo?token=${token}`, "POST", userData);
  //   console.log(userData);
  //   console.log(state);
  // }

  const addUser = async () => {
    console.log(userData);
    try {
      const response = await axios.post(`http://localhost:8080/login/additionalUserInfo?token=${token}`, userData);
      const data = response.data; // 응답 데이터
      if (data.message === "이미 존재하는 id 입니다.") {
        alert("이미 존재하는 id입니다.");
      } else if (data.message === "login success") {
        alert("성공적으로 회원가입이 되었습니다. 로그인을 진행해주세요.");
        naviation('/');
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  const closeModal = () => {
    onClose(false);
  }

  const handleAccountIdChange = (event: any) => {
    // Update the account_id value in userData
    setUserData({
      ...userData,
      accountId: event.target.value
    });
  };

  const handleNicknameChange = (event: any) => {
    // Update the nickname value in userData
    setUserData({
      ...userData,
      nickname: event.target.value
    });
  };

  useEffect(() => {
    if (thema.length > 0) {
      const themaNames = thema.map((item) => item.name); // 첫 번째 항목을 선택하거나 다른 방식으로 선택

      setUserData((prevUserData) => {
        return {
          ...prevUserData,
          thema: themaNames
        };
      });
    }
  }, [thema]);

  if (type === '회원가입') {
    components = (
      <S.UserModalWrapper>
        <S.Container>
          <S.LogoImage src={LogoImg} />
          <S.Title>추가 정보 입력</S.Title>
          <S.UserContainer>
            <S.UserContents>아이디를 입력해주세요</S.UserContents>
            <S.UserInput
              type="text"
              value={userData.accounId}
              onChange={handleAccountIdChange} />
            <S.UserContents>어떤 이름으로 활동하시겠습니까?</S.UserContents>
            <S.UserInput
              type="text"
              value={userData.nickname}
              onChange={handleNicknameChange} />
            <S.UserContents>자신의 여행테마를 선택해주세요</S.UserContents>
            <div>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
            </div>
          </S.UserContainer>
        </S.Container>
        <S.CheckButton onClick={addUser}>회원 정보 등록</S.CheckButton>
      </S.UserModalWrapper>
    );
  } else {
    components = (
      <S.LoginModalWrapper>
        <S.Container>
          <S.LogoImage src={LogoImg} />
          <S.Title>로그인</S.Title>
          <S.Content>회원으로 Trizzle을 이용해보세요 </S.Content>
          <S.ButtonContainer>
            <KakaoLogin />
            <GoogleLogin />
          </S.ButtonContainer>
        </S.Container>
        <S.Text3>
          계속 진행할 경우, Trizzle의 개인정보 취급방침 및 쿠키 정책에 동의한 것으로 간주됩니다.
          <br />
          이 사이트는 reCAPTCHA에 의해 보호되며 Google 개인정보 취급방침 및 이용 약관이 적용됩니다.</S.Text3>
      </S.LoginModalWrapper >
    );
  }

  return (
    <>
      <S.Blur onClick={closeModal} />
      {components}
    </>
  )
}

