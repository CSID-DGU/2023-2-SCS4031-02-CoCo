import { useState } from "react";
import { MyfeedLayout } from "../Page";
import PlanCard from "../../components/PlanCard";
import PlaceCard from "../../components/PlaceCard";
import { useAsync } from "../../utils/API/useAsync";
import Tabs from "../../components/Tabs";

const Bookmark: React.FC = () => {
  const [tab, setTab] = useState<any>({name: "일정 북마크", id:"post"});
  const [planList, setPlanList] = useState<any>([]);
  const [placeList, setPlaceList] = useState<any>([]);
  const [state, fetchData] = useAsync({url:`/api/posts/bookmarks`});

  const tabs = [
    {name: "일정 북마크", id:"post"},
    {name: "게시글 북마크", id:"review"}
  ]
  return (
    <MyfeedLayout isMe={true} selectTab={{ name: "북마크", URL: "bookmark" }}>
      <Tabs tabs={tabs} selectedTab={tab} onClick={(tab) => {setTab(tab)}}/>
        
    </MyfeedLayout>
  )
};