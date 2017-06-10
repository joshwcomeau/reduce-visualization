import { RUN_REDUCE_LOGIC, RESET_ANIMATION } from '../actions';

const initialState = {
  initialValue: 0,
  values: [1, 2, 3, 4, 5],
  acc: 0,
  item: 1,
  currentIndex: 0,
};


export default function reducingDataReducer(state = initialState, action) {
  switch (action.type) {
    case RUN_REDUCE_LOGIC:
      return {
        ...state,
        acc: state.values[state.currentIndex] + state.acc,
        item: state.values[state.currentIndex],
        currentIndex: state.currentIndex + 1,
      };

    case RESET_ANIMATION:
      return initialState;

    default: return state;
  }
}
