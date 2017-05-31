const initialState = {};


export default function frogReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FROG':
      return {
        ...state,
        [action.id]: {
          elem: action.elem,
          lillyPadId: null,
        },
      };

    case 'JUMP_TO_NEW_PAD':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          lillyPadId: action.lillyPadId,
        },
      };

    default: return state;
  }
}
