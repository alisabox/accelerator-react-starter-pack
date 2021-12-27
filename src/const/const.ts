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
