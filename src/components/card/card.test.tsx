import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Card from './card';
import { guitars } from '../../mocks/mocks';
import { SeachOptions } from '../../const/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockData = guitars;

const store = mockStore({
  guitarsAndComments: mockData,
  guitarsPerPage: [],
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

describe('Component: Card', () => {
  it('should render correctly', () => {
    const guitar = mockData[0];

    render (
      <Provider store={store}>
        <Router history={history}>
          <Card guitar={guitar} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(guitar.comments.length.toString())).toBeInTheDocument();
    expect(screen.getByText(guitar.name)).toBeInTheDocument();
    expect(screen.getByText(`${guitar.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
