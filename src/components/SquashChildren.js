// `SquashChildren` is a utility component that will "merge" its children
// on update. Specifically:
//  - When the number of children shrinks to 1, all items converge on this
//    first point.
//  - When the number of children changes from 1 to 2, the 1 child fades out
//    and the two children fade in.
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { OPACITY_DURATION } from '../constants';
import {
  getElementCenter,
  setTimeoutPromise,
  getNativeNode,
} from '../helpers';


class SquashChildren extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    children: this.props.children,
  }

  childrenRefs = []

  setStatePromise = newState => new Promise(resolve => (
    this.setState(newState, resolve)
  ))

  componentWillReceiveProps(nextProps) {
    const children = this.getTruthyChildArray(this.props.children);
    const nextChildren = this.getTruthyChildArray(nextProps.children);

    this.childrenChecks(nextChildren);

    // If the number of children hasn't changed, our job is simple;
    // transfer the new children to state so that they can be rendered
    // immediately.
    if (children.length === nextChildren.length) {
      this.setState({ children: nextChildren });
      return;
    }

    // If the number is shrinking, we need to do our neat squashing thing.
    const isShrinking = children.length > 1 && nextChildren.length === 1;

    if (isShrinking) {
      this.shrinkChildren()
        .then(() => {
          this.setState({ children: nextChildren });
        });
    }

    // If the number is growing, we simply want to fade the children out.
    // quickly, update them so all 3 are in the DOM, and then fade them in.
    const isGrowing = children.length === 1 && nextChildren.length > 1;
    if (isGrowing) {
      this.setState({ children: nextChildren });
      window.requestAnimationFrame(() => {
        console.log('CHILDREFS', this.childrenRefs);
      })
    }
  }

  childrenChecks(children) {
    // NOTE: A proper component would handle 0 to Infinity children.
    // However, this was built in a hurry, so I'm opting to only guarantee
    // success with transitioning between 1 and 2 children.
    if (children.length > 3) {
      console.error(
        'ERROR: Please provide no more than 3 children to SquashChildren.\n' +
        `You provided ${children.length} children.\n` +
        'Subsequent children will be ignored.'
      );
    }
    if (children.length === 0) {
      console.error(
        'ERROR: Please provide at least 1 child to SquashChildren.\n' +
        'SquashChildren can only handle transitions between 1 and 2 children.'
      );
    }
  }

  getTruthyChildArray(children) {
    return Children
      .toArray(children)
      .filter(child => !!child)
      .slice(0, 3);
  }

  shrinkChildren() {
    // We need to capture some info about each child:
    //   - Element bounding box
    //   - Element center point
    //   - Element itself
    const childrenCenters = this.childrenRefs.map(getElementCenter);

    const [firstCenter, secondCenter, thirdCenter] = childrenCenters;
    const [firstElem, secondElem, thirdElem] = this.childrenRefs;

    // Translate n+1 children onto the first's location.
    // TODO: Nicer solution that works for >3 children
    const secondChildOffset = {
      left: firstCenter.x - secondCenter.x,
      top: firstCenter.y - secondCenter.y,
    };
    secondElem.style.transform = (
      `translate(${secondChildOffset.left}px, ${secondChildOffset.top}px)`
    );

    const thirdChildOffset = {
      left: firstCenter.x - thirdCenter.x,
      top: firstCenter.y - thirdCenter.y,
    };
    thirdElem.style.transform = (
      `translate(${thirdChildOffset.left}px, ${thirdChildOffset.top}px)`
    );

    // Once the transition is completed, we want to update the children
    // in state. The callee will do this, we just need to indicate when the
    // animation ends. We COULD use ontransitionend hooks, but those have been
    // buggy and problematic for me, so I'm just going to use a setTimeout.
    return setTimeoutPromise(OPACITY_DURATION);
  }

  render() {
    const delegated = omit(this.props, Object.keys(SquashChildren.propTypes));

    const children = this.getTruthyChildArray(this.state.children);

    console.log('Render squashChildren', children.length, children)

    return (
      <span {...delegated}>
        {children.map((child, index) => (
          React.cloneElement(child, {
            key: child.id,
            ref: (elem) => {
              this.childrenRefs[index] = getNativeNode(elem);
            },
            style: {
              transition: `${OPACITY_DURATION}ms`,
              ...(child.props.style || {})
            },
          })
        ))}
      </span>
    );
  }
}

export default SquashChildren;
