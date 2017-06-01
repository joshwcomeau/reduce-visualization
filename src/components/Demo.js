import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { beginAnimation } from '../actions';

import LillyPad from './LillyPad';
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
    const { beginAnimation, initialValue, values } = this.props;

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
                <LillyPad id="initial-value" />
              </ForegroundItemSet>
            </Col>

            <Col>
              <BackgroundItemSet>
                {values.join(', ')}
              </BackgroundItemSet>
              <ForegroundItemSet>
                {values.map((value, index) => (
                  <LillyPad id={`value-${index}`} />
                ))}
              </ForegroundItemSet>
            </Col>
          </Row>

          <ReduceStatement>
            const reduce = (
            {
              <LillyPad
                id="acc"
                style={{ display: 'inline-block', width: 40 }}}
              />
            }
            {' '}
            {
              <LillyPad
                id="item"
                style={{ display: 'inline-block', width: 54 }}}
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
  values: state.reductionData.values,
  initialValue: state.reductionData.initialValue
});

const mapDispatchToProps = {
  beginAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
