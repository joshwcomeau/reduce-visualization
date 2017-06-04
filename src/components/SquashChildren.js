// `SquashChildren` is a utility component that will "merge" its children
// on update. Specifically:
//  - When the number of children changes from 2 to 1, it translates them
//    both to a midpoint between them, and fades into the 1 new child.
//  - When the number of children changes from 1 to 2, the 1 child fades out
//    and the two children fade in.
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { OPACITY_DURATION } from '../constants';
import {
  getElementCenter,
  requestAnimationFramePromise,
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

  getTruthyChildArray(children) {
    return Children
      .toArray(children)
      .filter(child => !!child)
      .slice(0, 3);
  }

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





    // // This is a pretty gross sequence of events, but this is a surprisingly
    // // tricky problem!
    // //
    // // We can't simply render the props, because then the text will change
    // // RIGHT AWAY, before it even starts fading away. So instead we render
    // // the state.children, and only do that swap when it's invisible.
    // // This sequence of events is required to ensure that the swap happens at
    // // the right time, and the animation works.
    // requestAnimationFramePromise()
    //   .then(() => { this.childElem.style.opacity = 0; })
    //   .then(() => setTimeoutPromise(OPACITY_DURATION))
    //   .then(() => this.setStatePromise({ children: this.props.children }))
    //   .then(() => { this.childElem.style.opacity = 1; })
    //   .catch(() => {
    //     // Swallow errors. The most likely error here is that the component
    //     // unmounted during the delay between fades. This isn't a big deal.
    //     //
    //     // At any rate, this is just a presentational thing with no network
    //     // side effects, so it's safe to ignore whatever it wants to complain
    //     // about.
    //   });
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

  shrinkChildren() {
    // We need to capture some info about each child:
    //   - Element bounding box
    //   - Element center point
    //   - Element itself
    const childrenCenters = this.childrenRefs.map(getElementCenter);

    const [firstCenter, secondCenter, thirdCenter] = childrenCenters;
    const [firstElem, secondElem, thirdElem] = this.childrenRefs;

    // Translate extremity children to the converge point.
    const firstChildOffset = {
      left: secondCenter.x - firstCenter.x,
      top: secondCenter.y - firstCenter.y,
    };
    firstElem.style.transform = (
      `translate(${firstChildOffset.left}px, ${firstChildOffset.top}px)`
    );

    const thirdChildOffset = {
      left: secondCenter.x - thirdCenter.x,
      top: secondCenter.y - thirdCenter.y,
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
    const children = this.getTruthyChildArray(this.state.children);

    return (
      <span>
        {children.map((child, index) => (
          React.cloneElement(child, {
            key: child.id,
            ref: (elem) => {
              this.childrenRefs[index] = getNativeNode(elem);
            },
            style: { transition: `transform ${OPACITY_DURATION}ms` },
          })
        ))}
      </span>
    );
  }
}

export default SquashChildren;
