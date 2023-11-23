import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp} from "react-icons/ai";
// import UseAnimations from "react-useanimations";
// import star from 'react-useanimations/lib/star';
import 'react-quill/dist/quill.snow.css';

import Page from "../Page";
import * as S from './PostPlace.styles';
import UserPreview from "../../components/UserPreview";
import SearchBar from "../../components/SearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAsync } from "../../utils/API/useAsync";
import CommentSection from "../../shared/CommentSection";
import IconButton from "../../components/IconButton";

export default function PostPlace() {
  let components;
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const placeId = useParams<{ id: string }>();
  const [state, _] = useAsync({ url: `/api/reviews/${placeId.id}` });

  useEffect(() => {
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      console.log(state.data);
      setData(state.data.review);
      setIsLike(state.data.isLike);
      setIsBookmark(state.data.isBookmark);
    }
  }, [state]);

    if(data !== null) {
      if (location.pathname.startsWith("/post/places/secret/")) {
        components = (
          <S.ModifiedButton type="button" onClick={() => navigate(`/post/places/${placeId.id}/modify`)}>수정</S.ModifiedButton>
        );
      } else {
        components = (
          <IconButton icon="bookmark" type="review" contentId={data.id} filled={isBookmark} />
        );
      }
  }
  
  if (data !== null) {
    return (
      <Page headersProps={{ isHome: false}}>
        <SearchBar type="normal"/>

        <S.InforFirstContainer>
          <div>제목 {data.reviewTitle}</div>
          {components}
        </S.InforFirstContainer>
        <S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              작성일자
            </S.InforContainer>
            <S.InforInputContainer>
              {data.reviewRegistrationDate.slice(0,10)}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer style={{margin:"0 0 0 5rem"}}>
            <S.InforContainer>
              방문일자
            </S.InforContainer>
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
              조회수
            </S.InforContainer>
            <S.InforInputContainer>
              {data.views}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.InforContainer>
            추천수
          </S.InforContainer>
          <S.InforInputContainer>
            {data.likeCount}
          </S.InforInputContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              북마크수
            </S.InforContainer>
            <S.InforInputContainer>
              {data.bookmarkCount}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>

        {/* <div dangerouslySetInnerHTML={{ __html: data.review_content }} /> */}
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: data.reviewContent }}
        />

        <UserPreview nickName="날탱이탱날" keyword={["배낭", "자전거"]} />

        <S.CommentContainer>
          <S.HorizontalFirstStartContainer>
            <S.CommentText>
              댓글
              <S.CommentTextNumber>
                {data.comments}
              </S.CommentTextNumber>
              {isCommentOpen ?
                <AiOutlineUp size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
                :
                <AiOutlineDown size={"1rem"} onClick={() => setIsCommentOpen(!isCommentOpen)} />
              }
            </S.CommentText>
            <S.CommentText>
              좋아요
              <IconButton icon="like" type="review" contentId={data.id} filled={isLike} />
            </S.CommentText>
          </S.HorizontalFirstStartContainer>
          {isCommentOpen && (
            <CommentSection page='review' postId={data.id} />
          )}
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
