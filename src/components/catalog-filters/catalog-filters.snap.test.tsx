import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/types';
import CatalogFilters from './catalog-filters';
import { guitars } from '../../mocks/mocks';
import { NameSpace } from '../../store/reducers/root-reducer';
import { SeachOptions } from '../../const/const';

const history = createMemoryHistory();

const mockData = guitars;

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
    guitarsPerPage: [],
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
describe('Component: Catalog filters', () => {
  test('should render correctly vs. snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilters />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
