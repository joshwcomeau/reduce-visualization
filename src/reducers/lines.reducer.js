import { FOCUS_LINES, RESET_LINE_FOCUS } from '../actions';

// NOTE: This is not a great solution.
// This list should be populated dynamically, on mount.
// Not worrying about it for now though.
const initialState = {
  "initial-value": true,
  "values": true,
  "reduce-open": true,
  "reduce-body": true,
  "reduce-close": true,
};


export default function linesReducer(state = initialState, action) {
  switch (action.type) {
    case FOCUS_LINES:
      return action.lineIds.reduce((newState, lineId) => ({
        ...newState,
        [lineId]: true,
      }), {});

    case RESET_LINE_FOCUS: return initialState;

    default: return state;
  }
}
