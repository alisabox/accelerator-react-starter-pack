import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Header from './header';
import { guitars } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/types';
import { NameSpace } from '../../store/reducers/root-reducer';

const mockData = guitars;

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Guitars]: {
    guitarsAndComments: [],
    guitarsPerPage: [],
    searchResult: mockData,
  },
});

describe('Component: Header', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
