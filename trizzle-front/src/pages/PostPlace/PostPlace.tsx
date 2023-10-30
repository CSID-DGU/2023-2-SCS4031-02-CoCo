import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp, AiOutlineHeart, AiTwotoneHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import UseAnimations from "react-useanimations";
import star from 'react-useanimations/lib/star';
import 'react-quill/dist/quill.snow.css';

import Page from "../Page";
import * as S from './PostPlace.styles';
import UserPreview from "../../components/UserPreview";
import SearchBar from "../../components/SearchBar";
import { useLocation } from "react-router-dom";

const currentDate: Date = new Date();

const SampleData = {
  user_id: 0,
  plan_title: 'dfsdgsh',
  review_title: '나도 놀고 싶어',
  review_registration_date: currentDate.toLocaleString(),
  visit_date: currentDate.toLocaleString(),
  place_name: '마굿간',
  review_content: ``,
  secret: true,
  reImg: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_42E5B8F3E27A193D9A4A71E8A5511DB3.jpg&type=l340_165',
  views: 125,
  bookmarks: 65,
  comments: 54,
};

const SampleComment = [
  {
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_42E5B8F3E27A193D9A4A71E8A5511DB3.jpg&type=l340_165',
    id: '날탱이탱날',
    content: '너무 좋아요'
  },
  {
    img: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_42E5B8F3E27A193D9A4A71E8A5511DB3.jpg&type=l340_165',
    id: '날탱이탱날',
    content: '너무 좋아요'
  },
]


export default function PostPlace() {
  let components;
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<string>(true);
  const [data, setData] = useState<any>('');
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  useEffect(() => {
    // local스토리지에서 postData 불러오기
    const postDataString = localStorage.getItem("postData");
    setData(JSON.parse(postDataString));
  }, []);

  if (isLogin) {
    if (location.pathname.startsWith("/post/places/secret/")) {
      components = (
        <S.ModifiedButton type="button">수정</S.ModifiedButton>
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
  }

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <SearchBar />
      {data.reImg != "" ? (
        <S.PageTitleContainer>
          <S.PageTitleImage src={data.reImg} alt="TilteImage" />
          <S.PageTitle>{data.place_name}</S.PageTitle>
        </S.PageTitleContainer>
      ) : (
        <S.PageTitleContainer2>
          <S.PageTitle>{data.place_name}</S.PageTitle>
        </S.PageTitleContainer2>
      )}

      <S.InforFirstContainer>
        <div>제목 {data.review_title}</div>
        {components}
      </S.InforFirstContainer>
      <S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            작성일자
          </S.InforContainer>
          <S.InforInputContainer>
            {data.review_registration_date}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            수정일자
          </S.InforContainer>
          <S.InforInputContainer>
            {data.visit_date}
          </S.InforInputContainer>
        </S.HorizontalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      {data.plan_title != '' && (
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            일정명
          </S.InforContainer>
          <S.InforInputContainer>
            {data.plan_title}
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
        dangerouslySetInnerHTML={{ __html: data.review_content }}
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
          SampleComment.map((value, index) => (
            <S.CommentTextContainer key={index}>
              <S.CommentImage />
              <S.CommentVerticalFirstStartContainer>
                <S.CommentIdText>
                  {value.id}
                </S.CommentIdText>
                <S.CommentContent>
                  {value.content}
                </S.CommentContent>
              </S.CommentVerticalFirstStartContainer>
            </S.CommentTextContainer>
          ))
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

function MyComponent({ htmlString }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}