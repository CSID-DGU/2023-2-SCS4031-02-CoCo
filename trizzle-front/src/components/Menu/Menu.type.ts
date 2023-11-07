export type MenuProps = {
  item: ItemProps[];
}

type ItemProps = {
  content : string;
  isDelete: boolean;
  onClick: () => void;
}