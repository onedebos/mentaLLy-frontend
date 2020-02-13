import React from 'react';
import { render } from 'react-dom';
import 'circular-std';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import App from './container/App';
import './components/styles/reset.css';

const store = createStore(rootReducer, { user: {} });

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,

    document.body.appendChild(document.createElement('div')),
  );
});
