/* eslint-disable no-unused-vars */
import { takeEvery } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';

import { BEGIN_ANIMATION } from '../actions';


function handleTick(action) {

}

export default function* () {
  yield takeEvery(BEGIN_ANIMATION, handleTick)
}
