import Page from "../Page";
import { useEffect, useState } from "react";
import { getFestivalList} from "../../utils/Data/tourData";
import * as S from "./Home.style";
import HomePlanSlider from "../../shared/HomePlanSlider";
import SearchBar from "../../components/SearchBar";
import FestivalCard from "../../shared/FestivalCard";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import Paging from "../../components/Paging";



const PlanLists = [
  {
    id: "1",
    title: "제주도 3박 4일 여행",
    image: "https://www.expedia.co.kr/stories/wp-content/uploads/2022/05/04-4.jpg",
    tags: ["혼자 여행", "뚜벅이 여행"]
  },
  {
    id: "2",
    title: "서울 3박 4일 여행",
    image: "https://www.expedia.co.kr/stories/wp-content/uploads/2022/05/04-4.jpg",
    tags: ["혼자 여행", "뚜벅이 여행"]
  },
  {
    id: "3",
    title: "인천 3박 4일 여행",
    image: "https://www.expedia.co.kr/stories/wp-content/uploads/2022/05/04-4.jpg",
    tags: ["혼자 여행", "뚜벅이 여행"]
  },
  {
    id: "4",
    title: "구리 3박 4일 여행",
    image: "https://www.expedia.co.kr/stories/wp-content/uploads/2022/05/04-4.jpg",
    tags: ["혼자 여행", "뚜벅이 여행"]
  }
];

const PlanCardLists = [
  {planId:1, region:"서울특별시", title:"즐거운 서울 나들이", startDate:"2021.10.31", endDate:"2021.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:2, region:"제주특별자치도", title:"즐거운 제주도 나들이", startDate:"2022.10.31", endDate:"2022.11.01", thumbnail:"https://news.tbs.seoul.kr/Upload/Image/20230520/00000000000001325124.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:3, region:"경기도", title:"즐거운 경기도 나들이", startDate:"2023.10.31", endDate:"2023.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:1, region:"서울특별시", title:"즐거운 인천 나들이", startDate:"2021.10.31", endDate:"2021.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:2, region:"제주특별자치도", title:"즐거운 바다 나들이", startDate:"2022.10.31", endDate:"2022.11.01", thumbnail:"https://news.tbs.seoul.kr/Upload/Image/20230520/00000000000001325124.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
  {planId:3, region:"경기도", title:"즐거운 하늘 나들이", startDate:"2023.10.31", endDate:"2023.11.01", thumbnail:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", likeCount:3, commentCount:2, thema:["카페", "맛집", "공원"], userId:"김희진"},
];

const Home = () => {
  const [festivalLists, setFestivalLists] = useState<any[]>([]);


  useEffect(() => {
    const getFestivalData = async () => {
      const festivalData = await getFestivalList();
      setFestivalLists(festivalData);
    };
    getFestivalData();

  }, []);

  return (
    <>
        <Page
          headersProps={{
            isHome: true,
          }}
        >
          <SearchBar type="main"/>
          <S.SectionTitle>급상승! 현재 인기 일정 <b style={{fontWeight:"500"}}>&nbsp;TOP </b><p style={{color:"red"}}>&nbsp;4</p></S.SectionTitle>
          <HomePlanSlider planList={PlanLists} />

          <S.SectionTitle style={{marginBottom:"2rem"}}>이런 축제는 어떠세요?</S.SectionTitle>
          <HorizontalScrollContainer moveDistance={355} type="main">
            {festivalLists.map((festival, index) => {
              return (
                <FestivalCard key={index} festival={festival}/>
              )
            })}
          </HorizontalScrollContainer>
          <S.SectionTitle style={{marginBottom:"2rem"}}>이런 일정은 어떠세요?</S.SectionTitle>
          <Paging items={PlanCardLists} type="horizontalPlan" perPage={3}/>
        </Page>
      
    </>
  )

};

export default Home;