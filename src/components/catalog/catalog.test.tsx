import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Catalog from './catalog';
import { guitars } from '../../mocks/mocks';
import * as Redux from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/types';
import { SeachOptions } from '../../const/const';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockData = guitars;
const mockDataPerPage = guitars.slice(0, 10);


describe('Component: Catalog', () => {
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

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render (
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getAllByText('Подробнее')).toHaveLength(9);
    expect(screen.getAllByText('Купить')).toHaveLength(9);
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
