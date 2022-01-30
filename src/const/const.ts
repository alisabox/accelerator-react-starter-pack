import { SeachOperatorsBiasedType, SortOperatorsType } from '../types/types';

export const APIRoute = {
  Guitars: '/guitars',
  Comments: '/comments',
  Coupons: '/coupons',
  Orders: '/orders',
} as const;

export const AppRoute = {
  Root: '/',
} as const;

export enum ActionType {
  GetGuitarsAndComments = 'MAIN/GET_GUITARS_AND_COMMENTS',
  GetGuitarsPerPage = 'MAIN/GET_GUITARS_PER_PAGE',
  GetSearchResult = 'MAIN/GET_SEARCH_RESULT',
  ClearSearchResult = 'MAIN/CLEAR_SEARCH_RESULT',
  GetFilterResult = 'MAIN/GET_FILTER_RESULT',
  GetFilterURLOptions = 'MAIN/GET_FILTER_URL_OPTIONS',
  GetMinPrice = 'MAIN/GET_MIN_PRICE',
  GetMaxPrice = 'MAIN/GET_MAX_PRICE',
}

export enum CatalogSort {
  Price = 'price',
  Rating = 'rating',
  None = 'none',
}

export enum CatalogSortOrder {
  Down = 'desc',
  Up = 'asc',
  None = 'none',
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
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
  FourStrings = '4-strings',
  SixStrings = '6-strings',
  SevenStrings = '7-strings',
  TwelveStrings = '12-strings',
}

export const SeachOperatorsBiased: SeachOperatorsBiasedType = {
  [SeachOptions.PriceMin]: SeachOperators.MinPrice,
  [SeachOptions.PriceMax]: SeachOperators.MaxPrice,
  [SeachOptions.Acoustic]: SeachOperators.TypeAcoustic,
  [SeachOptions.Electric]: SeachOperators.TypeElectric,
  [SeachOptions.Ukulele]: SeachOperators.TypeUkulele,
  [SeachOptions.FourStrings]: SeachOperators.FourStrings,
  [SeachOptions.SixStrings]: SeachOperators.SixStrings,
  [SeachOptions.SevenStrings]: SeachOperators.SevenStrings,
  [SeachOptions.TwelveStrings]: SeachOperators.TwelveStrings,
} as const;

export const NUMBER_OF_CARDS = 9;

export const ERROR_MESSAGE = 'Не удалось загрузить данные каталога. Попробуйте еще раз позже';

export enum EmptyCatalogMessage {
  Loading = 'Загружаем...',
  ConnectionError = 'Не удалось загрузить каталог. Проверьте подключение к интернету.',
}
