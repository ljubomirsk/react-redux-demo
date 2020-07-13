import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ThemeWrapper } from '@inplayer-org/inplayer-ui';
import App from './App';

import store from './store';

import './index.css';

const render = () => {
  ReactDOM.render(
    <ThemeWrapper>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ThemeWrapper>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
