const initialState = {};


export default function lillyPadReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LILLY_PAD':
      return {
        ...state,
        [action.id]: { elem: action.elem },
      };

    default: return state;
  }
}
