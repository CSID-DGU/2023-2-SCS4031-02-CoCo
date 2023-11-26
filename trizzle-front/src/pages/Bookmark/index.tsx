import { useEffect, useState } from "react";
import { MyfeedLayout } from "../Page";
import { useAsync } from "../../utils/API/useAsync";
import Tabs from "../../components/Tabs";
import NullList from "../../components/NullList";
import * as S from "./Bookmark.style";
import Paging from "../../components/Paging";


const Bookmark: React.FC = () => {
  const [tab, setTab] = useState<any>({name: "일정 북마크", id:"post"});
  const [planList, setPlanList] = useState<any>(null);
  const [placeList, setPlaceList] = useState<any>(null);
  const [state, _] = useAsync({url:`/api/posts/bookmarks`});
  const [state2, ] = useAsync({url:`/api/reviews/bookmarks`});

  const tabs = [
    {name: "일정 북마크", id:"post"},
    {name: "게시글 북마크", id:"review"}
  ]
  

  useEffect(() => {
    if(state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else {
      setPlanList(state.data);
    }

    if(state2.error) {
      console.error(state2.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else {
      setPlaceList(state2.data);
    }
  }, [state, state2]);
  if(planList === null || placeList === null) return null;
  return (
    <MyfeedLayout isMe={true} selectTab={{ name: "북마크", URL: "bookmark" }}>
      <Tabs tabs={tabs} selectedTab={tab} onClick={(tab) => {setTab(tab)}} type="roundButton"/>
      {tab.id === "post" ? (
        <S.PostContainer>
        {planList.length === 0 ? <NullList content="북마크한 일정이 없습니다." /> : 
          <Paging items={planList} perPage={9} type="horizontalPlan"/>
        }
        </S.PostContainer>
      ) : (
        <S.ReviewContainer>
        {placeList.length === 0 ? <NullList content="북마크한 리뷰가 없습니다" /> : (
          <Paging items={placeList} perPage={9} type="verticalReview"/>
      )}
    </S.ReviewContainer>
      )}
    </MyfeedLayout>
  )
};

export default Bookmark;
