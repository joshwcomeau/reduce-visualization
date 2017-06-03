export const getElementCenter = elem => {
  const bb = elem.getBoundingClientRect();

  return {
    x: bb.left + (bb.width / 2),
    y: bb.top + (bb.height / 2),
  };
}
