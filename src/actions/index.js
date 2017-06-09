export const BEGIN_ANIMATION = 'BEGIN_ANIMATION';
export const RESET_ANIMATION = 'RESET_ANIMATION';
export const END_ANIMATION = 'END_ANIMATION';
export const ADD_FROG = 'ADD_FROG';
export const ADD_LILY_PAD = 'ADD_LILY_PAD';
export const JUMP_TO_NEW_PAD = 'JUMP_TO_NEW_PAD';
export const UPDATE_FROG = 'UPDATE_FROG';
export const KILL_FROG = 'KILL_FROG';
export const FOCUS_LINES = 'FOCUS_LINES';
export const RESET_LINE_FOCUS = 'RESET_LINE_FOCUS';
export const RUN_REDUCE_LOGIC = 'RUN_REDUCE_LOGIC';
export const TOGGLE_BODY_SQUASH = 'TOGGLE_BODY_SQUASH';

export const beginAnimation = () => ({
  type: BEGIN_ANIMATION,
});

export const resetAnimation = () => ({
  type: RESET_ANIMATION,
});

export const endAnimation = () => ({
  type: END_ANIMATION,
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

export const jumpToNewPad = ({ frogId, padId }) => ({
  type: JUMP_TO_NEW_PAD,
  frogId,
  padId,
});

export const updateFrog = ({ id, ...updatedData }) => ({
  type: UPDATE_FROG,
  id,
  ...updatedData,
});

export const killFrog = ({ id }) => ({
  type: KILL_FROG,
  id,
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

export const toggleBodySquash = () => ({
  type: TOGGLE_BODY_SQUASH,
})
