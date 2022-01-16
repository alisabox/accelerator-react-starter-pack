import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Search from './search';
import { guitars } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/types';

const mockData = guitars;

const history = createMemoryHistory();

describe('Component: Search', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly', () => {
    const store = mockStore({
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: mockData,
    });

    render (
      <Provider store={store}>
        <Router history={history}>
          <Search />
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
  });
});  
