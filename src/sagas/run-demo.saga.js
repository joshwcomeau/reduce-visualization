/* eslint-disable no-unused-vars */
import { delay } from 'redux-saga';
import { take, put, all, select, takeEvery } from 'redux-saga/effects';

import {
  BEGIN_ANIMATION,
  focusLines,
  resetLineFocus,
  jumpToNewPad,
  runReduceLogic,
  toggleReduceValuesInBody,
  toggleBodySquash,
} from '../actions';
import {
  OPACITY_DURATION,
  TRANSLATE_DURATION,
  IDLE_TIME_BETWEEN_STEPS,
} from '../constants';


const OPACITY_TIME_WITH_IDLE = OPACITY_DURATION + IDLE_TIME_BETWEEN_STEPS;
const TRANSLATE_TIME_WITH_IDLE = TRANSLATE_DURATION + IDLE_TIME_BETWEEN_STEPS;

function* runAnimation(action) {
  // For now, we're doing to be fairly dumb about this, and enumerate every
  // step explicitly. It's likely possible to automate this, based on the
  // number of values in our reducing-data array, but for now let's keep it
  // simple.

  // Start by focusing the lines for the first transition
  yield put(focusLines({ lineIds: ['initial-value', 'reduce-open'] }));
  yield delay(OPACITY_TIME_WITH_IDLE);

  // Animate the first translation, moving the initial value to `acc`
  yield put(jumpToNewPad({ frogId: 'initial-value-frog', padId: 'acc'}));
  yield delay(TRANSLATE_TIME_WITH_IDLE);

  // Animate the second translation, moving the first value to `item`
  yield put(focusLines({ lineIds: ['values', 'reduce-open'] }));
  yield delay(OPACITY_TIME_WITH_IDLE);
  yield put(jumpToNewPad({ frogId: 'value-0-frog', padId: 'item'}));
  yield delay(TRANSLATE_TIME_WITH_IDLE);

  // Focus the reduce body, in preparation for the merger
  yield put(focusLines({ lineIds: ['reduce-body'] }));
  yield delay(OPACITY_TIME_WITH_IDLE);

  // Show the initial acc/item values in the function.
  yield put(toggleReduceValuesInBody());
  yield delay(OPACITY_TIME_WITH_IDLE);

  // Run the smush animation, calculate and show the new `acc`
  yield put(toggleBodySquash());
  yield delay(OPACITY_TIME_WITH_IDLE);

}

export default function* () {
  yield takeEvery(BEGIN_ANIMATION, runAnimation)
}
