export type CommentsProps = {
  commentData : Comment;
  key: any;
  onDelete : (id : string) => void;
  onFix : (id : string) => void;
  onChildSubmit ?: (parentId:string,content : string, postId:string, reviewId:string) => void;
};

type Comment = {
  commentData : commentData;
  postAccountId : string;
  profileImg : any;
  accountId : string;
  isLike? : boolean | false;
  nickname : string;
  isMe : boolean; //본인 댓글이면 메뉴 뜸 (삭제)
  childComment?: any[];
}


export type myCommentProps = {
  myCommentData : commentData;
  key: any;
  onDelete : (id : string) => void;
};


type commentData = {
  id: string;
  accountId : string; // 댓글 작성자의 아이디
  nickname : string;
  parentId : any;
  commentContent : string;
  postId: string;
  reviewId : string;
  postName : string;
  commentRegistrationDate : string;
  registrationDate : string;
  fix : boolean;
  likeCount : number;
  isDeleted : boolean;
};


//댓글 고려사항
//1. 본인 포스트이면 다른 사람 댓글 고정 가능
//2. 본인 댓글이면 삭제 가능
//3. 본인 댓글이면 좋아요 누를 수 없음
//4. 답글 달기 가능 (답글 댓글은 고정 불가능)
