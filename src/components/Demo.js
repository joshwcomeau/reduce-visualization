import React, { Component } from 'react';
import { connect } from 'react-redux';

import { beginAnimation } from '../actions';

import LilyPad from './LilyPad';
import Frog from './Frog';
import Line from './Line';
import FadeOnChange from './FadeOnChange';
import SquashChildren from './SquashChildren';
import {
  Button,
  Card,
  ReduceStatement,
} from './presentational-components';


class Demo extends Component {
  render() {
    const {
      beginAnimation,
      initialValue,
      values,
      acc,
      item,
      showAccAndItemInBody,
      squashBody,
    } = this.props;

    console.log('Rednering', acc)

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
                style={{ display: 'inline-block', width: 14 }}
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
              {','}
              {
                <LilyPad
                  id="item"
                  style={{ display: 'inline-block', width: 70 }}
                  placeholder="&nbsp;item"
                />
              }
              {') => {'}
            </Line>
            <Line id="reduce-body" indented>
              {'return '}
              <SquashChildren
                style={{
                  width: 135,
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                }}
              >
                {!squashBody && (
                  <FadeOnChange>
                    {showAccAndItemInBody ? acc : 'acc'}
                  </FadeOnChange>
                )}
                {!squashBody && (
                  <span style={{ display: 'inline-block' }}>
                    {'+'}
                  </span>
                )}
                {!squashBody && (
                  <FadeOnChange>
                    {showAccAndItemInBody ? item : 'item'}
                  </FadeOnChange>
                )}
                {squashBody && (
                  <span>
                    {acc}
                  </span>
                )}
              </SquashChildren>
            </Line>
            <Line id="reduce-close">
              {'}, initialValue)'}
            </Line>
          </ReduceStatement>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  values: state.reducingData.values,
  initialValue: state.reducingData.initialValue,
  acc: state.reducingData.acc,
  item: state.reducingData.item,
  showAccAndItemInBody: state.animation.showAccAndItemInBody,
  squashBody: state.animation.squashBody,
});

const mapDispatchToProps = {
  beginAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
