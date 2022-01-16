import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { render, screen } from '@testing-library/react';
import { State } from '../../types/types';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const/const';
import App from './app';


const history = createMemoryHistory();
describe('Application Routing', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render "Загружаем..." text when data is loading', () => {
    const store = mockStore({
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: [],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.queryByText(/Загружаем.../i)).toBeInTheDocument();
  });

  it('should render "Screen404" when user navigate to non-existent route', () => {
    const store = mockStore({
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: [],
    });
    history.push('/non-existent-route');
    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});