/* eslint-disable no-unused-vars */
import { takeEvery } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';


function handleTick(action) {

}

export default function* () {
  yield takeEvery('BEGIN_ANIMATION', handleTick)
}
