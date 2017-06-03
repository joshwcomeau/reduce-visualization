import { combineReducers } from 'redux';

import { BEGIN_ANIMATION, RESET_ANIMATION, TICK } from '../actions';


const initialState = {
  isRunning: false,
  tick: 0,
};


const isRunning = (state = initialState.isRunning, action) => {
  switch (action.type) {
    case BEGIN_ANIMATION:  return true;
    case RESET_ANIMATION: return false;
    default: return state;
  }
}

const tick = (state = initialState.tick, action) => {
  switch (action.type) {
    case TICK: return state + 1;
    case RESET_ANIMATION: return initialState;
    default: return state;
  }
}

export default combineReducers({ isRunning, tick });
