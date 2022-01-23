import { createAction } from '@reduxjs/toolkit';
import { GuitarAndCommentsType, GuitarType, SeachOptionsType } from '../types/types';
import { ActionType } from '../const/const';

export const getGuitarsAndComments = createAction(
  ActionType.GetGuitarsAndComments,
  (guitarsAndComments: GuitarAndCommentsType[]) => ({
    payload: {
      guitarsAndComments,
    },
  }),
);

export const getGuitarsPerPage = createAction(
  ActionType.GetGuitarsPerPage,
  (guitarsPerPage: GuitarAndCommentsType[]) => ({
    payload: {
      guitarsPerPage,
    },
  }),
);

export const getSearchResult = createAction(
  ActionType.GetSearchResult,
  (searchResult: GuitarType[]) => ({
    payload: {
      searchResult,
    },
  }),
);

export const clearSearchResult = createAction(ActionType.ClearSearchResult);

export const getFilterURLOptions = createAction(
  ActionType.GetFilterURLOptions,
  (filterURLOptions: SeachOptionsType) => ({
    payload: {
      filterURLOptions,
    },
  }),
);
