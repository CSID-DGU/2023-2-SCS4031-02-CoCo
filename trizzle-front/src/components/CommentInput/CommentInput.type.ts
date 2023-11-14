export type CommentInputProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // profileImg: string;
  value: string;
  id: string;
  name: string;
  disabled: boolean;
  onSubmit: () => void;
};