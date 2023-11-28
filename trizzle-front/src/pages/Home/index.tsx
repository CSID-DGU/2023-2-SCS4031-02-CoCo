import Page from "../Page";
import { useEffect, useState } from "react";
import * as S from "./Home.style";
import HomePlanSlider from "../../shared/HomePlanSlider";
import SearchBar from "../../components/SearchBar";
import FestivalCard from "../../shared/FestivalCard";
import HorizontalScrollContainer from "../../components/HorizontalScrollComponent";
import Paging from "../../components/Paging";
import { useAsync } from "../../utils/API/useAsync";

const Home = () => {
  const [festivalLists, setFestivalLists] = useState<any>(null);
  const [topPlanLists, setTopPlanLists] = useState<any>(null);
  const [leastPlanLists, setLeastPlanLists] = useState<any>(null);
  const [state,] = useAsync({url: "/api/posts/home"})


  useEffect(() => {
    if(state.error) console.log(state.error);
    else if(state.data) {
      setTopPlanLists(state.data.top4);
      setLeastPlanLists(state.data.least.content);
      setFestivalLists(state.data.festival);
    }
  }, [state]);

  return (
    <>
        <Page
          headersProps={{
            isHome: true,
          }}
        >
          <SearchBar type="main"/>
          <S.SectionTitle>급상승! 현재 인기 일정 <b style={{fontWeight:"500"}}>&nbsp;TOP </b><p style={{color:"red"}}>&nbsp;4</p></S.SectionTitle>
          {topPlanLists !== null &&
          <HomePlanSlider planList={topPlanLists} />
          }
          <S.SectionTitle style={{marginBottom:"2rem"}}>이런 축제는 어떠세요?</S.SectionTitle>
          <HorizontalScrollContainer moveDistance={355} type="main">
            {festivalLists !== null && festivalLists.map((festival:any, index:number) => {
              return (
                  <FestivalCard key={index} festival={festival}/>
              )
            })}
          </HorizontalScrollContainer>
          <S.SectionTitle style={{marginBottom:"2rem"}}>따끈따끈! 최근 공유된 일정!</S.SectionTitle>
          {leastPlanLists !== null &&
          <Paging items={leastPlanLists} type="horizontalPlan" perPage={3}/>
          }
        </Page>
      
    </>
  )

};

export default Home;