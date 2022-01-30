import { createReducer } from '@reduxjs/toolkit';
import { SeachOptions } from '../../../const/const';
import { filterStateType } from '../../../types/types';
import { getFilterURLOptions, getMaxPrice, getMinPrice } from '../../actions';

export const initialState: filterStateType = {
  filterURLOptions: {
    [SeachOptions.PriceMin]: '',
    [SeachOptions.PriceMax]: '',
    [SeachOptions.Acoustic]: false,
    [SeachOptions.Electric]: false,
    [SeachOptions.Ukulele]: false,
    [SeachOptions.FourStrings]: false,
    [SeachOptions.SixStrings]: false,
    [SeachOptions.SevenStrings]: false,
    [SeachOptions.TwelveStrings]: false,
  },
  minPrice: undefined,
  maxPrice: undefined,
};

export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilterURLOptions, (state, action) => {
      state.filterURLOptions = action.payload.filterURLOptions;
    })
    .addCase(getMinPrice, (state, action) => {
      state.minPrice = action.payload.minPrice;
    })
    .addCase(getMaxPrice, (state, action) => {
      state.maxPrice = action.payload.maxPrice;
    });
});
