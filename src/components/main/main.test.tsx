import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Main from './main';
import { guitars } from '../../mocks/mocks';
import { SeachOptions } from '../../const/const';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/types';

const history = createMemoryHistory();

const mockData = guitars;

describe('Component: Main', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly', () => {
    const store = mockStore({
      guitarsAndComments: mockData,
      guitarsPerPage: mockData.slice(0, 10),
      searchResult: [],
      filterURLOptions: {
        [SeachOptions.PRICE_MIN]: '',
        [SeachOptions.PRICE_MAX]: '',
        [SeachOptions.ACOUSTIC]: false,
        [SeachOptions.ELECTRIC]: false,
        [SeachOptions.UKULELE]: false,
        [SeachOptions.FOUR_STRINGS]: false,
        [SeachOptions.SIX_STRINGS]: false,
        [SeachOptions.SEVEN_STRINGS]: false,
        [SeachOptions.TWELVE_STRINGS]: false,
      },
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getAllByText('Каталог')).toHaveLength(2);
    expect(screen.getAllByText('Где купить?')).toHaveLength(2);
    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(screen.getAllByText('Подробнее')).toHaveLength(9);
    expect(screen.getAllByText('Купить')).toHaveLength(9);
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
  });
});
