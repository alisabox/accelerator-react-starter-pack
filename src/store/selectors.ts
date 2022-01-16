import { State, GuitarAndCommentsType, GuitarType, ReselectType, FilterSettingsType } from '../types/types';
import { createSelector } from 'reselect';

export const getGuitarsAndCommentsSelector = (state: State): GuitarAndCommentsType[] => state.guitarsAndComments;
export const getGuitarsPerPageSelector = (state: State): GuitarAndCommentsType[] => state.guitarsPerPage;
export const getSearchResultSelector = (state: State): GuitarType[] => state.searchResult;

export const getPriceFilterSettings = (): ReselectType<FilterSettingsType | undefined> => createSelector(getGuitarsAndCommentsSelector, (guitars) => {
  if (guitars.length) {
    const guitarsSortedByPrice = guitars.slice().sort((a, b) => a.price - b.price);
    return {
      minPrice: guitarsSortedByPrice[0].price,
      maxPrice: guitarsSortedByPrice[guitarsSortedByPrice.length - 1].price,
    };
  }
});

