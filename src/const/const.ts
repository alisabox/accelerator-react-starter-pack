import { GuitarAndCommentsType } from '../types/types';

export const APIRoute = {
  GUITARS: '/guitars',
  COMMENTS: '/comments',
  COUPONS: '/coupons',
  ORDERS: '/orders',
} as const;

export const AppRoute = {
  ROOT: '/',
  CATALOG: 'catalog',
} as const;

export enum ActionType {
  GetGuitarsAndComments = 'MAIN/GET_GUITARS_AND_COMMENTS',
  GetSearchResult = 'MAIN/GET_SEARCH_RESULT',
  ClearSearchResult = 'MAIN/CLEAR_SEARCH_RESULT',
  GetFilterResult = 'MAIN/GET_FILTER_RESULT',
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

export const SeachOperators = {
  MinPrice: 'price_gte=',
  MaxPrice: 'price_lte=',
  TypeAcoustic: 'type=acoustic',
  TypeElectric: 'type=electric',
  TypeUkulele: 'type=ukulele',
  FourStrings: 'stringCount=4',
  SixStrings: 'stringCount=6',
  SevenStrings: 'stringCount=7',
  TwelveStrings: 'stringCount=12',
} as const;

export enum Price {
  From = 'From',
  To = 'To',
}
