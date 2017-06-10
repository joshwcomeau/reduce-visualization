import { combineReducers } from 'redux';

import {
  BEGIN_ANIMATION,
  RESET_ANIMATION,
  END_ANIMATION,
  TOGGLE_BODY_SQUASH,
} from '../actions';


const initialState = {
  status: 'idle',
  squashBody: false,
};


const status = (state = initialState.status, action) => {
  switch (action.type) {
    case BEGIN_ANIMATION:
      return 'running';
    case RESET_ANIMATION:
      return initialState.status;
    case END_ANIMATION:
      return 'completed';

    default: return state;
  }
}

const squashBody = (state = initialState.squashBody, action) => {
  switch (action.type) {
    case TOGGLE_BODY_SQUASH:
      return !state;
    case RESET_ANIMATION:
      return initialState.squashBody;

    default: return state;
  }
}


export default combineReducers({
  status,
  squashBody
});
