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
  updateFrog,
  killFrog,
  endAnimation,
} from '../actions';
import {
  OPACITY_DURATION,
  TRANSLATE_DURATION,
  IDLE_TIME_BETWEEN_STEPS,
} from '../constants';


const OPACITY_TIME_WITH_IDLE = OPACITY_DURATION + IDLE_TIME_BETWEEN_STEPS;
const TRANSLATE_TIME_WITH_IDLE = TRANSLATE_DURATION + IDLE_TIME_BETWEEN_STEPS;

// function* getInitial

function* runAnimation(action) {
  // For now, we're doing to be fairly dumb about this, and enumerate every
  // step explicitly. It's likely possible to automate this, based on the
  // number of values in our reducing-data array, but for now let's keep it
  // simple.

  // Start by focusing the lines for the first transition
  yield put(focusLines({ lineIds: ['initial-value', 'reduce-open'] }));
  yield delay(OPACITY_TIME_WITH_IDLE);

  // Animate the first translation, moving the initial value to `acc`
  yield put(jumpToNewPad({ frogId: 'acc-frog', padId: 'param-acc'}));
  yield delay(TRANSLATE_TIME_WITH_IDLE);

  // Animate the second translation, moving the first value to `item`
  yield put(focusLines({ lineIds: ['values', 'reduce-open'] }));
  yield delay(OPACITY_TIME_WITH_IDLE);
  yield put(jumpToNewPad({ frogId: 'value-0-frog', padId: 'param-item'}));
  yield delay(TRANSLATE_TIME_WITH_IDLE);

  // Our first iteration is special since the original value comes from
  // initialValue instead of the previous iteration.
  // Afterwards, though, we can just loop for the remaining 4 updates.
  for ( let index = 0; index < 5; index++ ) {
    // Focus the reduce body, in preparation for the merger
    yield put(focusLines({ lineIds: ['reduce-open', 'reduce-body'] }));
    yield delay(OPACITY_TIME_WITH_IDLE);

    // Show the initial acc/item values in the function.
    yield put(jumpToNewPad({
      frogId: 'acc-frog',
      padId: 'body-acc',
    }));
    yield delay(OPACITY_DURATION / 2);
    yield put(jumpToNewPad({
      frogId: `value-${index}-frog`,
      padId: 'body-item',
    }));
    yield delay(TRANSLATE_TIME_WITH_IDLE);


    // Run the smush animation, calculate and show the new `acc`
    yield put(toggleBodySquash());
    yield delay(OPACITY_DURATION);
    yield put(runReduceLogic());

    // We need to update our acc frog to hold the newly-computed value
    const currentValue = yield select(state => state.reducingData.acc);
    yield put(updateFrog({ id: 'acc-frog', children: currentValue }));
    yield delay(OPACITY_TIME_WITH_IDLE);

    // Prepare the start of the next iteration,
    // as long as this isn't the last one.
    if (index !== 4) {
      // Let's kill our value frog: its job is done.
      // Then, immediately unsquash the body, and jump our acc frog back up
      // to the params.
      yield put(killFrog({ id: `value-${index}-frog` }));
      yield put(jumpToNewPad({ frogId: 'acc-frog', padId: 'param-acc' }));
      yield put(toggleBodySquash());
      yield delay(TRANSLATE_TIME_WITH_IDLE);

      yield put(focusLines({ lineIds: ['values', 'reduce-open'] }));
      yield delay(OPACITY_TIME_WITH_IDLE);

      yield put(jumpToNewPad({
        frogId: `value-${index + 1}-frog`,
        padId: 'param-item',
      }));
      yield delay(TRANSLATE_TIME_WITH_IDLE);
    }
  }

  yield put(focusLines({ lineIds: ['reduce-body', 'reduce-open'] }));
  yield delay(OPACITY_DURATION);

  yield put(endAnimation());

}

export default function* () {
  yield takeEvery(BEGIN_ANIMATION, runAnimation)
}
