// 🐸
import { createSelector } from 'reselect';
import omit from 'lodash/omit';

import { ADD_FROG, UPDATE_FROG, KILL_FROG, JUMP_TO_NEW_PAD } from '../actions';

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

      console.log('Jump', action.frogId)

      return {
        ...state,
        [action.frogId]: {
          ...frog,
          padId: action.padId,
          lastPadId: frog.padId,
        },
      };
    }

    case UPDATE_FROG: {
      const { type, id, ...updatedData } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          ...updatedData,
        },
      };
    }

    case KILL_FROG: {
      return omit(state, action.id);
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
