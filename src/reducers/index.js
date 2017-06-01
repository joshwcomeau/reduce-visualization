import { combineReducers } from 'redux';

import frog from './frog.reducer';
import lillyPad from './lilly-pad.reducer';
import loop from './loop.reducer';
import reducingData from './reducing-data.reducer';


export default combineReducers({
  frog,
  lillyPad,
  loop,
  reducingData,
});
