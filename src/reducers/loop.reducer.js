const initialState = 0;


export default function loopReducer(state = initialState, action) {
  switch (action.type) {
    case 'TICK': return state + 1;
    case 'RESET': return initialState;
    default: return state;
  }
}
