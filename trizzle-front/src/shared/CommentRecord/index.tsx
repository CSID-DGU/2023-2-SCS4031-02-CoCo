import { useEffect, useState } from "react";
import {MyComments} from "../../components/Comments";
import styled from "@emotion/styled";
import { useAsync } from "../../utils/API/useAsync";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CommentRecord = () => {
    const [commentLists, setCommentLists] = useState<any[]>([]); // [CommentList
    const [state, fetchData] = useAsync({url: "/api/comments"});

    useEffect(() => {
        if (state.data) {
            setCommentLists(state.data);
        }
    }, [state]);
    const onDelete = (id: string) => {
      if(confirm("삭제하시겠습니까?")) {
        fetchData(`/api/mypage/my/comments/${id}`, "DELETE");
      }
    };

    return (
        <Container>
            {commentLists.length !== 0 && commentLists.map((commentList, idx) => (
                <MyComments myCommentData={commentList} onDelete={(id) => onDelete(id)} key={idx}/>
            )
            )}
        </Container>
    );
};

export default CommentRecord;