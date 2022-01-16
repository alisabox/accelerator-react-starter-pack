import { createReducer } from '@reduxjs/toolkit';
import { initialStateType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from './actions';

export const initialState: initialStateType = {
  guitarsAndComments: [],
  guitarsPerPage: [],
  searchResult: [],
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
    });
});

export type RootState = ReturnType<typeof reducer>;
