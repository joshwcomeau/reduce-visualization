import { RUN_REDUCE_LOGIC } from '../actions';

const values = [3, 5, 1, 4, 2]

const initialState = {
  initialValue: 0,
  values,
  acc: 0,
  item: values[0],
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


    default: return state;
  }
}
