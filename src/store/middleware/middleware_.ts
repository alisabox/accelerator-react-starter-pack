import { Middleware } from 'redux';
import { State } from '../../types/types';

export const redirect: Middleware<unknown, State> =
(_store) =>
  (next) =>
    (action) => {
      return next(action);
    };