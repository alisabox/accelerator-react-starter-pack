import { useDispatch, useSelector } from 'react-redux';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Card from '../card/card';
import Pagination from '../pagination/pagination';
import { getGuitarsPerPageSelector } from '../../store/reducers/guitars/guitars-selectors';
import { GuitarAndCommentsType } from '../../types/types';
import { MouseEvent, useEffect, useState } from 'react';
import { CatalogSort, CatalogSortOperators, CatalogSortOrder, NUMBER_OF_CARDS } from '../../const/const';
import { getFilterURLOptions } from '../../store/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchGuitarsAndCommentsAction, fetchGuitarsPerPage } from '../../store/api-actions';
import { formSearchRequest, getFilterParams, splitSearchUrlByOptions, transformUrlToRequest, transformUrlToRequestWithSortAndPage } from '../../utils/utils';

function Catalog(): JSX.Element {

  const history = useHistory();
  const { search } = useLocation();
  const sort = getFilterParams(search).sort.split('=')[1];
  const order = getFilterParams(search).order.split('=')[1];

  const dispatch = useDispatch();

  useEffect(() => {
    history.push(search);
    dispatch(getFilterURLOptions(splitSearchUrlByOptions(search)));
    dispatch(fetchGuitarsAndCommentsAction(transformUrlToRequest(search)));
    dispatch(fetchGuitarsPerPage(transformUrlToRequestWithSortAndPage(search)));
  }, [dispatch, history, search]);

  const guitars: GuitarAndCommentsType[] = useSelector(getGuitarsPerPageSelector);

  const [catalogSort, setCatalogSort] = useState<CatalogSort | string>(sort || CatalogSort.None);
  const [catalogSortOrder, setCatalogSortOrder] = useState<CatalogSortOrder | string>(order || CatalogSortOrder.None);

  const handleCatalogSort = (evt: MouseEvent<HTMLButtonElement>): void => {
    const param: string = (evt.target as HTMLButtonElement).id;
    if (param === CatalogSort.Price || param === CatalogSort.Rating) {
      setCatalogSort(param);
      const filterParams = getFilterParams(search);
      const searchRequest = formSearchRequest([
        filterParams.filters,
        CatalogSortOperators[param],
        filterParams.order,
        filterParams.page,
      ]);
      history.push(`?${searchRequest}`);
    }
  };

  const handleCatalogSortOrder = (evt: MouseEvent<HTMLButtonElement>): void => {
    const param: string = (evt.target as HTMLButtonElement).id;
    if (param === CatalogSortOrder.Up || param === CatalogSortOrder.Down) {
      setCatalogSortOrder(param);
      const filterParams = getFilterParams(search);
      const searchRequest = formSearchRequest([
        filterParams.filters,
        filterParams.sort,
        CatalogSortOperators[param],
        filterParams.page,
      ]);
      history.push(`?${searchRequest}`);
    }
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link" href="/#">Каталог</a>
          </li>
        </ul>
        <div className="catalog">

          <CatalogFilters />

          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button
                className={`catalog-sort__type-button ${catalogSort === CatalogSort.Price ? 'catalog-sort__type-button--active' : ''}`}
                tabIndex={catalogSort === CatalogSort.Price ? -1 : undefined}
                id={CatalogSort.Price}
                onClick={handleCatalogSort}
                aria-label="по цене"
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${catalogSort === CatalogSort.Rating ? 'catalog-sort__type-button--active' : ''}`}
                tabIndex={catalogSort === CatalogSort.Rating ? -1 : undefined}
                id={CatalogSort.Rating}
                onClick={handleCatalogSort}
                aria-label="по популярности"
              >
                по популярности
              </button>
            </div>
            <div className="catalog-sort__order">
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${catalogSortOrder === CatalogSortOrder.Up ? 'catalog-sort__order-button--active' : ''}`}
                tabIndex={catalogSortOrder === CatalogSortOrder.Up ? -1 : undefined}
                id={CatalogSortOrder.Up}
                onClick={handleCatalogSortOrder}
                aria-label="По возрастанию"
              >
              </button>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${catalogSortOrder === CatalogSortOrder.Down ? 'catalog-sort__order-button--active' : ''}`}
                tabIndex={catalogSortOrder === CatalogSortOrder.Down ? -1 : undefined}
                id={CatalogSortOrder.Down}
                onClick={handleCatalogSortOrder}
                aria-label="По убыванию"
              >
              </button>
            </div>
          </div>
          <div className={`${guitars.length ? 'cards' : ''} catalog__cards`}>
            {
              guitars.length
                ? guitars.slice(0, NUMBER_OF_CARDS).map((guitar) => <Card key={ guitar.id } guitar={ guitar }/>)
                : 'Загружаем...'
            }
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Catalog;
