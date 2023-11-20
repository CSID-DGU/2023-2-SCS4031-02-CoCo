export type CommentInputProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // profileImg: string;
  value: string;
  disabled: boolean;
  onSubmit: () => void;
};