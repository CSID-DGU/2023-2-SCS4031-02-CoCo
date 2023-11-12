import { useState } from "react";
import Comments, {MyComments} from "../../components/Comments";
import styled from "@emotion/styled";

const commentList = [
  {  id: "1",
    postId: "1",
    postName : "포스트1",
    content : "안녕하세요 감사해요 잘있어요 다시 만나요",
    registrationDate : "2021-09-01",
    isDeleted : false,},
  {  id: "2",
    postId: "2",
    postName : "포스트2",
    content : "안녕하세요 감사해요 잘있어요 다시 만나요",
    registrationDate : "2021-09-01",
    isDeleted : false,},
    {  id: "3",
    postId: "3",
    postName : "포스트3",
    content : "안녕하세요 감사해요 잘있어요 다시 만나요",
    registrationDate : "2021-09-01",
    isDeleted : false,},
    {  id: "4",
    postId: "5",
    postName : "포스트5",
    content : "안녕하세요 감사해요 잘있어요 다시 만나요",
    registrationDate : "2021-09-01",
    isDeleted : false,},
];

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CommentRecord = () => {
    const [commentLists, setCommentLists] = useState(commentList); // [CommentList
    return (
        <Container>
            {commentLists.map((commentList, idx) => (
                <MyComments myCommentData={commentList} onDelete={(id) => console.log(id)} key={idx}/>
            )
            )}
        </Container>
    );
};

export default CommentRecord;