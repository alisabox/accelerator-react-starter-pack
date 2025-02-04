import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CatalogFilters from './catalog-filters';
import { guitars } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/types';
import { SeachOptions } from '../../const/const';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();

const mockData = guitars;

describe('Component: CatalogFilters', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly', () => {
    const guitarsSortedByPrice = mockData.slice().sort((a, b) => a.price - b.price);

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
        minPrice: guitarsSortedByPrice[0].price,
        maxPrice: guitarsSortedByPrice.reverse()[0].price,
      },
    });

    render (
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilters />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByText('Акустические гитары')).toBeInTheDocument();
    expect(screen.getByText('Электрогитары')).toBeInTheDocument();
    expect(screen.getByText('Укулеле')).toBeInTheDocument();
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(guitarsSortedByPrice[0].price.toString())).toBeInTheDocument();
    expect(screen.getByPlaceholderText(guitarsSortedByPrice.reverse()[0].price.toString())).toBeInTheDocument();
  });
});
