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
            console.log(state.data);
        }
    }, [state]);
    return (
        <Container>
            {/* {commentLists.map((commentList, idx) => (
                <MyComments myCommentData={commentList} onDelete={(id) => console.log(id)} key={idx}/>
            )
            )} */}
        </Container>
    );
};

export default CommentRecord;