const initialState = {};


export default function LilyPadReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LILLY_PAD':
      return {
        ...state,
        [action.id]: { elem: action.elem },
      };

    default: return state;
  }
}
