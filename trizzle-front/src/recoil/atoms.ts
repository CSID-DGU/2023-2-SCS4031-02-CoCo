import {atom} from 'recoil';

export const PlanState = atom({
  key: 'planState',
  default: [{
    day: 1,
    planList: []
  }],
});