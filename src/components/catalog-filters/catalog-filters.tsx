import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SeachOperators } from '../../const/const';
import { useDebounce } from '../../hooks/useDebounce';
import { getFilterSettings } from '../../store/selectors';
import { FilterSettingsType } from '../../types/types';

function CatalogFilters(): JSX.Element {

  const filterSettings: FilterSettingsType | undefined = useSelector(getFilterSettings());

  const history = useHistory();

  const [searchRequest, setSearchRequest] = useState<string>('');
  const debouncedSearchRequest: string = useDebounce<string>(searchRequest, 1000);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);
  const acoustic = useRef<HTMLInputElement | null>(null);
  const electric = useRef<HTMLInputElement | null>(null);
  const ukulele = useRef<HTMLInputElement | null>(null);
  const fourStrings = useRef<HTMLInputElement | null>(null);
  const sixStrings = useRef<HTMLInputElement | null>(null);
  const sevenStrings = useRef<HTMLInputElement | null>(null);
  const twelveStrings = useRef<HTMLInputElement | null>(null);

  const handlePriceChange = (): void => {
    if(minPriceRef.current?.value) {
      if (parseInt(minPriceRef.current.value, 10) < 0) {
        setMinPrice('0');
      } else {
        setMinPrice(minPriceRef.current.value);
      }
    } else {
      setMinPrice('');
    }

    if (maxPriceRef.current?.value) {
      if (parseInt(maxPriceRef.current.value, 10) < 0) {
        setMaxPrice('0');
      } else {
        setMaxPrice(maxPriceRef.current.value);
      }
    } else {
      setMaxPrice('');
    }
  };

  const handleFormChange = (): void => {
    const searchItems: string[] = [];
    if(minPriceRef.current?.value) {
      let minValue = minPriceRef.current.value;
      if (filterSettings?.minPrice && parseInt(minValue, 10) < filterSettings.minPrice) {
        minValue = filterSettings.minPrice.toString();
      }
      if (filterSettings?.maxPrice && parseInt(minValue, 10) > filterSettings.maxPrice) {
        minValue = filterSettings.maxPrice.toString();
      }
      if (parseInt(minValue, 10) > parseInt(maxPrice, 10)) {
        minValue = maxPrice;
      }
      setMinPrice(minValue);
      searchItems.push(SeachOperators.MinPrice + minValue);
    }
    if (maxPriceRef.current?.value) {
      let maxValue = maxPriceRef.current.value;
      if (filterSettings?.maxPrice && parseInt(maxValue, 10) > filterSettings.maxPrice) {
        maxValue = filterSettings.maxPrice.toString();
      }
      if (filterSettings?.minPrice && parseInt(maxValue, 10) < filterSettings.minPrice) {
        maxValue = filterSettings.minPrice.toString();
      }
      if (parseInt(maxValue, 10) < parseInt(minPrice, 10)) {
        maxValue = minPrice;
      }
      setMaxPrice(maxValue);
      searchItems.push(SeachOperators.MaxPrice + maxValue);
    }
    if (acoustic.current?.checked) {
      searchItems.push(SeachOperators.TypeAcoustic);
    }
    if (electric.current?.checked) {
      searchItems.push(SeachOperators.TypeElectric);
    }
    if (ukulele.current?.checked) {
      searchItems.push(SeachOperators.TypeUkulele);
    }
    if (fourStrings.current?.checked) {
      searchItems.push(SeachOperators.FourStrings);
    }
    if (sixStrings.current?.checked) {
      searchItems.push(SeachOperators.SixStrings);
    }
    if (sevenStrings.current?.checked) {
      searchItems.push(SeachOperators.SevenStrings);
    }
    if (twelveStrings.current?.checked) {
      searchItems.push(SeachOperators.TwelveStrings);
    }
    setSearchRequest(searchItems.join('&'));
  };

  useEffect(
    () => {
      if (debouncedSearchRequest) {
        history.push(`?${debouncedSearchRequest}`);
      } else {
        history.push('');
      }
    },
    [debouncedSearchRequest],
  );

  return (
    <form className="catalog-filter" >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={ filterSettings?.minPrice.toString()} id="priceMin" name="от" ref={ minPriceRef } value={ minPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={ filterSettings?.maxPrice.toString() } id="priceMax" name="до" ref={ maxPriceRef } value={ maxPrice } onChange={ handlePriceChange } onBlur={ handleFormChange }/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" ref={ acoustic } onChange={ handleFormChange }/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" ref={ electric } onChange={ handleFormChange }/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" ref={ ukulele } onChange={ handleFormChange }/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" ref={ fourStrings } disabled={ !filterSettings || !filterSettings.stringCount.includes(4) } onChange={ handleFormChange }/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" ref={ sixStrings } disabled={ !filterSettings || !filterSettings.stringCount.includes(6) } onChange={ handleFormChange }/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" ref={ sevenStrings } disabled={ !filterSettings || !filterSettings.stringCount.includes(7) } onChange={ handleFormChange }/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" ref={ twelveStrings } disabled={ !filterSettings || !filterSettings.stringCount.includes(12) } onChange={ handleFormChange }/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilters;
