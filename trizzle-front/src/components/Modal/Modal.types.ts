export type ModalProps = {
  styleProps: StyleProps;
  children?: React.ReactNode;
  title: string;
  onCloseClick: () => void;
}

export type StyleProps = {
  width: string;
  height: string;
};