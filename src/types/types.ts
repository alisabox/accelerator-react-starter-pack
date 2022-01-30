import { Action } from 'redux';
import { ThunkAction}  from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/reducers/root-reducer';
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

export type guitarsStateType = {
  guitarsAndComments: GuitarAndCommentsType[],
  guitarsPerPage: GuitarAndCommentsType[],
  searchResult: GuitarType[],
}

export type filterStateType = {
  filterURLOptions: SeachOptionsType,
  minPrice?: number,
  maxPrice?: number,
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
  [SeachOptions.PriceMin]: string,
  [SeachOptions.PriceMax]: string,
  [SeachOptions.Acoustic]: boolean,
  [SeachOptions.Electric]: boolean,
  [SeachOptions.Ukulele]: boolean,
  [SeachOptions.FourStrings]: boolean,
  [SeachOptions.SixStrings]: boolean,
  [SeachOptions.SevenStrings]: boolean,
  [SeachOptions.TwelveStrings]: boolean,
}

export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ReselectType<S> = (state: State) => S;
