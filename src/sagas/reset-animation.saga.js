/* eslint-disable no-unused-vars */
import { delay } from 'redux-saga';
import { take, put, all, select, takeEvery } from 'redux-saga/effects';

import {
  RESET_ANIMATION,
  jumpToNewPad,
  updateFrog,
  beginAnimation,
} from '../actions';
import {
  OPACITY_DURATION,
  TRANSLATE_DURATION,
  IDLE_TIME_BETWEEN_STEPS,
} from '../constants';


const OPACITY_TIME_WITH_IDLE = OPACITY_DURATION + IDLE_TIME_BETWEEN_STEPS;
const TRANSLATE_TIME_WITH_IDLE = TRANSLATE_DURATION + IDLE_TIME_BETWEEN_STEPS;


function* resetAnimation(action) {
  // Once the user clicks 'play', the 'beginAnimation' button becomes a
  // 'resetAnimation button'.
  // If the animation is running, 'reset' will restore the initial state, and
  // the button will return to a 'play' state.
  // If the animation has already completed, though, the 'reset' button will
  // restore it to it's initial state AND start playing it (no sense needing
  // 2 clicks to replay an ended animation)
  const { status } = yield select(state => state.animation);

  // Restoring its initial state is surprisingly annoying.
  // The initial state of frogs was dictated by React, and there's no easy
  // way to figure out what the initial redux state was, since it happened
  // incrementally (we can't just look at which frogs were added, because some
  // frogs were added later :/)
  yield put(updateFrog({ id: 'acc-frog', children: 0 }));
  yield put(updateFrog({ id: 'value-0-frog', children: 1, dead: false }));
  yield put(updateFrog({ id: 'value-1-frog', children: 2, dead: false }));
  yield put(updateFrog({ id: 'value-2-frog', children: 3, dead: false }));
  yield put(updateFrog({ id: 'value-3-frog', children: 4, dead: false }));
  yield put(updateFrog({ id: 'value-4-frog', children: 5, dead: false }));
  yield put(jumpToNewPad({ frogId: 'acc-frog', padId: 'initial-value-pad' }));
  yield put(jumpToNewPad({ frogId: 'value-0-frog', padId: 'value-0-pad' }));
  yield put(jumpToNewPad({ frogId: 'value-1-frog', padId: 'value-1-pad' }));
  yield put(jumpToNewPad({ frogId: 'value-2-frog', padId: 'value-2-pad' }));
  yield put(jumpToNewPad({ frogId: 'value-3-frog', padId: 'value-3-pad' }));
  yield put(jumpToNewPad({ frogId: 'value-4-frog', padId: 'value-4-pad' }));
}

export default function* () {
  yield takeEvery(RESET_ANIMATION, resetAnimation)
}
