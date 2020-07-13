import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeWrapper } from '@inplayer-org/inplayer-ui';
import App from './App';

import store from './store';

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <ThemeWrapper>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </ThemeWrapper>
    </BrowserRouter>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
