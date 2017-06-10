import { combineReducers } from 'redux';

import {
  BEGIN_ANIMATION,
  END_ANIMATION,
  RESET_ANIMATION,
  TOGGLE_BODY_SQUASH,
} from '../actions';


const initialState = {
  status: 'idle',
  squashBody: false,
};


const status = (state = initialState.status, action) => {
  switch (action.type) {
    case BEGIN_ANIMATION:  return 'running';
    case END_ANIMATION:  return 'completed';
    case RESET_ANIMATION: return 'idle';

    default: return state;
  }
}

const squashBody = (state = initialState.squashBody, action) => {
  switch (action.type) {
    case TOGGLE_BODY_SQUASH: return !state;
    default: return state;
  }
}


export default combineReducers({
  status,
  squashBody
});
