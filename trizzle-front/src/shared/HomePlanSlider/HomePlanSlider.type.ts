export type HomePlanSliderProps = {
  planList: planListProps[];
}

type planListProps = {
  id: string;
  title: string;
  image: string;
  tags: string[];
}