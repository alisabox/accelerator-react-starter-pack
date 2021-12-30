import { State, GuitarAndCommentsType, GuitarType, ReselectType, FilterSettingsType } from '../types/types';
import { createSelector } from 'reselect';

export const getGuitarsAndCommentsSelector = (state: State): GuitarAndCommentsType[] => state.guitarsAndComments;
export const getSearchResultSelector = (state: State): GuitarType[] => state.searchResult;

export const getFilterSettings = (): ReselectType<FilterSettingsType | undefined> => createSelector(getGuitarsAndCommentsSelector, (guitars) => {
  if (guitars.length === 0) {
    return;
  }
  const guitarsSortedByPrice = guitars.slice().sort((a, b) => a.price - b.price);
  const stringCount = [...new Set(guitars.map((guitar) => guitar.stringCount))];
  return {
    minPrice: guitarsSortedByPrice[0].price,
    maxPrice: guitarsSortedByPrice[guitarsSortedByPrice.length - 1].price,
    stringCount,
  };
});
