import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { beginAnimation } from '../actions';

import LilyPad from './LilyPad';
import Frog from './Frog';
import Line from './Line';
import {
  Button,
  Card,
  Col,
  DataWithHeader,
  ForegroundItemSet,
  ReduceStatement,
  Row,
  Span,
} from './presentational-components';


class Demo extends Component {
  render() {
    const { beginAnimation, initialValue, values } = this.props;

    return (
      <div>
        <Button onClick={beginAnimation}>
            Start Animation
        </Button>

        <Card>
          <ReduceStatement>
            <Line id="initial-value">
              {'const initialValue = '}
              <LilyPad
                tag="span"
                id="initial-value-pad"
                placeholder={initialValue}
              >
                <Frog
                  id="initial-value-frog"
                  padId="initial-value-pad"
                >
                  {initialValue}
                </Frog>
              </LilyPad>
              {';'}
            </Line>
            <Line id="values">
              {'const values = ['}
              {values.map((value, index) => (
                <span key={index}>
                  <LilyPad
                    tag="span"
                    style={{ display: 'inline-block' }}
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
              {'];'}
            </Line>
            <br />
            <Line id="reduce-open">
              {'values.reduce(('}
              {
                <LilyPad
                  id="acc"
                  style={{ display: 'inline-block', width: 40 }}
                  placeholder="acc"
                />
              }
              {', '}
              {
                <LilyPad
                  id="item"
                  style={{ display: 'inline-block', width: 54 }}
                  placeholder="item"
                />
              }
              {') => {'}
            </Line>
            <Line id="reduce-body" indented>
              {'return acc + item;'}
            </Line>
            <Line id="reduce-close">
              {'}, initialValue);'}
            </Line>
          </ReduceStatement>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  values: state.reducingData.values,
  initialValue: state.reducingData.initialValue
});

const mapDispatchToProps = {
  beginAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
