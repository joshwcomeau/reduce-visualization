export const getElementCenter = elem => {
  const bb = elem.getBoundingClientRect();

  return {
    x: bb.left + (bb.width / 2),
    y: bb.top + (bb.height / 2),
  };
}

export const requestAnimationFramePromise = () => new Promise(resolve => (
  window.requestAnimationFrame(resolve)
));

export const setTimeoutPromise = (duration) => new Promise(resolve => (
  window.setTimeout(resolve, duration)
));
