export type PagingProps = {
  items: any[];
  perPage: number;
  type: string; // "number" (숫자로 페이징), "dot" (점으로 페이징)
};