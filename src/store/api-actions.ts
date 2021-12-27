import { APIRoute } from '../const/const';
import { ThunkActionResult, GuitarAndCommentsType, GuitarType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult } from './actions';

export const fetchGuitarsAndCommentsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.GUITARS}?_embed=comments`);
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

