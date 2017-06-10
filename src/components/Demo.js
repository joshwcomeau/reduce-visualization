import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import { OPACITY_DURATION } from '../constants';

import Header from './Header';
import LilyPad from './LilyPad';
import Frog from './Frog';
import Line from './Line';
import FadeOnChange from './FadeOnChange';
import SquashChildren from './SquashChildren';
import {
  Card,
  ReduceStatement,
  Small,
  Wrapper,
} from './presentational-components';


class Demo extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    values: PropTypes.arrayOf(PropTypes.number),
    initialValue: PropTypes.number,
    acc: PropTypes.number,
    item: PropTypes.number,
    status: PropTypes.string,
    squashBody: PropTypes.bool,
  }

  renderInitialDefinitions() {
    const { initialValue, values } = this.props;

    return (
      <span>
        <Line id="initial-value">
          {'const initialValue = '}
          <LilyPad
            tag="span"
            style={{ display: 'inline-block', width: 14 }}
            id="initial-value-pad"
            placeholder={initialValue}
          >
            <Frog
              id="acc-frog"
              padId="initial-value-pad"
            >
              {initialValue}
            </Frog>
          </LilyPad>
        </Line>

        <Line id="values">
          {'const values = ['}
          {values.map((value, index) => (
            <span key={index}>
              <LilyPad
                tag="span"
                style={{ display: 'inline-block', width: 14 }}
                id={`value-${index}-pad`}
                placeholder={value}
              >
                <Frog
                  id={`value-${index}-frog`}
                  padId={`value-${index}-pad`}
                >
                  {value}
                </Frog>
              </LilyPad>
              {(index < values.length - 1) && ', '}
            </span>
          ))}
          {']'}
        </Line>
      </span>
    );
  }

  renderReduceFn() {
    const { status, acc, squashBody } = this.props;

    const reduceBodyItemStyles = {
      display: 'inline-block',
      width: 52,
      textAlign: 'center',
    };

    return (
      <span>
        <Line id="reduce-open">
          {'const total = '}
          <span
            style={{
              display: 'inline-block',
              position: 'absolute',
              opacity: status === 'completed' ? 1 : 0,
              transition: `opacity ${OPACITY_DURATION}ms`,
              transitionDelay: `${OPACITY_DURATION}ms`,
              paddingTop: 5,
            }}
          >
            <strong>{acc}</strong>
          </span>
          <span
            style={{
              opacity: status === 'completed' ? 0 : 1,
              transition: `opacity ${OPACITY_DURATION}ms`,
            }}
          >
            {'values.reduce(('}
            {
              <LilyPad
                id="param-acc"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  width: 70,
                }}
                placeholder="acc"
              />
            }
            {','}
            {
              <LilyPad
                id="param-item"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  width: 70,
                }}
                placeholder="&nbsp;item"
              />
            }
            {') => {'}
          </span>
        </Line>

        <FlipMove leaveAnimation="fade">
          {status !== 'completed' && (
            <span>
              <Line id="reduce-body" indented={1}>
                {'return '}
                <SquashChildren
                  style={{
                    width: 135,
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <LilyPad
                    id="body-acc"
                    style={reduceBodyItemStyles}
                    placeholder="acc"
                  />
                  {!squashBody && (
                    <span style={{ display: 'inline-block' }}>
                      {'+'}
                    </span>
                  )}
                  {!squashBody && (
                    <LilyPad
                      id="body-item"
                      style={reduceBodyItemStyles}
                      placeholder="item"
                    />
                  )}
                </SquashChildren>
              </Line>

              <Line id="reduce-close">
                {'}, initialValue)'}
              </Line>
            </span>
          )}
        </FlipMove>
      </span>
    );
  }

  render() {
    const { status } = this.props;

    return (
      <Wrapper>
        <Header />

        <Card>
          <ReduceStatement>
            {this.renderInitialDefinitions()}
            <br />
            {this.renderReduceFn()}
          </ReduceStatement>
        </Card>

        <FadeOnChange>
          {status === 'completed' && (
            <Small>To re-run the animation, refresh the page.</Small>
          )}
        </FadeOnChange>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  values: state.reducingData.values,
  initialValue: state.reducingData.initialValue,
  acc: state.reducingData.acc,
  item: state.reducingData.item,
  status: state.animation.status,
  squashBody: state.animation.squashBody,
});

export default connect(mapStateToProps)(Demo);
