import { State, SeachOptionsType } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getFilterUrlOptionsSelector = (state: State): SeachOptionsType => state[NameSpace.Filter].filterURLOptions;
export const getMinPriceSelector = (state: State): number | undefined => state[NameSpace.Filter].minPrice;
export const getMaxPriceSelector = (state: State): number | undefined => state[NameSpace.Filter].maxPrice;
