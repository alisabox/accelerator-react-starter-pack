import { State, GuitarAndCommentsType, GuitarType } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getGuitarsAndCommentsSelector = (state: State): GuitarAndCommentsType[] => state[NameSpace.Guitars].guitarsAndComments;
export const getGuitarsPerPageSelector = (state: State): GuitarAndCommentsType[] => state[NameSpace.Guitars].guitarsPerPage;
export const getSearchResultSelector = (state: State): GuitarType[] => state[NameSpace.Guitars].searchResult;
