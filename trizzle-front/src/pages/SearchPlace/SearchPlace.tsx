import React, { useEffect, useState } from "react";
import * as S from './SearchPlace.styles';
import {SearchLayout} from "../Page";
import PlaceCard from "../../components/PlaceCard";
import DropdownMenu from "../../components/DropdownMenu";
import { IoIosSearch } from "react-icons/io";
import img from '../../assets/images/default_festival.jpg'

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
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}, {
  src: '',
  postId: 215838,
  placeName: "과천과학관",
  userName: "날탱이탱날",
  postTitle: "과학의 날 행사",
  postDate: "2019-11-13",
  postContent: "시바시바견",
  likeCount: 12,
}]

const SearchPlace = () => {
  const [allReview, setAllReview] = useState(placeSample);
  const [review, setReview] = useState(placeSample);
  const [sort, setSort] = useState<any>({name:"최신순"});

  useEffect(() => {
    if (sort.name === "최신순") {
      setReview(allReview);
    } else if(sort.name === "오래된순") {
      setReview(allReview.slice().reverse());
    } else if(sort.name === "인기순") {
      setReview(allReview.sort((a, b) => b.likeCount - a.likeCount))
    }
  }, [sort])

  return (
    <SearchLayout selectTab="장소">
      <S.SearchResultContainer>
      <S.FilterContainer>
        {review.length} 개의 검색결과
        <S.MenuContainer >
          <DropdownMenu items={[{name: "최신순"}, {name: "오래된순"}, {name: "인기순"}]} onClick={(item:any) => setSort(item)} name="정렬 기준" selectedItem={sort}/>
        </S.MenuContainer>
      </S.FilterContainer>
        {review.map((place, index) => (
          <S.PlaceCardContainer key={index}>
            <PlaceCard src={place.src} postId={place.postId} userName={place.userName} placeName={place.placeName} postTitle={place.postTitle} postContent={place.postContent} postDate={place.postDate} />
          </S.PlaceCardContainer>
        ))}
      </S.SearchResultContainer>
    </SearchLayout>
  )
}

export default SearchPlace;