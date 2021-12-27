import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { fetchGuitarsAndCommentsAction } from './store/api-actions';
import { reducer } from './store/reducer';
import App from './components/app/app';

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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
