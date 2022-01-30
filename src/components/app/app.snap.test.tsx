import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import App from './app';
import { guitars } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/types';
import { NameSpace } from '../../store/reducers/root-reducer';
import { SeachOptions } from '../../const/const';

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
    guitarsAndComments: mockData,
    guitarsPerPage: mockData.slice(0, 10),
    searchResult: [],
  },
  [NameSpace.Filter]: {
    filterURLOptions: {
      [SeachOptions.PriceMin]: '',
      [SeachOptions.PriceMax]: '',
      [SeachOptions.Acoustic]: false,
      [SeachOptions.Electric]: false,
      [SeachOptions.Ukulele]: false,
      [SeachOptions.FourStrings]: false,
      [SeachOptions.SixStrings]: false,
      [SeachOptions.SevenStrings]: false,
      [SeachOptions.TwelveStrings]: false,
    },
  },
});

describe('Component: App', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
