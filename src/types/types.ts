import { Action } from 'redux';
import { ThunkAction}  from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootState } from '../store/reducer';

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

export type GuitarAndCommentsType = GuitarType & {
  comments: CommentType[],
}

export type initialStateType = {
  guitarsAndComments: GuitarAndCommentsType[],
  searchResult: GuitarType[],
}

export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
