import {atom} from 'recoil';

export const PlanState = atom({
  key: 'planState',
  default: [{
    day: 1,
    placeList: []
  },
{
  day: 2,
  placeList: []
},
{
  day: 3,
  placeList: []
}],
});