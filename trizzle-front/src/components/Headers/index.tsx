import React, { useEffect, useState } from "react";
import * as S from "./Headers.style";
import { HeadersProps } from "./Headers.type";
import { AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import ProfileImage from "../ProfileImage";
import logo from "../../assets/logo/Logo.svg"
import homeLogo from "../../assets/logo/homeLogo.svg"
import MainLogin from "../../pages/LoginPage/MainLogin";
import { useAsync } from "../../utils/API/useAsync";
import Notifications from "./Notification";

const Headers: React.FC<HeadersProps> = (props: HeadersProps) => {
  let headerContent;
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [state, _] = useAsync({ url: "/api/user/header" });
  const [state2, fetchData] = useAsync({ url: "" });
  const isHome = props.isHome || false;
  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('로그인');
  const [userData, setUserData] = useState<any>({});
  const [propsData, setPropsData] = useState<any>(null);
  const [isNotiOpen, setIsNotiOpen] = useState<boolean>(false);
  const [notiCount, setNotiCount] = useState<number>(0);

  useEffect(() => {
    if(state.error) {
      console.log(state.error);
      sessionStorage.setItem("accountId", "");
      sessionStorage.setItem("profileImg", "");
    }
    else {
    if(state.data){
      if(state.data.message&&state.data.message==="not login") {
        setIsLogin(false);
        sessionStorage.setItem("accountId", "");
        sessionStorage.setItem("profileImg", "");
      }
      else {
        setIsLogin(true);
        setUserData(state.data);
        setNotiCount(state.data.noti.length);
        sessionStorage.setItem("accountId", state.data.id);
        sessionStorage.setItem("profileImg", state.data.profileImg);
      }
    }
  }
  }, [state]);

  useEffect(() => {
    if(state2.error) {
      console.log(state2.error);
    } else if(state2.data) {
      if(state2.data.message === "success") {
        setNotiCount(0);
      }
    }
  }, [state2]);

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
        <Link to="/mypage/plans/add">
          <S.HeaderText>일정추가</S.HeaderText>
        </Link>
      );
    }
  }

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const reIdValue:any = params.get('reId');
    const reIdResult = decodeURIComponent(reIdValue);
    const dataValue:any = params.get('data');
    const dataResult = decodeURIComponent(dataValue);
    const tokenValue:any = params.get('token');
    const tokenResult = decodeURIComponent(tokenValue);
    setPropsData({
      registrationId : reIdResult,
      message: dataResult,
      token: tokenResult
    }
    )

    // 상태를 업데이트
    if (dataResult === "id 입력이 필요합니다") {
      setIsLoginModal(!isLoginModal);
      setModalType('회원가입');
    }
  }, []);

  const onClickNoti = () => {
    if(userData.noti && userData.noti.length !== 0) {
      if(isNotiOpen) {
        setIsNotiOpen(!isNotiOpen);
        return;
      }else {
        setIsNotiOpen(!isNotiOpen);
        fetchData(`/api/user/notification/check`);
        return;
      }
    } else {
      return;
    }
  };

  if(propsData !== null) {
  return (
    <>
      {isLogin ? (
        <S.Header isHome={isHome}>
          <Link to={"/"}>
            <S.LogoImg>
              {isHome ? (
                <img src={homeLogo} alt="logo" width="100%" height="100%" />
              ) : (
                <img src={logo} alt="logo" width="100%" height="100%" />
              )}
            </S.LogoImg>
          </Link>
          <S.RightWrapper>
            <S.HeaderIconText>
              <AiOutlinePlus size="1.1rem" />
              {headerContent}
            </S.HeaderIconText>
            <S.HeaderIconText>
              <AiOutlineBell size="1.1rem" />
              <S.HeaderText onClick={onClickNoti}>알림</S.HeaderText>
              {userData.noti && userData.noti.length !== 0 && (
                <S.AlarmBadge>{notiCount}</S.AlarmBadge>
              )}
              {isNotiOpen && (
                <Notifications notiList={userData.noti} />
              )}
            </S.HeaderIconText>
            <Link to="/myfeed">
              <ProfileImage type="small" margin="0 0 0 1.5rem" src={userData.profileImg}/>
            </Link>
          </S.RightWrapper>
        </S.Header>
      ) : (
        <S.Header isHome={isHome}>
          <Link to={"/"}>
          <S.LogoImg>
            {isHome ? (
              <img src={homeLogo} alt="logo" width="100%" height="100%" />
            ) : (
              <img src={logo} alt="logo" width="100%" height="100%" />
            )}
          </S.LogoImg>
          </Link>
          <S.RightWrapper>
            <S.HeaderText onClick={() => setIsLoginModal(!isLoginModal)} >로그인</S.HeaderText>
          </S.RightWrapper>
        </S.Header>
      )}

      {
        isLoginModal && <MainLogin type={modalType} data={propsData} onClose={() => setIsLoginModal(!isLoginModal)} />
      }
    </>


  )
    }
};

export default Headers;