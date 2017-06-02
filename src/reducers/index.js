import { combineReducers } from 'redux';

import frogs from './frogs.reducer';
import LilyPads from './lily-pads.reducer';
import animation from './animation.reducer';
import reducingData from './reducing-data.reducer';


export default combineReducers({
  frogs,
  LilyPads,
  animation,
  reducingData,
});
