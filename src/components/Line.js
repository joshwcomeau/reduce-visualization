import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LINE_OPACITY_DURATION } from '../constants';


class Line extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    indented: PropTypes.bool,
    isFocused: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    const { indented, isFocused, children } = this.props;

    return (
      <div
        style={{
          opacity: isFocused ? 1 : 0.25,
          paddingLeft: indented ? 40 : 0,
          transition: `opacity ${LINE_OPACITY_DURATION}ms`,
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
