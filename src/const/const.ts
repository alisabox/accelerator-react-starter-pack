import { SeachOperatorsBiasedType, SortOperatorsType } from '../types/types';

export const APIRoute = {
  GUITARS: '/guitars',
  COMMENTS: '/comments',
  COUPONS: '/coupons',
  ORDERS: '/orders',
} as const;

export const AppRoute = {
  ROOT: '/',
} as const;

export enum ActionType {
  GetGuitarsAndComments = 'MAIN/GET_GUITARS_AND_COMMENTS',
  GetGuitarsPerPage = 'MAIN/GET_GUITARS_PER_PAGE',
  GetSearchResult = 'MAIN/GET_SEARCH_RESULT',
  ClearSearchResult = 'MAIN/CLEAR_SEARCH_RESULT',
  GetFilterResult = 'MAIN/GET_FILTER_RESULT',
  GetFilterURLOptions = 'MAIN/GET_FILTER_URL_OPTIONS',
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

export const CatalogSortOperators: SortOperatorsType = {
  [CatalogSort.Price]: '_sort=price',
  [CatalogSort.Rating]: '_sort=rating',
  [CatalogSortOrder.Down]: '_order=desc',
  [CatalogSortOrder.Up]: '_order=asc',
} as const;

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

export enum SeachOptions {
  PRICE_MIN = 'priceMin',
  PRICE_MAX = 'priceMax',
  ACOUSTIC = 'acoustic',
  ELECTRIC = 'electric',
  UKULELE = 'ukulele',
  FOUR_STRINGS = '4-strings',
  SIX_STRINGS = '6-strings',
  SEVEN_STRINGS = '7-strings',
  TWELVE_STRINGS = '12-strings',
}

export const SeachOperatorsBiased: SeachOperatorsBiasedType = {
  [SeachOptions.PRICE_MIN]: SeachOperators.MinPrice,
  [SeachOptions.PRICE_MAX]: SeachOperators.MaxPrice,
  [SeachOptions.ACOUSTIC]: SeachOperators.TypeAcoustic,
  [SeachOptions.ELECTRIC]: SeachOperators.TypeElectric,
  [SeachOptions.UKULELE]: SeachOperators.TypeUkulele,
  [SeachOptions.FOUR_STRINGS]: SeachOperators.FourStrings,
  [SeachOptions.SIX_STRINGS]: SeachOperators.SixStrings,
  [SeachOptions.SEVEN_STRINGS]: SeachOperators.SevenStrings,
  [SeachOptions.TWELVE_STRINGS]: SeachOperators.TwelveStrings,
} as const;

export const NUMBER_OF_CARDS = 9;
