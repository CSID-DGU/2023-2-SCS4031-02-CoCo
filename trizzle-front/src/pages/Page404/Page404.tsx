import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from './Page404.style';
import logo from '../../assets/logo/Logo.svg'

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.HomeLogo src={logo} onClick={() => navigate('/')} />
      <S.Container>
        <S.HorizontalCenterContainer>
          <S.Text6>404</S.Text6>
          <S.Text5>Not Found</S.Text5>
        </S.HorizontalCenterContainer>
        <S.Text4>원하시는 페이지를 찾을 수 없습니다</S.Text4>
        <S.VerticalCenterContainer>
          <S.Text3>잘못된 페이지의 주소로 입력되었거나,</S.Text3>
          <S.Text3>해당 주소의 변경 혹은 삭제로 인해 사용하실 없습니다.</S.Text3>
          <S.Text3>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</S.Text3>
        </S.VerticalCenterContainer>
        <S.HomeButton onClick={() => navigate('/')}>TRIZZLE 홈으로 이동</S.HomeButton>
      </S.Container>
    </>
  )
}

export default Page404;