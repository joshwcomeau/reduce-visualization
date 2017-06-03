/* eslint-disable no-unused-vars */
import { take, delay, put, all, select, takeEvery } from 'redux-saga/effects';

import {
  BEGIN_ANIMATION,
  jumpToNewPad,
} from '../actions';


function* runAnimation(action) {
  console.log('Run animation!')
  // For now, we're doing to be fairly dumb about this, and enumerate every
  // step explicitly. It's likely possible to automate this, based on the
  // number of values in our reducing-data array, but for now let's keep it
  // simple.

  // Start by moving the initial value to the `acc` position, and our first
  // value to the `item` position.
  yield all([
    put(jumpToNewPad({ frogId: 'initial-value-frog', padId: 'acc'})),
    put(jumpToNewPad({ frogId: 'value-0-frog', padId: 'item'})),
  ]);
}

export default function* () {
  yield takeEvery(BEGIN_ANIMATION, runAnimation)
}
