import { toast } from 'react-toastify';
import { APIRoute, ERROR_MESSAGE } from '../const/const';
import { ThunkActionResult, GuitarAndCommentsType, GuitarType } from '../types/types';
import { getGuitarsAndComments, getSearchResult, clearSearchResult, getGuitarsPerPage, getMinPrice, getMaxPrice } from './actions';

export const fetchGuitarsAndCommentsAction = (input: string | null = null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.Guitars}?_embed=comments${input ? `&${input}` : ''}`);
    dispatch(getGuitarsAndComments(data));
  };

export const fetchSearchResultAction = (input: string | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    if (input) {
      const {data} = await api.get<GuitarType[]>(`${APIRoute.Guitars}?name_like=${input}`);
      dispatch(getSearchResult(data));
    } else {
      dispatch(clearSearchResult());
    }
  };

export const fetchGuitarsPerPage = (input: string | null): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.Guitars}?_embed=comments&${input ? input : '_start=1&_limit=9'}`);
      dispatch(getGuitarsPerPage(data));
    } catch (error) {
      toast.info(ERROR_MESSAGE);
    }
  };

export const fetchPrice = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<GuitarAndCommentsType[]>(`${APIRoute.Guitars}?_sort=price`);
    dispatch(getMinPrice(data[0].price));
    dispatch(getMaxPrice(data[data.length - 1].price));
  };
