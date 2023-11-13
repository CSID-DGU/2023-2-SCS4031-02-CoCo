import React, { useState } from "react";

import * as S from './SearchPlace.styles';
import Page from "../Page";
import Maps from "../../components/KakaoMap";
import PlaceCard from "../../components/PlaceCard";
import img from 'C:/Users/ajtwo/OneDrive/바탕 화면/image19.png'
import SearchBar from "../../components/SearchBar";

const regionInformation = {
  region: "서울특별시",
  information: "서울특별시는 대한민국의 수도이자, 최대 도시로, 한반도 중앙에 자리하고 있습니다. 한강이 도시를 가로지르며 현대적인 도시scape와 전통적인 문화가 공존합니다. 세계적으로 유명한 관광 명소와 현대 아이콘들이 모여 있으며, 글로벌 경제와 문화의 중심지로 크게 발전해왔습니다. 서울은 다양한 역사적 유적지, 높은 건물들, 현대 예술과 음악, 풍부한 음식 문화 등을 통해 독특한 매력을 지니고 있습니다. 도시는 현대화와 전통을 조화롭게 이어가며 국내외에서 많은 사람들이 찾는 명실상부한 국제도시입니다."
}

const placeSample = [{
  src: img,
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
}]

const SearchPlace = () => {
  const [region, useResgion] = useState<any>({ lat: 37.5665, lng: 126.9780 })

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <SearchBar />
      <S.RegionContainer>
        <Maps center={region} type="infor" />
        <S.RegionInforContainer>
          <S.RegionName>{regionInformation.region}</S.RegionName>
          <S.RegionInfor>{regionInformation.information}</S.RegionInfor>
        </S.RegionInforContainer>
      </S.RegionContainer>

      <S.SearchContainer>
        <S.SearchText>
          &#123; 검색결과 &#125;
        </S.SearchText>
        에 대한 다른 장소 추천 결과 입니다.
      </S.SearchContainer>

      <S.SearchResultContainer>
        {placeSample.map((place, index) => (
          <S.PlaceCardContainer key={index}>
            <PlaceCard src={place.src} postId={place.postId} userName={place.userName} placeName={place.placeName} postTitle={place.postTitle} postContent={place.postContent} postDate={place.postDate} />
          </S.PlaceCardContainer>
        ))}
      </S.SearchResultContainer>
    </Page>
  )
}

export default SearchPlace;