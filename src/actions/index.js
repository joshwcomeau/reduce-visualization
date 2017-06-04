export const BEGIN_ANIMATION = 'BEGIN_ANIMATION';
export const RESET_ANIMATION = 'RESET_ANIMATION';
export const ADD_FROG = 'ADD_FROG';
export const ADD_LILY_PAD = 'ADD_LILY_PAD';
export const UPDATE_FROG_LOCATION = 'UPDATE_FROG_LOCATION';
export const JUMP_TO_NEW_PAD = 'JUMP_TO_NEW_PAD';
export const FOCUS_LINES = 'FOCUS_LINES';
export const RESET_LINE_FOCUS = 'RESET_LINE_FOCUS';
export const RUN_REDUCE_LOGIC = 'RUN_REDUCE_LOGIC';
export const TOGGLE_REDUCE_VALUES_IN_BODY = 'TOGGLE_REDUCE_VALUES_IN_BODY';
export const TOGGLE_BODY_SQUASH = 'TOGGLE_BODY_SQUASH';

export const beginAnimation = () => ({
  type: BEGIN_ANIMATION,
});

export const resetAnimation = () => ({
  type: RESET_ANIMATION,
});

export const addFrog = ({ id, children, padId, elem }) => ({
  type: ADD_FROG,
  id,
  children,
  padId,
  elem,
});

export const addLilyPad = ({ id, elem }) => ({
  type: ADD_LILY_PAD,
  id,
  elem,
});

export const updateFrogLocation = ({ id, top, left }) => ({
  type: UPDATE_FROG_LOCATION,
  id,
  top,
  left
});

export const jumpToNewPad = ({ frogId, padId }) => ({
  type: JUMP_TO_NEW_PAD,
  frogId,
  padId,
});

export const focusLines = ({ lineIds }) => ({
  type: FOCUS_LINES,
  lineIds,
});

export const resetLineFocus = () => ({
  type: RESET_LINE_FOCUS,
});

export const runReduceLogic = () => ({
  type: RUN_REDUCE_LOGIC,
});

export const toggleReduceValuesInBody = () => ({
  type: TOGGLE_REDUCE_VALUES_IN_BODY,
});

export const toggleBodySquash = () => ({
  type: TOGGLE_BODY_SQUASH,
})
