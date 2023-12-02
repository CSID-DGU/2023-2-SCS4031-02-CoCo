import React, { useEffect, useState } from "react";
import { LuCopyPlus } from "react-icons/lu";
import { IoArrowBackOutline } from "react-icons/io5";
import * as S from './PostPlan.styles';
import Page from "../Page";
import DayPlanPost from "../../shared/DayPlanPost/DayPlanPost";
import PlanMap from "../../shared/PlanMap";
import UserPreview from "../../components/UserPreview";
import { useAsync } from "../../utils/API/useAsync";
import { useParams, useNavigate } from "react-router-dom";
import { tripThema } from "../../utils/Data/tripThema";
import CommentSection from "../../shared/CommentSection";
import SearchBar from "../../components/SearchBar";
import IconButton from "../../components/IconButton";
import Menu from "../../components/Menu";
import { koreaRegions } from "../../utils/Data/mapData";
import UploadPlanModal from "../../shared/UploadPlanModal";

const PostPlan: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [regions, setRegions] = useState<string>('서울특별시');
  const [thema, setThema] = useState<any[]>([]);
  const [dayPlan, setDayPlan] = useState<any>(null);
  const [selectDay, setSelectDay] = useState<number>(0);
  const [selectedDayPlan, setSelectedDayPlan] = useState<any>(null);
  const [planUser, setPlanUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [isCopyPlan, setIsCopyPlan] = useState<boolean>(false);
  const [isCopyPlanModal, setIsCopyPlanModal] = useState<boolean>(false);
  const [placeCenter, setPlaceCenter] = useState<any>({ center: { lat: 0, lng: 0 } });

  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<any[]>([{
    content: "삭제", onClick: () => {
      alert("게시글을 삭제하시겠습니까?")
      fetchData(`/api/posts/myposts/${placeId.id}`, "DELETE");
    }, isDelete: true
  }]);

  const placeId = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, fetchData] = useAsync({ url: `/api/posts/${placeId.id}`, method: "GET" });

  useEffect(() => {
    if (state.error) {
      navigate("/404");
    } else if (state.data) {
      if (state.data.message && state.data.message === "delete success") navigate("/myfeed");
      else if (state.data.message && state.data.message === "save success") {
        const response = window.confirm("일정을 복사한 내 일정으로 이동하시겠습니까?");
        if (response) navigate(`/myfeed/plans`)
      }
      else setData(state.data);
    }
  }, [state]);

  useEffect(() => {
    if (data !== null) {
      setTitle(data.post.postTitle);
      setStartDate(data.post.plan.planStartDate);
      setEndDate(data.post.plan.planEndDate);
      setRegions(data.post.plan.planLocation);
      setThema(data.post.plan.planThema.map((value: string) => tripThema.filter((item: any) => item.name === value)));
      setDayPlan(data.post.plan.content);
      setSelectedDayPlan(data.post.plan.content);
      setIsLike(data.isLike);
      setIsBookmark(data.isBookmark);
      setPlanUser(data.postUser);
      setBookmarkCount(data.post.bookmarkCount);
      setLikeCount(data.post.likeCount);
      if (data.postUser.accountId === sessionStorage.getItem('accountId')) {
        setIsMe(true);
      }
      if (data.post.postSecret) {
        const NewArray = [...menuItems];
        NewArray.push({ content: "수정", onClick: () => { navigate(`/post/plans/modify/${placeId.id}`) }, isDelete: false });
        setMenuItems(NewArray);
      }
    }
  }, [data]);

  useEffect(() => {
    setIsCopyPlan(false);
    if (selectDay === 0) {
      setSelectedDayPlan(dayPlan);
    } else if (selectDay <= dayPlan.length) {
      const newArray = [dayPlan[selectDay - 1]];
      setSelectedDayPlan(newArray);
      console.log(newArray);
    }
  }, [selectDay]);

  useEffect(() => {
    if (selectedDayPlan !== null) {
      const rePlace = selectedDayPlan[0].placeList;
      if (rePlace.length !== 0 && rePlace[0].keyword === null) {
        const newCenter = { center: { lat: rePlace[0].y, lng: rePlace[0].x } };
        setPlaceCenter(newCenter);
      } else {
        const newCenter = { center: koreaRegions.filter((region) => { return region.name === regions })[0].center }
        setPlaceCenter(newCenter);
      }
    }
  }, [selectedDayPlan]);

  const copyPlanData = (plan: any) => {
    const newPlan = plan;
    const newPlanList = [...newPlan.content];
    let dayNumber = newPlanList.length + 1;
    selectedDayPlan.map((item: any) => {
      newPlanList.push({ day: dayNumber, placeList: item.placeList })
      dayNumber = dayNumber + 1;
      newPlan.content = newPlanList;
    });
    const json = JSON.stringify(newPlan);
    fetchData(`/api/plans/${newPlan.id}`, 'PUT', json);
  }

  const copyNewPlanData = () => {
    const newData = { ...data.post.plan };
    delete newData.id;
    delete newData.accountId;
    delete newData.planRegistrationDate;
    newData.planName = data.post.postTitle + "_복사본";
    const json = JSON.stringify(newData);
    fetchData(`/api/plans`, "POST", json);
  }

  const copyPlan = () => {
    const isLogin = sessionStorage.getItem('accountId');
    if (isLogin) {
      setIsCopyPlan(!isCopyPlan);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  }

  if (dayPlan !== null) {
    return (
      <Page headersProps={{ isHome: false }}>
        <SearchBar type="normal" />

        <S.InforFirstContainer>
          <div>{title}</div>
          {isMe ? (
            <>
              <Menu item={menuItems} />
            </>
          ) : (
            <IconButton
              icon="bookmark"
              type="post"
              contentId={data.post.id}
              filled={isBookmark}
              count={bookmarkCount}
              setCount={(count: number) => setBookmarkCount(count)}
            />
          )}
        </S.InforFirstContainer>
        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>작성일자</S.InforContainer>
            <S.InforInputContainer>
              {data.post.postRegistrationDate.slice(0, 10)}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>여행 기간</S.InforContainer>
            <S.InforInputContainer>
              {startDate} ~ {endDate}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>여행 테마</S.InforContainer>
            <S.Content>
              {thema.map((thema: any, index: number) => (
                <S.ThemaBadge key={index}>{thema[0].name}</S.ThemaBadge>
              ))}
            </S.Content>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>

        <S.HorizontalContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>조회</S.InforContainer>
            <S.InforInputContainer>{data.post.viewCount}</S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>좋아요</S.InforContainer>
            <S.InforInputContainer>{likeCount}</S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>북마크</S.InforContainer>
            <S.InforInputContainer>{bookmarkCount}</S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalContainer>

        <S.MapAndDayPlanContainer>
          {dayPlan && (
            <PlanMap
              selectDay={selectDay}
              setSelectDay={(day: number) => setSelectDay(day)}
              placeList={dayPlan}
              center={placeCenter.center}
              page="detail"
              width="50%"
            />
          )}
          <S.DayPlanPostContainer>
            {selectDay === 0 ? (isCopyPlan ?
              <S.CopyPlanContainer>
                <IoArrowBackOutline onClick={() => setIsCopyPlan(!isCopyPlan)} />
                <S.FlexEndContainer>
                  <S.CopyPlan onClick={copyNewPlanData} >
                    <S.CopyPlanText>새 일정으로 추가</S.CopyPlanText>
                  </S.CopyPlan>
                  <S.CopyPlan onClick={() => setIsCopyPlanModal(!isCopyPlanModal)} >
                    <S.CopyPlanText> 기존 일정에 복사</S.CopyPlanText>
                  </S.CopyPlan>
                </S.FlexEndContainer>
              </S.CopyPlanContainer>
              :
              <S.CopyPlan onClick={copyPlan} >
                <LuCopyPlus />
                <S.CopyPlanText>전체일정복사</S.CopyPlanText>
              </S.CopyPlan>
            ) : (isCopyPlan ?
              <S.CopyPlanContainer>
                <IoArrowBackOutline onClick={() => setIsCopyPlan(!isCopyPlan)} />
                <S.FlexEndContainer>
                  <S.CopyPlan onClick={copyNewPlanData} >
                    <S.CopyPlanText>새 일정 추가</S.CopyPlanText>
                  </S.CopyPlan>
                  <S.CopyPlan onClick={() => setIsCopyPlanModal(!isCopyPlanModal)} >
                    <S.CopyPlanText> 기존 일정에 복사</S.CopyPlanText>
                  </S.CopyPlan>
                </S.FlexEndContainer>
              </S.CopyPlanContainer>
              :
              <S.CopyPlan onClick={copyPlan} >
                <LuCopyPlus />
                <S.CopyPlanText>{selectDay}일차 일정복사</S.CopyPlanText>
              </S.CopyPlan>
            )}
            <S.DayPlanPostInnerContainer>
              <DayPlanPost
                type="post"
                dayList={selectedDayPlan}
                selectDay={selectDay}
              />
            </S.DayPlanPostInnerContainer>
          </S.DayPlanPostContainer>
        </S.MapAndDayPlanContainer >

        <UserPreview
          accountId={planUser.accountId}
          nickName={planUser.nickname}
          keyword={planUser.thema}
        />

        <S.CommentContainer>
          <S.HorizontalFirstStartContainer>
            <S.CommentText>
              댓글
              <S.CommentTextNumber></S.CommentTextNumber>
            </S.CommentText>
            <S.CommentText>
              좋아요
              <IconButton
                icon="like"
                type="post"
                filled={isLike}
                contentId={data.post.id}
                count={likeCount}
                setCount={(count: number) => setLikeCount(count)}
              />
            </S.CommentText>
          </S.HorizontalFirstStartContainer>
          <CommentSection page="post" postId={data.post.id} />
        </S.CommentContainer>
        {isCopyPlanModal && <UploadPlanModal title="추가할 일정" onclose={() => setIsCopyPlanModal(!isCopyPlanModal)} onClickedPlan={(plan: any[]) => copyPlanData(plan)} region={regions} />}
        {/* <S.RecommendContainer>
        <S.RecommendText>
          &#123;검색결과&#125;에 대한 다른 장소 추천 결과 입니다.
        </S.RecommendText>
      </S.RecommendContainer> */}
      </Page >
    );
  }
}

export default PostPlan;