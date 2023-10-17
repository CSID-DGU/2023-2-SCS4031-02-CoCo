export type DropdownMenuProps = {
  type?: string;
  name: string;
  items: any[];
  onClick: (region:any) => void;
  styleProps?: React.CSSProperties;
  selectedItem?: any;
};