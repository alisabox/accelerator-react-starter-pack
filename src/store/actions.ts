import { createAction } from '@reduxjs/toolkit';
import { GuitarAndCommentsType, GuitarType } from '../types/types';
import { ActionType } from '../const/const';

export const getGuitarsAndComments = createAction(
  ActionType.GetGuitarsAndComments,
  (guitarsAndComments: GuitarAndCommentsType[]) => ({
    payload: {
      guitarsAndComments,
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
