import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addLilyPad } from '../actions';

import Frog from './Frog';


class LilyPad extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    addLilyPad: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
  }

  componentDidMount() {
    const { id } = this.props;

    // On mount, let Redux know that this pad exists.
    this.props.addLilyPad({ id, elem: this.elem });
  }

  render() {
    const { id, tag, children } = this.props;

    return React.createElement(
      tag,
      {
        id,
        ref: elem => this.elem = elem,
      },
      children
    );
  }
}

const mapDispatchToProps = { addLilyPad };

export default connect(null, mapDispatchToProps)(LilyPad);
