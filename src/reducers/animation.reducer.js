import { combineReducers } from 'redux';

import {
  BEGIN_ANIMATION,
  RESET_ANIMATION,
  TOGGLE_REDUCE_VALUES_IN_BODY,
  TOGGLE_BODY_SQUASH,
} from '../actions';


const initialState = {
  isRunning: false,
  showAccAndItemInBody: false,
  squashBody: false,
};


const isRunning = (state = initialState.isRunning, action) => {
  switch (action.type) {
    case BEGIN_ANIMATION:  return true;
    case RESET_ANIMATION: return false;

    default: return state;
  }
}

const showAccAndItemInBody = (
  state = initialState.showAccAndItemInBody,
  action
) => {
  switch (action.type) {
    case TOGGLE_REDUCE_VALUES_IN_BODY: return !state;
    default: return state;
  }
}

const squashBody = (state = initialState.squashBody, action) => {
  switch (action.type) {
    case TOGGLE_BODY_SQUASH: return !state;
    default: return state;
  }
}


export default combineReducers({ isRunning, showAccAndItemInBody, squashBody });
