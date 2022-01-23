import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { getFilterUrlOptionsSelector, getPriceFilterSettings } from '../../store/selectors';
import { SeachOperatorsBiased, SeachOptions } from '../../const/const';
import { FilterSettingsType, SeachOptionsType } from '../../types/types';
import { useHistory, useLocation } from 'react-router-dom';
import { formSearchRequest, getFilterParams } from '../../utils/utils';

function CatalogFilters(): JSX.Element {

  const priceRangeSettings: FilterSettingsType | undefined = useSelector(getPriceFilterSettings());

  const history = useHistory();
  const { search } = useLocation();
  const filterURLOptions: SeachOptionsType = useSelector(getFilterUrlOptionsSelector);

  const [searchRequest, setSearchRequest] = useState<string>('');
  const debouncedSearchRequest: string = useDebounce<string>(searchRequest, 1000);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const [disabledStringCount, setDisabledStringCount] = useState({
    [SeachOptions.FOUR_STRINGS]: false,
    [SeachOptions.SIX_STRINGS]: false,
    [SeachOptions.SEVEN_STRINGS]: false,
    [SeachOptions.TWELVE_STRINGS]: false,
  });

  const [formState, setFormState] = useState<SeachOptionsType>(filterURLOptions);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === SeachOptions.PRICE_MIN) {
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

    if (evt.target.name === SeachOptions.PRICE_MAX) {
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
    if(evt.target.name === SeachOptions.PRICE_MIN) {
      let minValue = evt.target.value;
      if (priceRangeSettings?.minPrice && parseInt(minValue, 10) < priceRangeSettings.minPrice) {
        minValue = priceRangeSettings.minPrice.toString();
      }
      if (priceRangeSettings?.maxPrice && parseInt(minValue, 10) > priceRangeSettings.maxPrice) {
        minValue = priceRangeSettings.maxPrice.toString();
      }
      if (parseInt(minValue, 10) > parseInt(maxPrice, 10)) {
        minValue = maxPrice;
      }
      setMinPrice(minValue);
      setFormState({...formState, [SeachOptions.PRICE_MIN]: minValue});
    } else if (evt.target.name === SeachOptions.PRICE_MAX) {
      let maxValue = evt.target.value;
      if (priceRangeSettings?.maxPrice && parseInt(maxValue, 10) > priceRangeSettings.maxPrice) {
        maxValue = priceRangeSettings.maxPrice.toString();
      }
      if (priceRangeSettings?.minPrice && parseInt(maxValue, 10) < priceRangeSettings.minPrice) {
        maxValue = priceRangeSettings.minPrice.toString();
      }
      if (parseInt(maxValue, 10) < parseInt(minPrice, 10)) {
        maxValue = minPrice;
      }
      setMaxPrice(maxValue);
      setFormState({...formState, [SeachOptions.PRICE_MAX]: maxValue});
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
      [SeachOptions.FOUR_STRINGS]: formState[SeachOptions.ACOUSTIC] && !formState[SeachOptions.ELECTRIC] && !formState[SeachOptions.UKULELE],
      [SeachOptions.SIX_STRINGS]: formState[SeachOptions.UKULELE] && !formState[SeachOptions.ELECTRIC] && !formState[SeachOptions.ACOUSTIC],
      [SeachOptions.SEVEN_STRINGS]: formState[SeachOptions.UKULELE] && !formState[SeachOptions.ELECTRIC] && !formState[SeachOptions.ACOUSTIC],
      [SeachOptions.TWELVE_STRINGS]: (formState[SeachOptions.UKULELE] || formState[SeachOptions.ELECTRIC]) && !formState[SeachOptions.ACOUSTIC],
    });
  }, [formState]);

  useEffect(
    () => {
      const validSearchRequest = Object.entries(formState).filter((item) => item[1]).map((item) => item[0]);
      setSearchRequest(validSearchRequest.map((item) => {
        if (item === SeachOptions.PRICE_MIN) {
          return SeachOperatorsBiased[item] + formState[SeachOptions.PRICE_MIN];
        } else if (item === SeachOptions.PRICE_MAX) {
          return SeachOperatorsBiased[item] + formState[SeachOptions.PRICE_MAX];
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

  return (
    <form className="catalog-filter" >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={ priceRangeSettings?.minPrice.toString()} id="priceMin" name={SeachOptions.PRICE_MIN} value={ minPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={ priceRangeSettings?.maxPrice.toString() } id="priceMax" name={SeachOptions.PRICE_MAX} value={ maxPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name={SeachOptions.ACOUSTIC} onChange={ handleFormChange } checked={formState[SeachOptions.ACOUSTIC]}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name={SeachOptions.ELECTRIC} onChange={ handleFormChange } checked={formState[SeachOptions.ELECTRIC]}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name={SeachOptions.UKULELE} onChange={ handleFormChange } checked={formState[SeachOptions.UKULELE]}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name={SeachOptions.FOUR_STRINGS} disabled={ disabledStringCount[SeachOptions.FOUR_STRINGS] } onChange={ handleFormChange } checked={formState[SeachOptions.FOUR_STRINGS]}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name={SeachOptions.SIX_STRINGS} disabled={ disabledStringCount[SeachOptions.SIX_STRINGS] } onChange={ handleFormChange } checked={formState[SeachOptions.SIX_STRINGS]}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name={SeachOptions.SEVEN_STRINGS} disabled={ disabledStringCount[SeachOptions.SEVEN_STRINGS] } onChange={ handleFormChange } checked={formState[SeachOptions.SEVEN_STRINGS]}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name={SeachOptions.TWELVE_STRINGS} disabled={ disabledStringCount[SeachOptions.TWELVE_STRINGS] } onChange={ handleFormChange } checked={formState[SeachOptions.TWELVE_STRINGS]}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilters;
