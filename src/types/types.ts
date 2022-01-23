import { Action } from 'redux';
import { ThunkAction}  from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/reducer';
import { SeachOptions } from '../const/const';

export type GuitarType = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
}

export type CommentType = {
  id: string;
  userName: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rating: number;
  createAt: Date;
  guitarId: number;
}

export type FilterSettingsType = {
  minPrice: number;
  maxPrice: number;
}

export type GuitarAndCommentsType = GuitarType & {
  comments: CommentType[],
}

export type initialStateType = {
  guitarsAndComments: GuitarAndCommentsType[],
  guitarsPerPage: GuitarAndCommentsType[],
  searchResult: GuitarType[],
  filterURLOptions: SeachOptionsType,
}

export type SeachOperatorsBiasedType = {
  [key: string]: string;
}

export type SortOperatorsType = {
  [key: string]: string;
}


export type FilterParamsType = {
  filters: string,
  sort: string,
  order: string,
  pageSearch: string,
  page: string,
}

export type SeachOptionsType = {
  [SeachOptions.PRICE_MIN]: string,
  [SeachOptions.PRICE_MAX]: string,
  [SeachOptions.ACOUSTIC]: boolean,
  [SeachOptions.ELECTRIC]: boolean,
  [SeachOptions.UKULELE]: boolean,
  [SeachOptions.FOUR_STRINGS]: boolean,
  [SeachOptions.SIX_STRINGS]: boolean,
  [SeachOptions.SEVEN_STRINGS]: boolean,
  [SeachOptions.TWELVE_STRINGS]: boolean,
}

export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ReselectType<S> = (state: State) => S;
