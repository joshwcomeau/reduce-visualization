import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Frog from './Frog';


class LilyPad extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    frogs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      elem: PropTypes.object.isRequired, // TODO: More specific!
    })).isRequired,
  }

  render() {
    const { id, frogs } = this.props;

    // A bunch of stuff could be happening in this update loop.
    // - A new frog could be landing
    // - A new frog could be jumping to another lilly pad
    // - A new frog could be leaving the DOM

    return (
      <div id={id}>
        {frogs.map(frog => (
          <Frog id={frog} padId={id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  frogs: Object.keys(state.frogs).map(frogId => (
    state.frogs[frogId].lilyPadId === ownProps.id
  )),
});

export default connect(mapStateToProps)(LilyPad);
