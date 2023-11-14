export type TextInputProps = {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  id?: string;
  styleProps: styleProps;
};

type styleProps = {
  width: string;
  
}