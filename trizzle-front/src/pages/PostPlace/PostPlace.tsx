import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import 'react-quill/dist/quill.snow.css';

import Page from "../Page";
import * as S from './PostPlace.styles';
import UserPreview from "../../components/UserPreview";
import SearchBar from "../../components/SearchBar";

const currentDate: Date = new Date();

const SampleData = {
  user_id: 0,
  plan_title: 'dfsdgsh',
  review_title: '나도 놀고 싶어',
  review_registration_date: currentDate.toLocaleString(),
  visit_date: currentDate.toLocaleString(),
  place_name: '마굿간',
  review_content: `<h1>안녕하세요. 박혜림입니다.</h1><h1 class="ql-align-center">안녕하세요. 박혜림입니다.</h1><h1 class="ql-align-right">안녕하세요. 박혜림입니다.</h1><p><br></p><p><strong><em>안녕하세요. 박혜림입니다.</em></strong></p><h1><s><u>안녕하세요. 박혜림입니다.</u></s></h1><h1><br></h1><h1><span style="color: rgb(230, 0, 0);">안녕하세요. 박혜림입니다.</span></h1><h1><span style="background-color: rgb(153, 51, 255);">안녕하세요. 박혜림입니다.</span><ol><li>안녕하세요. 박혜림입니다.</li><li>안녕하세요. 박혜림입니다.</li></ol><ul><li>안녕하세요. 박혜림입니다.</li><li>안녕하세요. 박혜림입니다.</li></ul><p><br></p><p><br></p><p><img src="data:image/png;base64,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"></p>`,
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
  const [data, setData] = useState<any>(SampleData);
  const [test, setTitle] = useState<string>('');
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);

  return (
    <Page headersProps={{ isHome: false, isLogin: true }}>
      <SearchBar />
      <S.PageTitleContainer>
        <S.PageTitleImage src={data.reImg} alt="TilteImage" />
        <S.PageTitle>{data.place_name}</S.PageTitle>
      </S.PageTitleContainer>
      <S.InforFirstContainer>
        제목 {data.review_title}
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
          북마크 수
        </S.InforContainer>
        <S.InforInputContainer>
          {data.bookmarks}
        </S.InforInputContainer>
        <S.HorizontalFirstStartContainer>
          <S.InforContainer>
            댓글수
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