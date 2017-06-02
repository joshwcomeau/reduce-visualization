export const beginAnimation = () => ({
  type: 'BEGIN_ANIMATION',
});

export const addFrog = ({ id, padId, elem }) => ({
  type: 'ADD_FROG',
  id,
  padId,
  elem,
});

export const addLilyPad = ({ id, elem }) => ({
  type: 'ADD_LILY_PAD',
  id,
  elem,
});
