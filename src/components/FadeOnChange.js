// `FadeOnChange` is a utility component that will fade a component out/in
// whenever its props change. It's a way of highlighting that a section of
// the page has changed (eg. subtitle text changed).
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OPACITY_DURATION } from '../constants';
import { requestAnimationFramePromise, setTimeoutPromise } from '../helpers';


class FadeOnChange extends Component {
  static propTypes = {
    styles: PropTypes.object,
    children: PropTypes.node,
  }

  static defaultProps = {
    styles: {},
  }

  state = {
    children: this.props.children,
  }

  setStatePromise = newState => new Promise(resolve => (
    this.setState(newState, resolve)
  ))

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.children !== nextState.children ||
      this.props.children !== nextProps.children
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // Ignore state-change updates, since these updates only happen mid-fade
    // to swap out the content being rendered.
    if (this.state.children !== prevState.children) {
      return;
    }

    // This is a pretty gross sequence of events, but this is a surprisingly
    // tricky problem!
    //
    // We can't simply render the props, because then the text will change
    // RIGHT AWAY, before it even starts fading away. So instead we render
    // the state.children, and only do that swap when it's invisible.
    // This sequence of events is required to ensure that the swap happens at
    // the right time, and the animation works.
    requestAnimationFramePromise()
      .then(() => { this.childElem.style.opacity = 0; })
      .then(() => setTimeoutPromise(OPACITY_DURATION))
      .then(() => this.setStatePromise({ children: this.props.children }))
      .then(() => { this.childElem.style.opacity = 1; })
      .catch(() => {
        // Swallow errors. The most likely error here is that the component
        // unmounted during the delay between fades. This isn't a big deal.
        //
        // At any rate, this is just a presentational thing with no network
        // side effects, so it's safe to ignore whatever it wants to complain
        // about.
      });
  }

  render() {
    const { styles } = this.props;
    const transition = `${OPACITY_DURATION}ms`;

    return (
      <div
        style={{ display: 'inline-block', transition, styles }}
        ref={elem => this.childElem = elem}
      >
        {this.state.children}
      </div>
    );
  }
}

export default FadeOnChange;
