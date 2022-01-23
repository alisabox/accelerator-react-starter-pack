import { CatalogSort, CatalogSortOperators, CatalogSortOrder, NUMBER_OF_CARDS, SeachOperators, SeachOperatorsBiased, SeachOptions } from '../const/const';
import { FilterParamsType, SeachOptionsType } from '../types/types';

export const getFilterParams = (search: string): FilterParamsType => {
  if (search.substring(0,1) === '?') {
    search = search.substring(1);
  }

  const searchParams: FilterParamsType = {
    filters: '',
    sort: '',
    order: '',
    pageSearch: '',
    page: '',
  };

  search.split('&').forEach((param: string) => {
    switch(true) {
      case param.includes('page'):
        searchParams.page = param.split('=')[1];
        searchParams.pageSearch = parseInt(param.split('=')[1], 10) > 1
          ? `_start=${(parseInt(param.split('=')[1], 10) - 1) * NUMBER_OF_CARDS + 1}&_limit=${NUMBER_OF_CARDS}`
          : `_start=1&_limit=${NUMBER_OF_CARDS}`;
        break;
      case param.includes(CatalogSortOperators[CatalogSort.Price]):
      case param.includes(CatalogSortOperators[CatalogSort.Rating]):
        searchParams.sort = searchParams.sort
          ? `${searchParams.sort}&${param}`
          : param;
        break;
      case param.includes(CatalogSortOperators[CatalogSortOrder.Down]):
      case param.includes(CatalogSortOperators[CatalogSortOrder.Up]):
        searchParams.order = searchParams.order
          ? `${searchParams.order}&${param}`
          : param;
        break;
      case Object.values(SeachOperators).some((operator) => param.includes(operator)):
        searchParams.filters = searchParams.filters
          ? `${searchParams.filters}&${param}`
          : param;
        break;
    }
  });

  return searchParams;
};

export const splitSearchUrlByOptions = (searchUrl: string): SeachOptionsType => {
  const searchList = searchUrl.substring(1).split('&');
  const minSearchedPrice = searchList.find((item) => item.indexOf(SeachOperatorsBiased[SeachOptions.PRICE_MIN]) >= 0)?.substring(10) || '';
  const maxSearchedPrice = searchList.find((item) => item.indexOf(SeachOperatorsBiased[SeachOptions.PRICE_MAX]) >= 0)?.substring(10) || '';
  return {
    [SeachOptions.PRICE_MIN]: minSearchedPrice,
    [SeachOptions.PRICE_MAX]: maxSearchedPrice,
    [SeachOptions.ACOUSTIC]: searchList.includes(SeachOperatorsBiased[SeachOptions.ACOUSTIC]),
    [SeachOptions.ELECTRIC]: searchList.includes(SeachOperatorsBiased[SeachOptions.ELECTRIC]),
    [SeachOptions.UKULELE]: searchList.includes(SeachOperatorsBiased[SeachOptions.UKULELE]),
    [SeachOptions.FOUR_STRINGS]: searchList.includes(SeachOperatorsBiased[SeachOptions.FOUR_STRINGS]),
    [SeachOptions.SIX_STRINGS]: searchList.includes(SeachOperatorsBiased[SeachOptions.SIX_STRINGS]),
    [SeachOptions.SEVEN_STRINGS]: searchList.includes(SeachOperatorsBiased[SeachOptions.SEVEN_STRINGS]),
    [SeachOptions.TWELVE_STRINGS]: searchList.includes(SeachOperatorsBiased[SeachOptions.TWELVE_STRINGS]),
  };
};

export const formSearchRequest = (filters: string[]): string => filters.filter((item) => item).join('&');

export const transformUrlToRequestWithSortAndPage = (url: string): string => {
  const params = getFilterParams(url);
  params.page = params.page || '1';
  return formSearchRequest([params.filters, params.order, params.sort, `_start=${params.page}&_limit=9`]);
};

export const transformUrlToRequest = (url: string): string => {
  const params = getFilterParams(url);
  return formSearchRequest([params.filters]);
};
