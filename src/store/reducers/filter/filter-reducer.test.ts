import { filterReducer, initialState } from './filter-reducer';
import { getFilterURLOptions, getMaxPrice, getMinPrice } from '../../actions';
import { SeachOptions } from '../../../const/const';

describe('Reducer', () => {

  it('should update filterURLOptions on filter change', () => {
    const state = {
      ...initialState,
    };

    const updatedFilter = {
      [SeachOptions.PriceMin]: '',
      [SeachOptions.PriceMax]: '',
      [SeachOptions.Acoustic]: true,
      [SeachOptions.Electric]: false,
      [SeachOptions.Ukulele]: false,
      [SeachOptions.FourStrings]: true,
      [SeachOptions.SixStrings]: false,
      [SeachOptions.SevenStrings]: false,
      [SeachOptions.TwelveStrings]: false,
    };

    expect(filterReducer(state, getFilterURLOptions(updatedFilter)))
      .toEqual({
        ...initialState,
        filterURLOptions: {
          [SeachOptions.PriceMin]: '',
          [SeachOptions.PriceMax]: '',
          [SeachOptions.Acoustic]: true,
          [SeachOptions.Electric]: false,
          [SeachOptions.Ukulele]: false,
          [SeachOptions.FourStrings]: true,
          [SeachOptions.SixStrings]: false,
          [SeachOptions.SevenStrings]: false,
          [SeachOptions.TwelveStrings]: false,
        },
      });
  });

  it('should update minPrice', () => {
    const state = {
      ...initialState,
      minPrice: undefined,
    };

    expect(filterReducer(state, getMinPrice(1000)))
      .toEqual({
        ...initialState,
        minPrice: 1000,
      });
  });

  it('should update maxPrice', () => {
    const state = {
      ...initialState,
      maxPrice: undefined,
    };

    expect(filterReducer(state, getMaxPrice(70000)))
      .toEqual({
        ...initialState,
        maxPrice: 70000,
      });
  });
});
