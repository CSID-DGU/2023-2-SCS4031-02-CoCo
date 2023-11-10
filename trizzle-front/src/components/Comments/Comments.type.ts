export type CommentsProps = {
  type : string; // post : 포스트 댓글, comment : 댓글의 댓글, mypage : 댓글내역
  commentData : commentData;
  isMe : boolean; //본인 댓글이면 메뉴 뜸 (삭제)
  isLiked : boolean;
  onLike ?: (commentId : string) => void;
  onDelete ?: (commentId : string) => void;
  onFix ?: (commentId : string) => void;
  onComment ?: (commentId : string) => void;
};

type commentData = {
  id: string;
  accountId ?: string;
  profileImg : string;
  nickname : string;
  parentId : string;
  content : string;
  postId: string;
  postName : string;
  registrationDate : string;
  commentId : string;
  fix : boolean;
  likeCount : number;
  isDeleted : boolean;
}

//댓글 고려사항
//1. 본인 포스트이면 다른 사람 댓글 고정 가능
//2. 본인 댓글이면 삭제 가능
//3. 본인 댓글이면 좋아요 누를 수 없음
//4. 답글 달기 가능 (답글 댓글은 고정 불가능)
