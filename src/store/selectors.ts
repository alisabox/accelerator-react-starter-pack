import { State, GuitarAndCommentsType, GuitarType } from '../types/types';

export const getGuitarsAndCommentsSelector = (state: State): GuitarAndCommentsType[] => state.guitarsAndComments;
export const getSearchResultSelector = (state: State): GuitarType[] => state.searchResult;
