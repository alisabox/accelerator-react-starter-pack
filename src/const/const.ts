import { GuitarAndCommentsType } from '../types/types';

export const APIRoute = {
  GUITARS: '/guitars',
  COMMENTS: '/comments',
  COUPONS: '/coupons',
  ORDERS: '/orders',
};

export enum ActionType {
  GetGuitarsAndComments = 'MAIN/GET_GUITARS_AND_COMMENTS',
  GetSearchResult = 'MAIN/GET_SEARCH_RESULT',
  ClearSearchResult = 'MAIN/CLEAR_SEARCH_RESULT',
}

export enum CatalogSort {
  Price = 'Price',
  Rating = 'Rating',
  None = 'None',
}

export enum CatalogSortOrder {
  Down = 'Down',
  Up = 'Up',
  None = 'None',
}

export const sortGuitars = (guitars: GuitarAndCommentsType[], sortMode: CatalogSort, order: CatalogSortOrder): GuitarAndCommentsType[] => {
  sortMode = sortMode === CatalogSort.None ? CatalogSort.Price : sortMode;
  order = order === CatalogSortOrder.None ? CatalogSortOrder.Up : order;
  const key = sortMode === CatalogSort.Price ? 'price' : 'rating';
  if (order === CatalogSortOrder.Up) {
    return guitars.slice().sort((a, b) => a[key] - b[key]);
  }
  return guitars.slice().sort((a, b) => b[key] - a[key]);
};
