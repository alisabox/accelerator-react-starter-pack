import { createReducer } from '@reduxjs/toolkit';
import { initialStateType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult } from './actions';

export const initialState: initialStateType = {
  guitarsAndComments: [],
  searchResult: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitarsAndComments, (state, action) => {
      state.guitarsAndComments = action.payload.guitarsAndComments;
    })
    .addCase(getSearchResult, (state, action) => {
      state.searchResult = action.payload.searchResult;
    })
    .addCase(clearSearchResult, (state, action) => {
      state.searchResult = initialState.searchResult;
    });
});

export type RootState = ReturnType<typeof reducer>;
