import {atom} from 'recoil';

export const PlanState = atom({
  key: 'planState',
  default: [{
    day: 1,
    place_list: []
  },
{
  day: 2,
  place_list: []
},
{
  day: 3,
  place_list: []
}],
});