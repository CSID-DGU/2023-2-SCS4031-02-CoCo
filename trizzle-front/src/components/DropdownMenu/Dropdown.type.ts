export type DropdownMenuProps = {
  name: string;
  items: any[];
  onClick: (region:any) => void;
  styleProps?: React.CSSProperties;
};