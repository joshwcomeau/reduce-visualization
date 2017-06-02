import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { beginAnimation } from '../actions';

import LilyPad from './LilyPad';
import {
  Button,
  Card,
  Col,
  DataWithHeader,
  BackgroundItemSet,
  ForegroundItemSet,
  ReduceStatement,
  Row,
} from './presentational-components';


class Demo extends Component {
  render() {
    const { tick, beginAnimation, initialValue, values } = this.props;

    console.log({ values })

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
                <LilyPad id="initial-value" />
              </ForegroundItemSet>
            </Col>

            <Col>
              <BackgroundItemSet>
                {values.join(', ')}
              </BackgroundItemSet>
              <ForegroundItemSet>
                {values.map((value, index) => (
                  <LilyPad id={`value-${index}`} />
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
