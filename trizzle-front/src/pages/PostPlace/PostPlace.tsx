import { useEffect, useState } from "react";
// import UseAnimations from "react-useanimations";
// import star from 'react-useanimations/lib/star';
import 'react-quill/dist/quill.snow.css';

import Page from "../Page";
import * as S from './PostPlace.styles';
import UserPreview from "../../components/UserPreview";
import Menu from "../../components/Menu";
import SearchBar from "../../components/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import CommentSection from "../../shared/CommentSection";
import IconButton from "../../components/IconButton";

export default function PostPlace() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [reviewUser, setReviewUser] = useState<any>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<any[]>([{
    content: "삭제", onClick: () => {
      alert("게시글을 삭제하시겠습니까?")
      fetchData(`/api/reviews/myreviews/${placeId.id}`, "DELETE");
    }, isDelete: true
  }]);

  const placeId = useParams<{ id: string }>();
  const [state, fetchData] = useAsync({ url: `/api/reviews/${placeId.id}` });

  useEffect(() => {
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      if (state.data.message && state.data.message === "delete success") {
        alert("삭제되었습니다");
        navigate("/myfeed");
      } else {
        // console.log(state.data.review.reviewSecret);
        setData(state.data.review);
        setIsLike(state.data.isLike);
        setIsBookmark(state.data.isBookmark);
        setReviewUser(state.data.reviewUser);
        if (state.data.reviewUser.accountId === sessionStorage.getItem("accountId")) {
          setIsMe(true);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (data !== null) {
      if (data.reviewSecret) {
        const NewArray = [...menuItems];
        NewArray.push({ content: "수정", onClick: () => { navigate(`/post/places/${placeId.id}/modify`) }, isDelete: false });
        setMenuItems(NewArray);
      }
    }
  }, [data]);

  if (data !== null) {
    return (
      <Page headersProps={{ isHome: false }}>
        <SearchBar type="normal" />

        <S.InforFirstContainer>
          <div>{data.reviewTitle}</div>
          {isMe ?
          <>
          <Menu item={menuItems}/>
        </>:
        <IconButton icon="bookmark" type="review" contentId={data.id} filled={isBookmark} />
      }
        </S.InforFirstContainer>
        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>작성일자</S.InforContainer>
            <S.InforInputContainer>
              {data.reviewRegistrationDate.slice(0, 10)}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer style={{ margin: "0 0 0 5rem" }}>
            <S.InforContainer>방문일자</S.InforContainer>
            <S.InforInputContainer >
              {data.visitDate}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            장소명
          </S.InforContainer>
          <S.InforInputContainer>
            {data.place.placeName}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        {data.postName != null && (
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              장소명
            </S.InforContainer>
            <S.InforInputContainer>
              {data.postName}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        )}

        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              조회
            </S.InforContainer>
            <S.InforInputContainer>
              {data.views}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.InforContainer>
            좋아요
          </S.InforContainer>
          <S.InforInputContainer>
            {data.likeCount}
          </S.InforInputContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              북마크
            </S.InforContainer>
            <S.InforInputContainer>
              {data.bookmarkCount}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalLine />
        {/* <div dangerouslySetInnerHTML={{ __html: data.review_content }} /> */}
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: data.reviewContent }}
        />

        <UserPreview accountId={reviewUser.accountId} nickName={reviewUser.nickname} keyword={reviewUser.thema} />

        <S.CommentContainer>
          <S.HorizontalFirstStartContainer>
            <S.CommentText>
              댓글
              <S.CommentTextNumber>{data.comments}</S.CommentTextNumber>
            </S.CommentText>
            <S.CommentText>
              좋아요
              <IconButton icon="like" type="review" contentId={data.id} filled={isLike} />
            </S.CommentText>
          </S.HorizontalFirstStartContainer>
          <CommentSection page='review' postId={data.id} />

        </S.CommentContainer>

        {/* <S.RecommendContainer>
          <S.RecommendText>
            검색결과에 대한 다른 장소 추천 결과 입니다.
          </S.RecommendText>
        </S.RecommendContainer> */}
      </Page>
    );
  }
}
