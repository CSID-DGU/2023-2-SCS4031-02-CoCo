import Headers from "../../components/Headers";
import React, {useState, useEffect} from "react";
import { HeadersProps } from "../../components/Headers/Headers.type";
import Footer from "../../components/Footers";
import styled from "@emotion/styled";
import Tabs from "../../components/Tabs";
import * as S from "./Page.style";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { koreaRegions } from "../../utils/Data/mapData";
import SearchBar from "../../components/SearchBar";

type PageProps = {
  headersProps: HeadersProps;
  children?: React.ReactNode;
}

const DefaultBody = styled.div`
  width: 87.5rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 4.5rem;
  padding: 0 8rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const Page: React.FC<PageProps> = (props: PageProps) => {
  return (
    <>
      <Headers {...props.headersProps}/>
        <DefaultBody>
          {props.children}
        </DefaultBody>
      <Footer/>
    </>
  )
}

export default Page;

export const MyfeedLayout: React.FC<{children: React.ReactNode, isMe:boolean, selectTab?:any}> = ({children, isMe, selectTab}) => {
  const tabs = [{name: "내 정보", URL:"info"}, {name:"여행 계획", URL:"plans"}, {name:"북마크", URL:"bookmarks"}];
  const navigate = useNavigate();
  const [tab, setTab] = useState<any>(selectTab ? selectTab : "");

  const onTabClick = (tab:any) => {
    setTab(tab);
    navigate(`/myfeed/${tab.URL}`);
  };

  return (
    <>
    {isMe ? (
      <Page headersProps={{isHome: false}}>
      <Tabs tabs={tabs} selectedTab={tab} onClick={(tab) => {onTabClick(tab)}}/>
      {children}
    </Page>
    ) : (
      <Page headersProps={{isHome: false}}>
        {children}
      </Page>
    )}
    </>
  )
};

export const SearchLayout:React.FC<{children: React.ReactNode, selectTab:any}> = ({children, selectTab}) => {
  const {region} = useParams<any>();
  const {search} = useLocation();
  const navigate = useNavigate();
  const keyword = decodeURI(search.split('=')[1]);
  const tabList = [{name: "일정", URL:`/search/${region}/plans${search}`, id:"post"}, {name:"장소", URL:`/search/${region}/places${search}`, id:"review"}]
  const [reg, setRegion] = useState<any>(koreaRegions[0]);
  const [tab, setTab] = useState<any>(tabList.filter((tab) => tab.name === selectTab)[0]);
  useEffect(() => {
    if(region !== "전체") {
      setRegion(koreaRegions.filter((region) => reg.name === region)[0]);
    }
  },[]);

  const onTabClick = (tab:any) => {
    setTab(tab);
    navigate(`${tab.URL}`);
  };

  const searchResult = region === "전체" ? `${keyword}에 대한 검색 결과입니다` : `${region} ${keyword} 대한 검색 결과입니다`;

  return (
    <Page headersProps={{ isHome: false }}>
      <SearchBar type="normal" value={keyword} region={region}/>
      <div style={{height:"6rem"}} />
      <Tabs type="roundButton" tabs={tabList} selectedTab={tab} onClick={(tab) => {onTabClick(tab)}}/>
      {/* {plan !== "전체" && (
      <S.RegionContainer>
        <Maps center={region.center} type="infor" />
        <S.RegionInforContainer>
          <S.RegionName>{regionInformation.region}</S.RegionName>
          <S.RegionInfor>{regionInformation.information}</S.RegionInfor>
        </S.RegionInforContainer>
      </S.RegionContainer>
      )} */}
        <S.SearchContainer>
          {searchResult}
      </S.SearchContainer>
        {children}
      </Page>
  )
}