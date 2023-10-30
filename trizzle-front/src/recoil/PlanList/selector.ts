import { selector } from "recoil";
import { PlanState } from "./atoms";

export const PlanListState = selector({
  key: "planListState",
  get: ({ get }) => {
    const planList = get(PlanState);
    return planList;
  },
  set: ({ set }, newValue) => {
    set(PlanState, newValue);
  },
});