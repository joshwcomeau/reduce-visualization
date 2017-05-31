import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import runDemoSaga from '../sagas/run-demo.saga';
import DevTools from '../components/DevTools';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(runDemoSaga);

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
