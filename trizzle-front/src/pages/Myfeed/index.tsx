import { useState, useEffect } from "react";
import {MyfeedLayout} from "../Page";
import { useAsync } from "../../utils/API/useAsync";
import { useParams, useNavigate } from "react-router-dom";
import UserProfile from "../../shared/UserProfile";
import PlaceCard from "../../components/PlaceCard";
import PlanCard from "../../components/PlanCard";
import * as S from "./Myfeed.style";
import NullList from "../../components/NullList";
import { HiOutlinePencilAlt } from "react-icons/hi";



const Myfeed = () => {
  const {id} = useParams<{id:string}>();
  const [userData, setUserData] = useState<any>(null);
  const [plan, setPlan] = useState<any[]>([]);
  const [place, setPlace] = useState<any[]>([]);
  const [followee, setFollowee] = useState<any[]>([]);
  const [follower, setFollower] = useState<any[]>([]);
  const isMe = (id && id !== sessionStorage.getItem("accountId"))? false : true;
  const url = id ? `/api/user/feed/${id}` : "/api/user/feed/my";
  const [state, _] = useAsync({url: url});
  const [state2, fetchData] = useAsync({url: ""});//follow

  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    if(state.error) {
      if(id) navigate("/404");
      else {
        alert("로그인이 필요합니다");
        navigate("/");
      }
    }
    if (state.data) {
      setPlan(state.data.posts);
      setPlace(state.data.reviews);
      setUserData(state.data.profile);
      setIsFollow(state.data.isFollow);
      if(state.data.followees && state.data.followees!==null) setFollowee(state.data.followees);
      else setFollowee([]);
      if(state.data.followers && state.data.followers!==null) setFollower(state.data.followers);
      else setFollower([]);
    }
  },[state]);

  const onFollow = () => {
    const followee = {
      followeeId: id,
    }
    fetchData(`/api/follows`, "POST", followee);
  }


  useEffect(() => {
    if(state2.error) {
      alert("error");
    } else if(state2.data) {
      setIsFollow(state2.data.isFollow);
    }
  }, [state2]);

  if(userData === null) return (<div>로딩중</div>)
  else {
  return (
    <MyfeedLayout isMe={isMe}>
      <UserProfile nickName={userData.nickname} keyword={userData.thema} follower={follower} following={followee} isMe={isMe} onFollowClick={() => onFollow()}
      src={userData.profileImage} isFollow={isFollow}
      />
      <S.HorizontalContainer>
        <S.ListTitle>{!isMe? `${userData.nickname}님이 공유한 일정` : <>나의 여행 일정 목록
          <S.PostButton onClick={() => navigate("/post/plans/add")}>
            <HiOutlinePencilAlt className="icon"/>작성
          </S.PostButton>
        </>}</S.ListTitle>
        <S.PlusButton onClick={() => navigate(id?`/feed/${id}/posts`:"/myfeed/posts")}>더보기</S.PlusButton>
      </S.HorizontalContainer>
      <S.PlanListContainer>
        {plan.length === 0 ?(
          <NullList content="공유된 일정이 없습니다"/>
        ) :
        ((plan.map((item) => (
          <PlanCard 
          key={item.id} 
          region={item.plan.planLocation} 
          title={item.postTitle} 
          startDate={item.plan.planStartDate.slice(0,10)} 
          endDate={item.plan.planEndDate.slice(0,10)} 
          thumbnail={item.thumnail? item.thumnail : ""} 
          likeCount={item.likeCount? item.likeCount : 0} 
          commentCount={item.commentCount? item.commentCount : 0}
          placeCenter={item.plan.content[0].placeList[0].keyword === null ? [item.plan.content[0].placeList[0].x, item.plan.content[0].placeList[0].y] : item.plan.planLocation}
          planId={item.id} 
          thema={item.plan.planThema} 
          userId={item.accountId}/>
        ))) )
        }
      </S.PlanListContainer>
      <S.HorizontalContainer>
        <S.ListTitle>{!isMe? `${userData.nickname}님이 공유한 여행지`  : 
        <>
        나의 여행지
        <S.PostButton onClick={() => navigate("/post/places/add")}>
          <HiOutlinePencilAlt className="icon"/>작성
        </S.PostButton>
        </>}
        </S.ListTitle>
        <S.PlusButton onClick={() => navigate(id?`/feed/${id}/reviews`:"/myfeed/reviews")}>더보기</S.PlusButton>
      </S.HorizontalContainer>
      <S.PlaceListContainer>
        {place.length === 0 ?(
          <NullList content="공유된 여행지가 없습니다"/>
        ): (
          place.map((item, index) => (
            <PlaceCard key={index} placeName={item.place.placeName} userName={item.accountId} postDate={item.reviewRegistrationDate.slice(0,10)} postTitle={item.reviewTitle} postContent={item.reviewContentText ? item.reviewContentText : ""} src={item.thumbnail} postId={item.id}/>
          ))
        )}
        
      </S.PlaceListContainer>
    </MyfeedLayout>
  );
      }
};

export default Myfeed;