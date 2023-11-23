import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp, AiOutlineHeart, AiTwotoneHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
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

export default function PostPlace() {
  let components;
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const placeId = useParams<{ id: string }>();
  const [state, _] = useAsync({ url: `/api/reviews/${placeId.id}` });

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      setData(state.data);
    }
  }, [state]);

  useEffect(() => {
    console.log(data);
  }, [data]);

    if (location.pathname.startsWith("/post/places/secret/")) {
      components = (
        <S.ModifiedButton type="button" onClick={() => navigate(`/post/places/${placeId.id}/modify`)}>수정</S.ModifiedButton>
      );
    } else {
      components = (
        <S.BookmarkButton onClick={() => setIsBookmark(!isBookmark)}>
          {isBookmark ?
            <AiFillStar size={15} style={{ color: "#EBB700" }} />
            :
            <AiOutlineStar size={15} style={{ color: "#EBB700" }} />
          }
          <S.BookmarkButtonInnerText isBookmark={isBookmark}>장소 북마크</S.BookmarkButtonInnerText>
        </S.BookmarkButton>
      );
    }
  
  if (data !== "") {
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
              {data.reviewRegistrationDate}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              수정일자
            </S.InforContainer>
            <S.InforInputContainer>
              {data.visitDate}
            </S.InforInputContainer>
          </S.HorizontalFirstStartContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            장소명
          </S.InforContainer>
          <S.InforInputContainer>
            {data.reviewTitle}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        {data.planTitle != null && (
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              장소명
            </S.InforContainer>
            <S.InforInputContainer>
              {data.reviewTitle}
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
            {data.bookmarks}
          </S.InforInputContainer>
          <S.HorizontalFirstStartContainer>
            <S.InforContainer>
              북마크수
            </S.InforContainer>
            <S.InforInputContainer>
              {data.comments}
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
              {isLike ?
                <AiTwotoneHeart size={"1rem"} style={{ margin: "0 0 0 0.5rem", color: "#FF0000" }} onClick={() => setIsLike(!isLike)} />
                :
                <AiOutlineHeart size={"1rem"} style={{ margin: "0 0 0 0.5rem", color: "#FF0000" }} onClick={() => setIsLike(!isLike)} />
              }
            </S.CommentText>
          </S.HorizontalFirstStartContainer>
          {isCommentOpen && (
            <CommentSection page='review' postId={data.id} />
          )}
        </S.CommentContainer>

        <S.RecommendContainer>
          <S.RecommendText>
            검색결과에 대한 다른 장소 추천 결과 입니다.
          </S.RecommendText>
        </S.RecommendContainer>
      </Page>
    );
  }
}
