import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import isObject from 'lodash/isObject';

import { addLilyPad, addFrog } from '../actions';
import { frogsListSelector } from '../reducers/frogs.reducer';

import Frog from './Frog';


class LilyPad extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    placeholder: PropTypes.string,
    frogs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      padId: PropTypes.string.isRequired,
      children: PropTypes.node,
    })),
    addLilyPad: PropTypes.func.isRequired,
    addFrog: PropTypes.func.isRequired,
    initialValue: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
  }

  componentDidMount() {
    // On mount, let Redux know that this pad exists.
    this.props.addLilyPad({ id: this.props.id, elem: this.elem });

    // Also, let Redux know about any frogs that start on this pad.
    // We filter for objects to ignore any string children (which can be
    // used as initial values)
    const frogs = Children.toArray(this.props.children).filter(isObject);

    frogs.forEach((frogElem) => {
      const { id, children } = frogElem.props;
      const padId = this.props.id;

      // Ok, so this is pretty gross. We need to find the DOM Node for each
      // frog, but we don't have access to the ref escape hatch.
      // Initially I was going to put this logic in the Frog componentDidMount,
      // but Frogs will unmount and remount whenever their pad changes, and
      // so pads are the only way to know that a mount is the original mount.
      const elem = document.getElementById(id);

      this.props.addFrog({ id, children, padId, elem });
    });
  }

  renderFrogs() {
    const padId = this.props.id;

    return this.props.frogs.map(frog => (
      <Frog key={frog.id} id={frog.id} padId={padId}>
        {frog.children}
      </Frog>
    ));
  }

  render() {
    const { id, tag, frogs, placeholder } = this.props;
    const delegated = omit(this.props, Object.keys(LilyPad.propTypes));

    const renderedChildren = frogs.length > 0
      ? this.renderFrogs()
      : <span style={{ opacity: 0.5 }}>{placeholder}</span>;

    return React.createElement(
      tag,
      {
        id,
        ref: elem => this.elem = elem,
        ...delegated,
      },
      renderedChildren
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // Find all the frogs located on this LilyPad
  frogs: frogsListSelector(state).filter(frog => (
    frog.padId === ownProps.id
  )),
})
const mapDispatchToProps = { addLilyPad, addFrog };

export default connect(mapStateToProps, mapDispatchToProps)(LilyPad);
