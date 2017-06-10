import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { OPACITY_DURATION } from '../constants';


class Line extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    indented: PropTypes.number,
    isFocused: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    indented: 0,
  }

  render() {
    const { indented, isFocused, children } = this.props;

    return (
      <div
        style={{
          opacity: isFocused ? 1 : 0.25,
          paddingLeft: indented * 28,
          transition: `opacity ${OPACITY_DURATION}ms`,
          lineHeight: 1.3,
        }}
      >
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFocused: state.lines[ownProps.id],
});

export default connect(mapStateToProps)(Line);
