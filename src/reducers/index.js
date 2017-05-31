import { combineReducers } from 'redux';

import frog from './frog.reducer';
import lillyPad from './lilly-pad.reducer';
import loop from './loop.reducer';


export default combineReducers({
  frog,
  lillyPad,
  loop,
});
