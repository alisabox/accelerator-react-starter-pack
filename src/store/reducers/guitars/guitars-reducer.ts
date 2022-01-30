import { createReducer } from '@reduxjs/toolkit';
import { guitarsStateType } from '../../../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from '../../actions';

export const initialState: guitarsStateType = {
  guitarsAndComments: [],
  guitarsPerPage: [],
  searchResult: [],
};

export const guitarsReducer = createReducer(initialState, (builder) => {
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
