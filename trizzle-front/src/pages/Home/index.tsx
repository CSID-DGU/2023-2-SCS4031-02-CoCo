import Page from "../Page";
import { useEffect, useState } from "react";
import { getFestivalList} from "../../utils/Data/tourData";
import * as S from "./Home.style";
import HomePlanSlider from "../../shared/HomePlanSlider";
import SearchBar from "../../components/SearchBar";


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

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [festivalLists, setFestivalLists] = useState<any[]>([]);


  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const reIdValue:any = params.get('reId');
    const reIdResult = decodeURIComponent(reIdValue);
    const dataValue:any = params.get('data');
    const dataResult = decodeURIComponent(dataValue);
    const tokenValue:any = params.get('token');
    const tokenResult = decodeURIComponent(tokenValue);

    // 상태를 업데이트
    setRegistrationId(reIdResult);
    setMessage(dataResult);
    setToken(tokenResult);
  
    const getFestivalData = async () => {
      const festivalData = await getFestivalList();
      setFestivalLists(festivalData);
    };
    getFestivalData();

  }, []);

  console.log(festivalLists);
  return (
    <>
      {registrationId && message && token && (
        <Page
          headersProps={{
            isLogin: isLogin,
            isHome: true,
            isRegistrationId: registrationId,
            isMassage: message,
            isToken: token,
          }}
        >
          <div style={{marginBottom:"5rem"}}/>
          <SearchBar type="main"/>
          <S.SectionTitle>급상승! 현재 인기 일정</S.SectionTitle>
          <HomePlanSlider planList={PlanLists} />
        </Page>
      )}
    </>
  )

};

export default Home;