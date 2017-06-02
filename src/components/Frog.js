import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFrog } from '../actions';


class Frog extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    padId: PropTypes.string.isRequired,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    addFrog: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    tag: 'div',
  }

  componentDidMount() {
    const { id, padId } = this.props;
    const { elem } = this;

    // On mount, let Redux know that this frog exists.
    this.props.addFrog({ id, padId, elem });
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


const mapDispatchToProps = { addFrog }

export default connect(null, mapDispatchToProps)(Frog);
