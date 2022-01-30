import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/root-reducer';
import App from './components/app/app';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router  history={createBrowserHistory()}>
        <ToastContainer />
        <App />
      </Router >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
