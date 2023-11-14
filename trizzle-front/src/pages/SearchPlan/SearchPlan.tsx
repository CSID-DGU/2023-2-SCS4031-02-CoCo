
import React, { useState } from "react";

import * as S from './SearchPlan.styles';
import Page from "../Page";
import Maps from "../../components/KakaoMap";
import img from '../../assets/images/default_festival.jpg'
import SearchBar from "../../components/SearchBar";
import PlanCard from "../../components/PlanCard";
import { koreaRegions } from "../../utils/Data/mapData";
import { useParams } from "react-router-dom";

const regionInformation = {
  region: "서울특별시",
  information: "서울특별시는 대한민국의 수도이자, 최대 도시로, 한반도 중앙에 자리하고 있습니다. 한강이 도시를 가로지르며 현대적인 도시scape와 전통적인 문화가 공존합니다. 세계적으로 유명한 관광 명소와 현대 아이콘들이 모여 있으며, 글로벌 경제와 문화의 중심지로 크게 발전해왔습니다. 서울은 다양한 역사적 유적지, 높은 건물들, 현대 예술과 음악, 풍부한 음식 문화 등을 통해 독특한 매력을 지니고 있습니다. 도시는 현대화와 전통을 조화롭게 이어가며 국내외에서 많은 사람들이 찾는 명실상부한 국제도시입니다."
}

const planContainer = [{
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: img,
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
}, {
  userId: 'ajtwoddl0425',
  planId: 1235105,
  thumbnail: '',
  title: '나만의 사랑',
  region: '서울특별시',
  startDate: '2023-10-10',
  endDate: '2023-10-13',
  likeCount: 12,
  commentCount: 21,
  thema: ["도심속여행"],
},]


const SearchPlan = () => {
  const {plan} = useParams<any>();
  const [region, setResgion] = useState<any>(koreaRegions.filter((region) => region.name === plan)[0]);
  const [planList, setPlanList] = useState<any>(planContainer);

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <SearchBar type="normal"/>
      <S.RegionContainer>
        <Maps center={region.center} type="infor" />
        <S.RegionInforContainer>
          <S.RegionName>{regionInformation.region}</S.RegionName>
          <S.RegionInfor>{regionInformation.information}</S.RegionInfor>
        </S.RegionInforContainer>
      </S.RegionContainer>

      <S.SearchContainer>
        <S.SearchText>
          {region.name}
        </S.SearchText>
        에 대한 일정 검색 결과입니다.
      </S.SearchContainer>

      <S.SearchResultContainer>
        <S.PlanCardContainer>
          {planList.map((plan:any, index:number) => (
            <PlanCard
              key={index}
              userId={plan.userId}
              planId={plan.planId}
              thumbnail={plan.thumbnail}
              title={plan.title}
              region={plan.region}
              startDate={plan.startDate}
              endDate={plan.endDate}
              likeCount={plan.likeCount}
              commentCount={plan.commentCount}
              thema={plan.thema} />
          ))}
        </S.PlanCardContainer>
      </S.SearchResultContainer>
    </Page>
  )
}

export default SearchPlan;