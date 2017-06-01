const initialState = {
  initialValue: 0,
  values: [1, 2, 3, 4, 5],
};


export default function reducingDataReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_INITIAL_VALUE':
      return {
        ...state,
        initialValue: action.initialValue,
      };

    case 'UPDATE_VALUES':
      return {
        ...state,
        values: action.values,
      };

    default: return state;
  }
}
