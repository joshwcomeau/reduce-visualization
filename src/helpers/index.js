import { findDOMNode } from 'react-dom';

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

export const getNativeNode = (element) => {
  // If element is falsy, it's likely an SFC, which isn't supported
  if (!element) {
    return null;
  }

  // When running in a windowless environment, abort!
  if (typeof HTMLElement === 'undefined') {
    return null;
  }

  // `element` may already be a native node.
  if (element instanceof HTMLElement) {
    return element;
  }

  // While ReactDOM's `findDOMNode` is discouraged, it's the only
  // publicly-exposed way to find the underlying DOM node for
  // composite components.
  const foundNode = findDOMNode(element);

  if (!(foundNode instanceof HTMLElement)) {
    // Text nodes are not supported
    return null;
  }

  return foundNode;
};
