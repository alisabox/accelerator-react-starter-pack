import { combineReducers } from 'redux';
import { filterReducer } from './filter/filter-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';

export enum NameSpace {
  Guitars = 'Guitars',
  Filter = 'Filter',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsReducer,
  [NameSpace.Filter]: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
