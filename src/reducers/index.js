import { combineReducers } from 'redux';

import frogs from './frogs.reducer';
import lilyPads from './lily-pads.reducer';
import animation from './animation.reducer';
import reducingData from './reducing-data.reducer';


export default combineReducers({
  frogs,
  lilyPads,
  animation,
  reducingData,
});
