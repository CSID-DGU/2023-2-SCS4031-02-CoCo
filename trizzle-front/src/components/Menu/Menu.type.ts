export type MenuProps = {
  item: ItemProps[];
  onClick?: () => void;
}

type ItemProps = {
  content : string;
  isDelete: boolean;
  onClick: () => void;
}