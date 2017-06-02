const initialState = {};


export default function frogsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FROG':
      return {
        ...state,
        [action.id]: {
          elem: action.elem,
          LilyPadId: null,
        },
      };

    case 'JUMP_TO_NEW_PAD':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          LilyPadId: action.LilyPadId,
        },
      };

    default: return state;
  }
}
