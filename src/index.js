import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import Demo from './components/Demo';
import DevTools from './components/DevTools';


const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div>
      <Demo />
      <DevTools />
    </div>
  </Provider>
);

render(<App />, document.getElementById('root'));
