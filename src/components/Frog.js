import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import { TRANSLATE_DURATION } from '../constants';
import { getElementCenter } from '../helpers';


class Frog extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    padId: PropTypes.string.isRequired,
    lastLilyPad: PropTypes.object,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
  }

  componentDidMount() {
    // It's possible that this Frog was previously on a different LilyPad.
    // We have access to that pad data, as well as the captured element ref.
    // We need to do something vaguely FLIP-like, to move the frog back over
    // that pad, and then smoothly transition it onto its current position.
    const { lastLilyPad } = this.props;

    if (!lastLilyPad) {
      return;
    }

    const formerCenter = getElementCenter(lastLilyPad.elem);
    const currentCenter = getElementCenter(this.elem);

    const top = formerCenter.y - currentCenter.y + 5;
    const left = formerCenter.x - currentCenter.x;

    this.elem.style.transform = `translate(${left}px, ${top}px)`;
    window.requestAnimationFrame(() => {
      this.elem.style.transition = `transform ${TRANSLATE_DURATION}ms`;
      window.requestAnimationFrame(() => {
        this.elem.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  render() {
    const { id, tag, children } = this.props;
    const delegated = omit(this.props, Object.keys(Frog.propTypes));

    return React.createElement(
      tag,
      {
        id,
        ref: elem => this.elem = elem,
        style: {
          display: 'inline-block',
        },
        ...delegated,
      },
      children
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const frog = state.frogs[ownProps.id];

  // The very first time this runs, the frog won't be in Redux state yet.
  // Subsequent renders might have the frog, but if it hasn't jumped its
  // original pad yet, it still won't have a `lastPadId`.
  if (!frog || !frog.lastPadId) {
    return {};
  }

  return { lastLilyPad: state.lilyPads[frog.lastPadId] };
};

export default connect(mapStateToProps, {})(Frog);
