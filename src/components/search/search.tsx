import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchSearchResultAction } from '../../store/api-actions';
import { getSearchResultSelector } from '../../store/selectors';
import { GuitarType } from '../../types/types';

function Search(): JSX.Element {

  const searchResult: GuitarType[] = useSelector(getSearchResultSelector);

  const dispatch = useDispatch();

  const [searchedName, setSearchedName] = useState<string>('');
  const debouncedSearchName: string = useDebounce<string>(searchedName, 500);

  const handleInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(evt.target.value);
  };

  useEffect(
    () => {
      if (debouncedSearchName === '') {
        dispatch(fetchSearchResultAction(null));
      } else {
        dispatch(fetchSearchResultAction(debouncedSearchName));
      }
    },
    [debouncedSearchName],
  );

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={ handleInput }
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${searchResult.length > 0 ? '' : 'hidden'}`}>
        {
          searchResult.length > 0
            ? searchResult.map((result) => <li className="form-search__select-item" tabIndex={0} key={ result.id }>{ result.name }</li>)
            : ''
        }
      </ul>
    </div>
  );
}

export default Search;
