
import { useEffect, useState } from "react";
import * as S from './SearchPlan.styles';
import { useAsync } from "../../utils/API/useAsync";
import { SearchLayout } from "../Page";
import PlanCard from "../../components/PlanCard";
import DropdownMenu from "../../components/DropdownMenu";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import NullList from "../../components/NullList";
import { koreaRegions } from "../../utils/Data/mapData";
// import { tripThema } from "../../utils/Data/tripThema";
// import { IoIosSearch } from "react-icons/io";



const SearchPlan = () => {
  const {region} = useParams<any>();
  const {search} = useLocation();
  const navigate = useNavigate();
  const location = koreaRegions.find((item) => item.name === region)?.id;

  const [allPlanList, setAllPlanList] = useState<any>(null);
  const [planList, setPlanList] = useState<any[]>([]);
  const [sort, setSort] = useState<any>({ name: "최신순", id: "new" });
  // const [thema, setThema] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [state, fetchData] = useAsync({ url: `/api/posts/search?page=${page}&sort=${sort.id}&keyword=${search}&region=${location}`, method: 'GET' });

  // const onThemaBadgeClick = (select: any) => {
  //   const itemExists = thema.some((item) => item.id === select.id);
  //   if (itemExists) {
  //     setThema((prev) => prev.filter((item) => item.id !== select.id));
  //   } else {
  //     setThema((prev) => [...prev, select]);
  //   }
  // };



  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      // 스크롤이 가장 아래로 내려갔을 때의 처리
      if (allPlanList && allPlanList.pageable.last) return;
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
    fetchData(`/api/posts/search?page=${page}&sort=${sort.id}&keyword=${search}&region=${region}`);
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [sort]);

  useEffect(() => {
    if (state.error ) navigate("/404");
    if (state.data) {
      if (page === 0) setPlanList(state.data.content);
      else {
        setPlanList((prev: any) => [...prev, ...state.data.content]);
      }
      setAllPlanList(state.data);
    }
  }, [state]);

  if (allPlanList === null) return (<div>loading...</div>);
  return (
    <SearchLayout selectTab="일정" >
      <S.SearchResultContainer>
        <S.FilterContainer number={0}>
          {allPlanList.totalElements} 개의 검색결과
          <S.MenuContainer >
            {/* <DropdownMenu type="search" name="여행 테마 필터" items={tripThema} selectedItem={thema}  onClick={(item:any) => onThemaBadgeClick(item)}/> */}
            <DropdownMenu items={[{ name: "최신순", id: "new" }, { name: "오래된순", id: "old" }, { name: "인기순", id: "like" }]} onClick={(item: any) => setSort(item)} name="정렬 기준" selectedItem={sort} />
            {/* <S.FilterButton onClick={onFilterClick}>
            <IoIosSearch size="1.5rem" className="icon"/>
          </S.FilterButton> */}
          </S.MenuContainer>
        </S.FilterContainer>
        <S.PlanCardContainer>
          {planList.length !== 0 ? planList.map((plan: any, index: number) => (
            <PlanCard
              key={index}
              userId={plan.accountId}
              planId={plan.id}
              thumbnail={plan.thumnail ? plan.thumnail : ""}
              title={plan.postTitle}
              region={plan.plan.planLocation}
              placeCenter={plan.plan.content[0].placeList[0].keyword === null ? [plan.plan.content[0].placeList[0].x, plan.plan.content[0].placeList[0].y] : plan.plan.planLocation}
              startDate={plan.plan.planStartDate}
              endDate={plan.plan.planEndDate}
              likeCount={plan.likeCount === null ? 0 : plan.likeCount}
              commentCount={plan.commentCount ? plan.commentCount : 0}
              thema={plan.plan.planThema} />
          )) :
            <NullList content="검색 결과가 없습니다." />
          }
        </S.PlanCardContainer>
      </S.SearchResultContainer>
    </SearchLayout>
  )
}

export default SearchPlan;