import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { fetchGuitarsAndCommentsAction, fetchSearchResultAction, fetchGuitarsPerPage } from './api-actions';
import { APIRoute } from '../const/const';
import { State } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from './actions';
import { guitars } from '../mocks/mocks';

describe('API actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch getGuitarsAndComments on load', async () => {
    const input = null;
    const mockData = guitars;
    mockAPI
      .onGet(`${APIRoute.GUITARS}?_embed=comments${input ? `&${input}` : ''}`)
      .reply(200, mockData);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAndCommentsAction());

    expect(store.getActions()).toEqual([
      getGuitarsAndComments(mockData),
    ]);
  });

  it('should dispatch fetchSearchResultAction on search', async () => {
    const input = 'curt';
    const filteredMockData = guitars.filter((guitar) => guitar.name.includes(input));
    mockAPI
      .onGet(`${APIRoute.GUITARS}?name_like=${input}`)
      .reply(200, filteredMockData);

    const store = mockStore();
    await store.dispatch(fetchSearchResultAction(input));

    expect(store.getActions()).toEqual([
      getSearchResult(filteredMockData),
    ]);
  });

  it('should clear search on empty fetchSearchResultAction', async () => {
    const input = null;
    mockAPI
      .onGet(`${APIRoute.GUITARS}?name_like=${input}`)
      .reply(200);

    const store = mockStore();
    await store.dispatch(fetchSearchResultAction(input));

    expect(store.getActions()).toEqual([
      clearSearchResult(),
    ]);
  });

  it('should fetch first 9 guitars on load', async () => {
    const mockData = guitars.slice(0, 10);
    const input = '_start=1&_limit=9';
    mockAPI
      .onGet(`${APIRoute.GUITARS}?_embed=comments&${input}`)
      .reply(200, mockData);

    const store = mockStore();
    await store.dispatch(fetchGuitarsPerPage(input));

    expect(store.getActions()).toEqual([
      getGuitarsPerPage(mockData),
    ]);
  });
});
