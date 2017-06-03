import { createSelector } from 'reselect'

import { ADD_FROG, JUMP_TO_NEW_PAD } from '../actions';

const initialState = {};


export default function frogsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FROG:
      return {
        ...state,
        [action.id]: {
          elem: action.elem,
          children: action.children,
          padId: action.padId,
          lastPadId: null,
        },
      };

    case JUMP_TO_NEW_PAD: {
      const frog = state[action.frogId];

      return {
        ...state,
        [action.frogId]: {
          ...frog,
          padId: action.padId,
          lastPadId: frog.padId,
        },
      };
    }

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
