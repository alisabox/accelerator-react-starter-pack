import { APIRoute } from '../const/const';
import { ThunkActionResult, GuitarAndCommentsType, GuitarType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage } from './actions';

export const fetchGuitarsAndCommentsAction = (input: string | null = null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.GUITARS}?_embed=comments${input ? `&${input}` : ''}`);
    dispatch(getGuitarsAndComments(data));
  };

export const fetchSearchResultAction = (input: string | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    if (input) {
      const {data} = await api.get<GuitarType[]>(`${APIRoute.GUITARS}?name_like=${input}`);
      dispatch(getSearchResult(data));
    } else {
      dispatch(clearSearchResult());
    }
  };

export const fetchGuitarsPerPage = (input: string | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.GUITARS}?_embed=comments&${input ? input : '_start=1&_limit=9'}`);
    dispatch(getGuitarsPerPage(data));
  };
