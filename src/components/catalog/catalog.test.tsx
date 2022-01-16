import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Catalog from './catalog';
import { guitars } from '../../mocks/mocks';
// import { AppRoute } from '../../const/const';
import * as Redux from 'react-redux';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/types';
import React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as Debounce from '../../hooks/useDebounce';

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
      guitarsAndComments: mockData,
      guitarsPerPage: mockDataPerPage,
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const debounce = jest.fn();
    const useDebounce = jest.spyOn(Debounce, 'useDebounce');
    useDebounce.mockReturnValue(debounce);
    
    // jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb());
    const realUseSEffect = React.useEffect;
    jest
      .spyOn(React, 'useEffect')
      .mockImplementationOnce(() => realUseSEffect(() => dispatch()));

    const realUseState = React.useState;
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState());

    // const realUseLocation = ReactRouter.useLocation;
    // jest
    //   .spyOn(ReactRouter, 'useLocation')
    //   .mockImplementationOnce(() => realUseLocation());
    render (
      // <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      // </Provider>,
    );

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.findAllByText('Подробнее')).toHaveLength(9);
    expect(screen.findAllByText('Купить')).toHaveLength(9);
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене:')).toBeInTheDocument();
    expect(screen.getByText('по популярности:')).toBeInTheDocument();
  });
});  
