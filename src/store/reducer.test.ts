import { reducer, initialState } from './reducer';
import { guitars } from '../mocks/mocks';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage, getFilterURLOptions } from './actions';
import { SeachOptions } from '../const/const';

const mockData = guitars;

describe('Reducer', () => {

  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update guitarsAndComments on data load', () => {
    const state = {
      ...initialState,
      guitarsAndComments: [],
    };

    expect(reducer(state, getGuitarsAndComments(mockData)))
      .toEqual({
        ...initialState,
        guitarsAndComments: mockData,
      });
  });

  it('should update guitarsPerPage on data load', () => {
    const state = {
      ...initialState,
      guitarsPerPage: [],
    };

    expect(reducer(state, getGuitarsPerPage(mockData.slice(0, 9))))
      .toEqual({
        ...initialState,
        guitarsPerPage: mockData.slice(0, 9),
      });
  });

  it('should update searchResult on search', () => {
    const state = {
      ...initialState,
      searchResult: [],
    };

    expect(reducer(state, getSearchResult(mockData.slice(0, 9))))
      .toEqual({
        ...initialState,
        searchResult: mockData.slice(0, 9),
      });
  });

  it('should clear searchResult on search clear', () => {
    const state = {
      ...initialState,
      searchResult: mockData.slice(0, 9),
    };

    expect(reducer(state, clearSearchResult()))
      .toEqual({
        ...initialState,
        searchResult: [],
      });
  });

  it('should update filterURLOptions on filter change', () => {
    const state = {
      ...initialState,
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
    };

    const updatedFilter = {
      [SeachOptions.PRICE_MIN]: '',
      [SeachOptions.PRICE_MAX]: '',
      [SeachOptions.ACOUSTIC]: true,
      [SeachOptions.ELECTRIC]: false,
      [SeachOptions.UKULELE]: false,
      [SeachOptions.FOUR_STRINGS]: true,
      [SeachOptions.SIX_STRINGS]: false,
      [SeachOptions.SEVEN_STRINGS]: false,
      [SeachOptions.TWELVE_STRINGS]: false,
    };

    expect(reducer(state, getFilterURLOptions(updatedFilter)))
      .toEqual({
        ...initialState,
        filterURLOptions: {
          [SeachOptions.PRICE_MIN]: '',
          [SeachOptions.PRICE_MAX]: '',
          [SeachOptions.ACOUSTIC]: true,
          [SeachOptions.ELECTRIC]: false,
          [SeachOptions.UKULELE]: false,
          [SeachOptions.FOUR_STRINGS]: true,
          [SeachOptions.SIX_STRINGS]: false,
          [SeachOptions.SEVEN_STRINGS]: false,
          [SeachOptions.TWELVE_STRINGS]: false,
        },
      });
  });
});
