import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Pagination from './pagination';
import { guitars } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/types';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();

const mockData = guitars;

describe('Component: Pagination', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Guitars]: {
        guitarsAndComments: mockData,
        guitarsPerPage: mockData.slice(0, 10),
        searchResult: [],
      },
    });

    render (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
