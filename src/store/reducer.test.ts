import { reducer, initialState } from './reducer';
import { guitars } from '../mocks/mocks';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from './actions';

const mockData = guitars;

describe('Reducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update guitarsAndComments on data load', () => {
    const state = {
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: [],
    };

    expect(reducer(state, getGuitarsAndComments(mockData)))
      .toEqual({
        guitarsAndComments: mockData,
        guitarsPerPage: [],
        searchResult: [],
      });
  });

  it('should update guitarsPerPage on data load', () => {
    const state = {
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: [],
    };

    expect(reducer(state, getGuitarsPerPage(mockData.slice(0, 9))))
      .toEqual({
        guitarsAndComments: [],
        guitarsPerPage: mockData.slice(0, 9),
        searchResult: [],
      });
  });
  
  it('should update searchResult on search', () => {
    const state = {
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: [],
    };

    expect(reducer(state, getSearchResult(mockData.slice(0, 9))))
      .toEqual({
        guitarsAndComments: [],
        guitarsPerPage: [],
        searchResult: mockData.slice(0, 9),
      });
  });
  
  it('should clear searchResult on search clear', () => {
    const state = {
      guitarsAndComments: [],
      guitarsPerPage: [],
      searchResult: mockData.slice(0, 9),
    };

    expect(reducer(state, clearSearchResult()))
      .toEqual({
        guitarsAndComments: [],
        guitarsPerPage: [],
        searchResult: [],
      });
  });
});