import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { fetchGuitarsAndCommentsAction } from './store/api-actions';
import { reducer } from './store/reducer';
import App from './components/app/app';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const api = createAPI();
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchGuitarsAndCommentsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router  history={createBrowserHistory()}>
        <App />
      </Router >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
