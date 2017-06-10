import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import Demo from './components/Demo';
import DevTools from './components/DevTools';


const store = configureStore();

class App extends PureComponent {
  state = {
    windowWidth: null,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    const { windowWidth } = this.state;

    return (
      <Provider store={store}>
        <div>
          <Demo isMobile={!!windowWidth && windowWidth < 600} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
