import * as S from './style'
import FirstImage from '../../assets/images/FirstContainerImage.png'
import { useNavigate } from 'react-router-dom'
import svg from '../../assets/landing.svg'
import copy from '../../assets/images/copy.png'
import Headers from '../../components/Headers'

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const TagArray = [{
    name: "#거제여행",
    link: "/post/plan/65719f55838cd834279c3512"
  },
  {name: "#대전빵킷여행",
  link: "/post/plan/65704a8c550bff2fc77d7b02"
  },
  {
    name: "#뚜벅이강릉여행",
    link: '/post/plan/657054ba550bff2fc77d7b09'
  },
  {
    name: "#당일치기대전",
    link: '/post/plan/657088a2f3ad9e2ae5c08a21'
  }
]

  return (
    <S.Container>
      <Headers isHome={false}/>
      <S.FirstContainer>
        <S.Image>
        <S.ThirdContainerCover src={FirstImage} alt="" width="980" height="921"/>
        </S.Image>
        <S.MoreButton onClick={() => navigate("/home")}>more</S.MoreButton>
        <S.TagContainer>
          {TagArray.map((tag, index) => (
            <S.TagButton key={index} onClick={() => navigate(tag.link)}>{tag.name}</S.TagButton>
          )
          )}
        </S.TagContainer>
      </S.FirstContainer>
      <S.SecondContainer>
        <S.SecondTitle>ABOUT US</S.SecondTitle>
        <S.DescribesContainer>
          <S.DescribeContainer>
            <S.Icon src={svg} alt="" width="100" height="100"/>
            <div className="section">일정</div>
            <div className="des">여행 일정을 장소 리뷰와 함께 확인하시고, 쉽게 일정을 만들어보세요!</div>
          </S.DescribeContainer>
          <S.DescribeContainer>
            <S.Icon src={svg} alt="" width="100" height="100"/>
            <div className="section">리뷰</div>
            <div className="des">다녀온 장소에 대해 당신의 생생한 경험담을 기록해주세요. 당신의 상세한 기록은 장소에 대한 진실성을 부여합니다.</div>
          </S.DescribeContainer>
          <S.DescribeContainer>
            <S.Icon src={svg} alt="" width="100" height="100"/>
            <div className="section">커뮤니티</div>
            <div className="des">댓글과 좋아요로 다른사람들의 반응도 함께 확인하고, 취향에 맞는 여행 테마를 찾아 보세요!</div>
          </S.DescribeContainer>
        </S.DescribesContainer>
      </S.SecondContainer>
      <S.LastContainer>
        <div className="title">간편한 일정 짜기</div>
        <S.LastContainerCover>
          <S.ThirdContainerCover src={copy} alt="" />
        </S.LastContainerCover>
        <S.ImageContainer src='https://static.wixstatic.com/media/bdbe75_ea087b93c4cb4238b18ef945173888d1~mv2.png/v1/fill/w_260,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bdbe75_ea087b93c4cb4238b18ef945173888d1~mv2.png' alt=''/>
      </S.LastContainer>
    </S.Container>
    
  )
}

export default Landing;