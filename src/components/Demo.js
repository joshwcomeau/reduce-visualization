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
    const { tick, beginAnimation, initialValue, values } = this.props;

    return (
      <div>
        <Button onClick={this.beginAnimation}>
            Start Animation
        </Button>

        <Card>
          <Row>
            <Col>
              <BackgroundItemSet>
                {initialValue}
              </BackgroundItemSet>
              <ForegroundItemSet>
                <LilyPad id="initial-value-pad">
                  <Frog id="initial-value-frog" padId="initial-value-pad">
                    {initialValue}
                  </Frog>
                </LilyPad>
              </ForegroundItemSet>
            </Col>

            <Col>
              <BackgroundItemSet>
                {values.join(',')}
              </BackgroundItemSet>
              <ForegroundItemSet>
                {values.map((value, index) => (
                  <LilyPad tag={Span} id={`value-${index}-pad`}>
                    <Frog
                      id={`value-${index}-frog`}
                      padId={`value-${index}-pad`}
                    >
                      {value}
                      {(index < values.length - 1) && ','}
                    </Frog>
                  </LilyPad>
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
              />
            }
            {' '}
            {
              <LilyPad
                id="item"
                style={{ display: 'inline-block', width: 54 }}
              />
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
