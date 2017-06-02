import { createSelector } from 'reselect'

const initialState = {};


export default function frogsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FROG':
      return {
        ...state,
        [action.id]: {
          elem: action.elem,
          padId: action.padId,
        },
      };

    case 'JUMP_TO_NEW_PAD':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          padId: action.padId,
        },
      };

    default: return state;
  }
}

const frogsSelector = state => state.frogs;

export const frogsListSelector = createSelector(frogsSelector, frogs => (
  Object.keys(frogs).map(id => ({
    id,
    ...frogs[id],
  }))
));
