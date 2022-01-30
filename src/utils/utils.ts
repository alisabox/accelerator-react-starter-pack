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
          ? `_start=${(parseInt(param.split('=')[1], 10) - 1) * NUMBER_OF_CARDS}&_limit=${NUMBER_OF_CARDS}`
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
  const minSearchedPrice = searchList.find((item) => item.indexOf(SeachOperatorsBiased[SeachOptions.PriceMin]) >= 0)?.substring(10) || '';
  const maxSearchedPrice = searchList.find((item) => item.indexOf(SeachOperatorsBiased[SeachOptions.PriceMax]) >= 0)?.substring(10) || '';
  const searchParams = {
    [SeachOptions.PriceMin]: minSearchedPrice,
    [SeachOptions.PriceMax]: maxSearchedPrice,
    [SeachOptions.Acoustic]: searchList.includes(SeachOperatorsBiased[SeachOptions.Acoustic]),
    [SeachOptions.Electric]: searchList.includes(SeachOperatorsBiased[SeachOptions.Electric]),
    [SeachOptions.Ukulele]: searchList.includes(SeachOperatorsBiased[SeachOptions.Ukulele]),
    [SeachOptions.FourStrings]: searchList.includes(SeachOperatorsBiased[SeachOptions.FourStrings]),
    [SeachOptions.SixStrings]: searchList.includes(SeachOperatorsBiased[SeachOptions.SixStrings]),
    [SeachOptions.SevenStrings]: searchList.includes(SeachOperatorsBiased[SeachOptions.SevenStrings]),
    [SeachOptions.TwelveStrings]: searchList.includes(SeachOperatorsBiased[SeachOptions.TwelveStrings]),
  };
  return {
    ...searchParams,
    [SeachOptions.FourStrings]:
      searchParams[SeachOptions.FourStrings] &&
      !(searchParams[SeachOptions.Acoustic] &&
      !searchParams[SeachOptions.Electric] &&
      !searchParams[SeachOptions.Ukulele]),
    [SeachOptions.SixStrings]:
      searchParams[SeachOptions.SixStrings] &&
      !(searchParams[SeachOptions.Ukulele] &&
      !searchParams[SeachOptions.Electric] &&
      !searchParams[SeachOptions.Acoustic]),
    [SeachOptions.SevenStrings]:
      searchParams[SeachOptions.SevenStrings] &&
      !(searchParams[SeachOptions.Ukulele] &&
      !searchParams[SeachOptions.Electric] &&
      !searchParams[SeachOptions.Acoustic]),
    [SeachOptions.TwelveStrings]:
      searchParams[SeachOptions.TwelveStrings] &&
      !(
        (searchParams[SeachOptions.Ukulele] ||
        searchParams[SeachOptions.Electric]) &&
        !searchParams[SeachOptions.Acoustic]
      ),
  };
};

export const formSearchRequest = (filters: string[]): string => filters.filter((item) => item).join('&');

export const transformUrlToRequestWithSortAndPage = (url: string): string => {
  const params = getFilterParams(url);
  params.page = params.page || '1';
  return formSearchRequest([
    params.filters, params.order, params.sort,
    `_start=${(parseInt(params.page, 10) - 1) * NUMBER_OF_CARDS}&_limit=${NUMBER_OF_CARDS}`,
  ]);
};

export const transformUrlToRequest = (url: string): string => {
  const params = getFilterParams(url);
  return formSearchRequest([params.filters]);
};
