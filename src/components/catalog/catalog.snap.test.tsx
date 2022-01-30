import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/types';
import Catalog from './catalog';
import { guitars } from '../../mocks/mocks';
import { NameSpace } from '../../store/reducers/root-reducer';
import { SeachOptions } from '../../const/const';

const history = createMemoryHistory();
const mockData = guitars;
const mockDataPerPage = guitars.slice(0, 10);

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
    guitarsPerPage: mockDataPerPage,
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
describe('Component: Catalog', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
