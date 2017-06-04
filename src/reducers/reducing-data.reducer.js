import { RUN_REDUCE_LOGIC, TOGGLE_REDUCE_VALUES_IN_BODY } from '../actions';

const initialState = {
  initialValue: 0,
  values: [1, 2, 3, 4, 5],
  acc: 0,
  item: 1,
  currentIndex: 0,
  showAccAndItemInBody: false,
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

    case TOGGLE_REDUCE_VALUES_IN_BODY:
      return {
        ...state,
        showAccAndItemInBody: !state.showAccAndItemInBody,
      };

    default: return state;
  }
}
