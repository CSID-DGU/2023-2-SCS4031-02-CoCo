export type CommentSectionProps = {
  page: string; //post, review
  postId: string;
  commentCount: number;
  setCommentCount: (count: number) => void;
};