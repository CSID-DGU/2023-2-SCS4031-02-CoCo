import { useEffect, useState } from "react";
import * as S from './SearchPlace.styles';
import {SearchLayout} from "../Page";
import PlaceCard from "../../components/PlaceCard";
import DropdownMenu from "../../components/DropdownMenu";
// import { IoIosSearch } from "react-icons/io";
// import img from '../../assets/images/default_festival.jpg'
import { useAsync } from "../../utils/API/useAsync";



const SearchPlace = () => {
  const [allReview, setAllReview] = useState<any>(null);
  const [review, setReview] = useState<any[]>([]);
  const [sort, setSort] = useState<any>({name:"최신순"});
  const [page, setPage] = useState<number>(0);
  const [state, fetchData] = useAsync({url:`/api/reviews/search?sort=${sort.id}`, method: 'GET'});

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      // 스크롤이 가장 아래로 내려갔을 때의 처리
      if(allReview && allReview.pageable.last) return;
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
     // 스크롤 이벤트를 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
       // 컴포넌트가 언마운트될 때 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData(`/api/reviews/search?page=${page}&sort=${sort.id}`);
  },[page]);

  useEffect(() => {
    setPage(0);
  }, [sort]);


  useEffect(() => {
    if (state.data) {
      if(page === 0) setReview(state.data.content);
      else{
        setReview((prev:any) => [...prev, ...state.data.content]);}
        setAllReview(state.data);
    }
  }, [state]);



  if(allReview === null) return (<div>loading...</div>);

  return (
    <SearchLayout selectTab="장소">
      <S.SearchResultContainer>
      <S.FilterContainer>
        {allReview.totalElements} 개의 검색결과
        <S.MenuContainer >
          <DropdownMenu items={[{name: "최신순"}, {name: "오래된순"}, {name: "인기순"}]} onClick={(item:any) => setSort(item)} name="정렬 기준" selectedItem={sort}/>
        </S.MenuContainer>
      </S.FilterContainer>
        {review.length !== 0 && review.map((item, index) => (
          <S.PlaceCardContainer key={index}>
            <PlaceCard key={index} placeName={item.place.placeName} userName={item.accountId} postDate={item.reviewRegistrationDate.slice(0,10)} postTitle={item.reviewTitle} postContent={item.reviewContent} src={item.thumbnail} postId={item.id}/>
          </S.PlaceCardContainer>
        ))}
      </S.SearchResultContainer>
    </SearchLayout>
  )
}

export default SearchPlace;