import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";

import * as S from './MainLogin.styles';
import { GoogleLogin, KakaoLogin } from "../../shared/SnsLoginButton/SnsLoginButton";
import { tripThema } from "../../utils/Data/tripThema";
import DropdownMenu from "../../components/DropdownMenu";
import LogoImg from '../../assets/logo/nonTextLogo.svg'

interface MainLoginProps {
  type: string;
  data: any;
  onClose: () => void;
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
  const [state, fetchData] = useAsync({url: ""});
  
  const isValidId = (id: string) => {
    const idReg = /^[a-zA-Z0-9]{4,12}$/;
    return idReg.test(id);
  }

  const isValidNickname = (nickname: string) => {
    const nicknameReg = /^[가-힣|a-z|A-Z|0-9|\*]{2,10}$/;
    return nicknameReg.test(nickname);
  }

  let components;

  const onThemaBadgeClick = (select: any) => {
    const itemExists = thema.some((item) => item.id === select.id);
    if (itemExists) {
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      if (thema.length > 4) alert("5개 이하로 선택해주세요");
      else setThema((prev) => [...prev, select]);
    }
  };

  const addUser = () => {
    if(!isValidId(userData.accountId)) {
      alert("아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요");
      return;
    }
    if(!isValidNickname(userData.nickname)) {
      alert("닉네임은 2~10자의 한글, 영문, 숫자로만 입력해주세요");
      return;
    }
    if(thema.length === 0) {
      alert("테마를 선택해주세요");
      return;
    }
    fetchData(`/api/login/additionalUserInfo?token=${token}`, "POST", userData);
  }

  useEffect(() => {
    if(state.error) {
      console.log(state.error);
      alert("로그인에 실패했습니다")}
    else {
      if(state.data) {
        if(state.data.message === "이미 존재하는 id 입니다.") alert("이미 존재하는 id입니다.");
        else if(state.data.message === "login success") {
          alert("성공적으로 회원가입이 되었습니다. 자동으로 로그인됩니다.");
          onClose();
          naviation('/')
          location.reload();
        }
      }
    }
  }, [state]);

  const closeModal = () => {
    onClose();
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

      setUserData((prevUserData:any) => {
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
              value={userData.accountId}
              onChange={handleAccountIdChange} />
            <S.UserContents>어떤 이름으로 활동하시겠습니까?</S.UserContents>
            <S.UserInput
              type="text"
              value={userData.nickname}
              onChange={handleNicknameChange} />
            <S.UserContents>자신의 여행테마를 선택해주세요</S.UserContents>
            <DropdownMenu type="badge" name="여행테마를 선택해주세요" items={tripThema} selectedItem={thema} onClick={(thema) => onThemaBadgeClick(thema)} />
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

