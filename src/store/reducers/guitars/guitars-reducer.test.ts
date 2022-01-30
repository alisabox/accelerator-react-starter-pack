import { guitarsReducer, initialState } from './guitars-reducer';
import { guitars } from '../../../mocks/mocks';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from '../../actions';

const mockData = guitars;

describe('Reducer', () => {

  it('without additional parameters should return initial state', () => {
    expect(guitarsReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update guitarsAndComments on data load', () => {
    const state = {
      ...initialState,
      guitarsAndComments: [],
    };

    expect(guitarsReducer(state, getGuitarsAndComments(mockData)))
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

    expect(guitarsReducer(state, getGuitarsPerPage(mockData.slice(0, 9))))
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

    expect(guitarsReducer(state, getSearchResult(mockData.slice(0, 9))))
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

    expect(guitarsReducer(state, clearSearchResult()))
      .toEqual({
        ...initialState,
        searchResult: [],
      });
  });
});
