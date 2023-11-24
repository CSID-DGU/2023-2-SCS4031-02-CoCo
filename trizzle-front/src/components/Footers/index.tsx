import * as S from "./Footer.style";
import logo from '../../assets/logo/nonTextLogo.svg';
import githubLogo from '../../assets/images/githubLogo.png'
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <S.Footer>
      <S.Container>
        <S.HorizontalContainer>
          <img src={logo} alt="TRIZZLE" />

          <S.VerticalContainer>
            <S.MinText>© 2023 TRIZZLE Copyright. All rights reserved.</S.MinText>
            <div style={{ margin: '0.5rem 0 0 0' }}>
              <S.MIddleText>제휴문의 : CoCo2023@gmail.com</S.MIddleText>
              <S.HorizontalContainer>
                <Link to='/information/personal'>
                  <S.MIddleTextLink style={{ margin: '0.2rem 0 0 1rem' }}>개인정보 이용방침</S.MIddleTextLink>
                </Link>
                <S.Sortation style={{ margin: '0.2rem 1rem 0 1rem' }}>|</S.Sortation>
                <Link to="/help">
                  <S.MIddleTextLink>고객센터</S.MIddleTextLink>
                </Link>
              </S.HorizontalContainer>
            </div>
          </S.VerticalContainer>

          {/**추후 설명 페이지 추가 */}
          <S.VerticalContainer>
            <S.LargeText>제공 서비스</S.LargeText>
            <S.HorizontalContainer style={{ margin: '0.2rem 0 0 0.5rem' }}>
              <S.MIddleText>리뷰 등록</S.MIddleText>
              <S.Sortation>|</S.Sortation>
              <S.MIddleText>내 일정 등록</S.MIddleText>
              <S.Sortation>|</S.Sortation>
              <S.MIddleText>일정 리뷰 연동</S.MIddleText>
              <S.Sortation>|</S.Sortation>
              <S.MIddleText>일정 복사</S.MIddleText>
              <S.Sortation>|</S.Sortation>
              <S.MIddleText>일정 / 장소 검색</S.MIddleText>
              <S.Sortation>|</S.Sortation>
              <S.MIddleText>일정 / 장소 추천</S.MIddleText>
            </S.HorizontalContainer>

          </S.VerticalContainer>

        </S.HorizontalContainer>
        <Link style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} to='https://github.com/CSID-DGU/2023-2-SCS4031-02-CoCo.git' target="_blank">
          <img src={githubLogo} alt="github" style={{ margin: '0 1rem 0 0', width: '1.5rem' }} />
        </Link>
      </S.Container>
    </S.Footer>
  )
}

export default Footer;