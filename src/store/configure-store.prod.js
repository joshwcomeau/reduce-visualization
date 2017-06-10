import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import runDemoSaga from '../sagas/run-demo.saga';
import resetAnimationSaga from '../sagas/reset-animation.saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(runDemoSaga);
  sagaMiddleware.run(resetAnimationSaga);

  return store;
}
