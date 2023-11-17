export type TabsProps = {
  type?: string;
  tabs: any[];
  selectedTab: any;
  onClick: (tab: string) => void;
};