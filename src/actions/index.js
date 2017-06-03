export const BEGIN_ANIMATION = 'BEGIN_ANIMATION';
export const RESET_ANIMATION = 'RESET_ANIMATION';
export const ADD_FROG = 'ADD_FROG';
export const ADD_LILY_PAD = 'ADD_LILY_PAD';
export const JUMP_TO_NEW_PAD = 'JUMP_TO_NEW_PAD';

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

export const jumpToNewPad = ({ frogId, padId }) => ({
  type: JUMP_TO_NEW_PAD,
  frogId,
  padId,
});
