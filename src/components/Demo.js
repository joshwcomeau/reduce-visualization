import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { beginAnimation } from '../actions';

import LilyPad from './LilyPad';
import Frog from './Frog';
import {
  Button,
  Card,
  Col,
  DataWithHeader,
  BackgroundItemSet,
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
          <Row>
            <Col>
              <BackgroundItemSet>
                {initialValue}
              </BackgroundItemSet>
              <ForegroundItemSet>
                <LilyPad tag="span" id="initial-value-pad">
                  <Frog
                    id="initial-value-frog"
                    padId="initial-value-pad"
                  >
                    {initialValue}
                  </Frog>
                </LilyPad>
              </ForegroundItemSet>
            </Col>

            <Col>
              <BackgroundItemSet>
                {values.join(', ')}
              </BackgroundItemSet>
              <ForegroundItemSet>
                {values.map((value, index) => (
                  <span key={index}>
                    <LilyPad
                      tag="span"
                      style={{ display: 'inline-block' }}
                      id={`value-${index}-pad`}
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
              </ForegroundItemSet>
            </Col>
          </Row>

          <ReduceStatement>
            const reduce = (
            {
              <LilyPad
                id="acc"
                style={{ display: 'inline-block', width: 40 }}
              >
                acc
              </LilyPad>
            }
            {', '}
            {
              <LilyPad
                id="item"
                style={{ display: 'inline-block', width: 54 }}
              >
                item
              </LilyPad>
            }
            )
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
