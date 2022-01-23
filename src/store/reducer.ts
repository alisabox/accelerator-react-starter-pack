import { createReducer } from '@reduxjs/toolkit';
import { SeachOptions } from '../const/const';
import { initialStateType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage, getFilterURLOptions } from './actions';

export const initialState: initialStateType = {
  guitarsAndComments: [],
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
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitarsAndComments, (state, action) => {
      state.guitarsAndComments = action.payload.guitarsAndComments;
    })
    .addCase(getGuitarsPerPage, (state, action) => {
      state.guitarsPerPage = action.payload.guitarsPerPage;
    })
    .addCase(getSearchResult, (state, action) => {
      state.searchResult = action.payload.searchResult;
    })
    .addCase(clearSearchResult, (state) => {
      state.searchResult = initialState.searchResult;
    })
    .addCase(getFilterURLOptions, (state, action) => {
      state.filterURLOptions = action.payload.filterURLOptions;
    });
});

export type RootState = ReturnType<typeof reducer>;
