import React, {useEffect, useState} from "react";
import { CommentSectionProps } from "./CommentSection.type";
import * as S from "./CommentSection.style";
import CommentInput from "../../components/CommentInput";
import Paging from "../../components/Paging";
import { useAsync } from "../../utils/API/useAsync";

const CommentSection: React.FC<CommentSectionProps> = (props: CommentSectionProps) => {
  const [commentList, setCommentList] = useState<any[]>([]);
  const [commentPropList, setCommentPropList] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [state, fetchData] = useAsync({url:`/api/comments?${props.page}Id=${props.postId}`});
  const [ableSubmit, setAbleSubmit] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }
  const onSubmit = () => {
    let submitData;
    if(props.page === "post") {
      submitData = {
        postId: props.postId,
        commentContent: value
      };
    } else {
      submitData = {
        reviewId: props.postId,
        commentContent: value
      };
    }
    setValue("");
    fetchData("/api/comments", "POST", submitData);
  }

  const onChildSubmit = (id: string, val: string, postId: string, reviewId: string) => {
    const submitData = {
      commentContent: val,
      postId: postId,
      reviewId: reviewId,
      parentId: id
    };

    const json = JSON.stringify(submitData);
    fetchData("/api/comments", "POST", json);
  };

  const onDelete = (id: string) => {
    fetchData(`/api/${props.page}/${props.postId}/comments/${id}`, "DELETE");
  }

  const onFix = (id: string) => {
    fetchData(`/api/${props.page}/${props.postId}/comments/${id}`, "PATCH");
  }

  useEffect(() => {
    if(state.error) {
      alert("로그인이 필요합니다")
    }
    else {
      if(state.data) {
        let data;
        if(state.data.message === "success") {
          props.setCommentCount(props.commentCount + 1);
          data=state.data.comments;}
        else data = state.data;
        setCommentList(data);
      }
    }
  }, [state]);


  useEffect(() => {
    const updateLists = commentList.map((comment:any) => {
      return {
        commentData : comment,
        key: comment.id,
        onDelete : (id:string) => onDelete(id),
        onFix : (id : string) => onFix(id),
        onChildSubmit: (id: string, value: string, postId: string, reviewId: string) => onChildSubmit(id, value, postId, reviewId)
      }
    });

    setCommentPropList(updateLists);
  }, [commentList]);

  useEffect(() => {
    if(value !== "") setAbleSubmit(true);
    else setAbleSubmit(false);
  },[value]);

  return (
    <S.Container>
      <CommentInput
        placeholder="댓글 입력..."
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={!ableSubmit}
        />
        {commentPropList.length > 0 &&
        <Paging perPage={5} items={commentPropList} type="verticalComment"/>
      }
    </S.Container>
  )
};

export default CommentSection;