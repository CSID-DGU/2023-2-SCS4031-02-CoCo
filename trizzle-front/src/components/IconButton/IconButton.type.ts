
export interface IconButtonProps {
  icon: string; //bookmark, like
  type: string; //comment, post, review
  filled: boolean;
  contentId: string;
  count: number;
  setCount: (count:number) => void;
}