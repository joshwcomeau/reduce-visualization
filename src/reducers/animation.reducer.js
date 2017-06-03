import { combineReducers } from 'redux';

import { BEGIN_ANIMATION, RESET_ANIMATION } from '../actions';


const initialState = {
  isRunning: false,
};


const isRunning = (state = initialState.isRunning, action) => {
  switch (action.type) {
    case BEGIN_ANIMATION:  return true;
    case RESET_ANIMATION: return false;
    default: return state;
  }
}


export default combineReducers({ isRunning });
