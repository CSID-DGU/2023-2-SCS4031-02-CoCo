
import React, { useEffect, useState } from "react";
import * as S from './SearchPlan.styles';
import {SearchLayout} from "../Page";
import img from '../../assets/images/default_festival.jpg'
import PlanCard from "../../components/PlanCard";
import DropdownMenu from "../../components/DropdownMenu";
import { tripThema } from "../../utils/Data/tripThema";
import { IoIosSearch } from "react-icons/io";

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
  const [allPlanList, setAllPlanList] = useState<any>(planContainer);
  const [planList, setPlanList] = useState<any>(planContainer);
  const [sort, setSort] = useState<any>({name:"최신순"});
  const [thema, setThema] = useState<any[]>([]);

  const onThemaBadgeClick = (select: any) => {
    const itemExists = thema.some((item) => item.id === select.id);
    if (itemExists) {
      setThema((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      setThema((prev) => [...prev, select]);
    }
  };

  const onFilterClick = () => {
    if (thema.length === 0) {
      if (sort.name === "최신순") {
        setPlanList(allPlanList);
      } else if (sort.name === "오래된순") {
        setPlanList(allPlanList.reverse());
      } else if (sort.name === "인기순") {
        setPlanList(allPlanList.sort((a:any, b:any) => b.likeCount - a.likeCount));
      }
    } else {
      if (sort.name === "최신순") {
        setPlanList(allPlanList.filter((plan:any) => thema.some((item) => plan.thema.includes(item.name))));
      } else if (sort.name === "오래된순") {
        setPlanList(allPlanList.filter((plan:any) => thema.some((item) => plan.thema.includes(item.name))).reverse());
      } else if (sort.name === "인기순") {
        setPlanList(allPlanList.filter((plan:any) => thema.some((item) => plan.thema.includes(item.name))).sort((a:any, b:any) => b.likeCount - a.likeCount));
      }
    }
  }

  return (
    <SearchLayout selectTab="일정" >
      <S.SearchResultContainer>
      <S.FilterContainer number={thema.length}>
        {planList.length} 개의 검색결과
        <S.MenuContainer >
          <DropdownMenu type="search" name="여행 테마 필터" items={tripThema} selectedItem={thema}  onClick={(item:any) => onThemaBadgeClick(item)}/>
          <DropdownMenu items={[{name: "최신순"}, {name: "오래된순"}, {name: "인기순"}]} onClick={(item:any) => setSort(item)} name="정렬 기준" selectedItem={sort}/>
          <S.FilterButton onClick={onFilterClick}>
            <IoIosSearch size="1.5rem" className="icon"/>
          </S.FilterButton>
        </S.MenuContainer>
      </S.FilterContainer>
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
    </SearchLayout>
  )
}

export default SearchPlan;