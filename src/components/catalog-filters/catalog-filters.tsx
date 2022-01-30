import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { SeachOperatorsBiased, SeachOptions } from '../../const/const';
import { filterStateType, SeachOptionsType } from '../../types/types';
import { useHistory, useLocation } from 'react-router-dom';
import { formSearchRequest, getFilterParams } from '../../utils/utils';
import { getFilterUrlOptionsSelector, getMinPriceSelector, getMaxPriceSelector } from '../../store/reducers/filter/filter-selectors';
import { fetchPrice } from '../../store/api-actions';

function CatalogFilters(): JSX.Element {
  const dispatch = useDispatch();

  const priceRangeSettings: Omit<filterStateType, 'filterURLOptions'> = {
    minPrice: useSelector(getMinPriceSelector),
    maxPrice: useSelector(getMaxPriceSelector),
  };

  const history = useHistory();
  const { search } = useLocation();
  const filterURLOptions: SeachOptionsType = useSelector(getFilterUrlOptionsSelector);

  const [searchRequest, setSearchRequest] = useState<string>('');
  const debouncedSearchRequest: string = useDebounce<string>(searchRequest, 1000);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const [disabledStringCount, setDisabledStringCount] = useState({
    [SeachOptions.FourStrings]: false,
    [SeachOptions.SixStrings]: false,
    [SeachOptions.SevenStrings]: false,
    [SeachOptions.TwelveStrings]: false,
  });

  const [formState, setFormState] = useState<SeachOptionsType>(filterURLOptions);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === SeachOptions.PriceMin) {
      if (evt.target.value) {
        if (parseInt(evt.target.value, 10) < 0) {
          setMinPrice('0');
        } else {
          setMinPrice(evt.target.value);
        }
      } else {
        setMinPrice('');
      }
    }

    if (evt.target.name === SeachOptions.PriceMax) {
      if (evt.target.value) {
        if (parseInt(evt.target.value, 10) < 0) {
          setMaxPrice('0');
        } else {
          setMaxPrice(evt.target.value);
        }
      } else {
        setMaxPrice('');
      }
    }
  };

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === SeachOptions.PriceMin) {
      let minValue = evt.target.value;
      if (priceRangeSettings.minPrice && parseInt(minValue, 10) < priceRangeSettings.minPrice) {
        minValue = priceRangeSettings.minPrice.toString();
      }
      if (priceRangeSettings.maxPrice && parseInt(minValue, 10) > priceRangeSettings.maxPrice) {
        minValue = priceRangeSettings.maxPrice.toString();
      }
      if (parseInt(minValue, 10) > parseInt(maxPrice, 10)) {
        minValue = maxPrice;
      }
      setMinPrice(minValue);
      setFormState({...formState, [SeachOptions.PriceMin]: minValue});
    } else if (evt.target.name === SeachOptions.PriceMax) {
      let maxValue = evt.target.value;
      if (priceRangeSettings.maxPrice && parseInt(maxValue, 10) > priceRangeSettings.maxPrice) {
        maxValue = priceRangeSettings.maxPrice.toString();
      }
      if (priceRangeSettings.minPrice && parseInt(maxValue, 10) < priceRangeSettings.minPrice) {
        maxValue = priceRangeSettings.minPrice.toString();
      }
      if (parseInt(maxValue, 10) < parseInt(minPrice, 10)) {
        maxValue = minPrice;
      }
      setMaxPrice(maxValue);
      setFormState({...formState, [SeachOptions.PriceMax]: maxValue});
    } else {
      if (evt.target.checked) {
        setFormState({...formState, [evt.target.name]: true});
      } else {
        setFormState({...formState, [evt.target.name]: false});
      }
    }
  };

  useEffect(() => {
    setDisabledStringCount({
      [SeachOptions.FourStrings]: formState[SeachOptions.Acoustic] && !formState[SeachOptions.Electric] && !formState[SeachOptions.Ukulele],
      [SeachOptions.SixStrings]: formState[SeachOptions.Ukulele] && !formState[SeachOptions.Electric] && !formState[SeachOptions.Acoustic],
      [SeachOptions.SevenStrings]: formState[SeachOptions.Ukulele] && !formState[SeachOptions.Electric] && !formState[SeachOptions.Acoustic],
      [SeachOptions.TwelveStrings]: (formState[SeachOptions.Ukulele] || formState[SeachOptions.Electric]) && !formState[SeachOptions.Acoustic],
    });
  }, [formState]);

  useEffect(
    () => {
      const validSearchRequest = Object.entries(formState).filter((item) => item[1]).map((item) => item[0]);
      setSearchRequest(validSearchRequest.map((item) => {
        if (item === SeachOptions.PriceMin) {
          return SeachOperatorsBiased[item] + formState[SeachOptions.PriceMin];
        } else if (item === SeachOptions.PriceMax) {
          return SeachOperatorsBiased[item] + formState[SeachOptions.PriceMax];
        } else {
          return SeachOperatorsBiased[item];
        }
      }).join('&'));
    }, [formState]);

  useEffect(
    () => {
      const filterParams = getFilterParams(search);
      const searchUrlRequest = formSearchRequest([debouncedSearchRequest, filterParams.sort, filterParams.order, filterParams.page]);
      history.push(`?${searchUrlRequest}`);
    }, [debouncedSearchRequest, history, search]);

  useEffect(() => {
    setFormState(filterURLOptions);
  }, [filterURLOptions]);

  useEffect(() => {
    dispatch(fetchPrice());
  }, [dispatch]);

  return (
    <form className="catalog-filter" >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={ priceRangeSettings.minPrice?.toString()} id="priceMin" name={SeachOptions.PriceMin} value={ minPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={ priceRangeSettings.maxPrice?.toString() } id="priceMax" name={SeachOptions.PriceMax} value={ maxPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name={SeachOptions.Acoustic} onChange={ handleFormChange } checked={formState[SeachOptions.Acoustic]}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name={SeachOptions.Electric} onChange={ handleFormChange } checked={formState[SeachOptions.Electric]}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name={SeachOptions.Ukulele} onChange={ handleFormChange } checked={formState[SeachOptions.Ukulele]}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name={SeachOptions.FourStrings} disabled={ disabledStringCount[SeachOptions.FourStrings] } onChange={ handleFormChange } checked={formState[SeachOptions.FourStrings]}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name={SeachOptions.SixStrings} disabled={ disabledStringCount[SeachOptions.SixStrings] } onChange={ handleFormChange } checked={formState[SeachOptions.SixStrings]}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name={SeachOptions.SevenStrings} disabled={ disabledStringCount[SeachOptions.SevenStrings] } onChange={ handleFormChange } checked={formState[SeachOptions.SevenStrings]}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name={SeachOptions.TwelveStrings} disabled={ disabledStringCount[SeachOptions.TwelveStrings] } onChange={ handleFormChange } checked={formState[SeachOptions.TwelveStrings]}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilters;
