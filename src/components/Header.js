import React from 'react';
import { connect } from 'react-redux';

import { beginAnimation } from '../actions';
import { Button, HeaderParagraph, Title } from './presentational-components';

const Header = ({ beginAnimation, hasStarted, hasFinished }) => (
  <header style={{ marginBottom: 40 }}>
    <Title>Reduce Demo</Title>
    <HeaderParagraph>
      Reduce is an incredibly powerful tool for transforming data, but getting a handle on how it works can be challenging.
    </HeaderParagraph>

    <HeaderParagraph>
      This visualization aims to show how data flows through each iteration, by following the variables. Hope it helps!
    </HeaderParagraph>
    <br /><br />

    <Button onClick={beginAnimation} disabled={hasStarted}>
        {hasFinished
          ? 'Completed.'
          : hasStarted
            ? 'Running...'
            : 'Start Animation'
        }
    </Button>
  </header>
);

const mapStateToProps = state => ({
  hasStarted: state.animation.status !== 'idle',
  hasFinished: state.animation.status === 'completed',
});

const mapDispatchToProps = {
  beginAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
