import { useDispatch, useSelector } from 'react-redux';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Card from '../card/card';
import Pagination from '../pagination/pagination';
import { getGuitarsPerPageSelector } from '../../store/selectors';
import { GuitarAndCommentsType } from '../../types/types';
import { useEffect, useState } from 'react';
import { CatalogSort, CatalogSortOperators, CatalogSortOrder } from '../../const/const';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchGuitarsAndCommentsAction, fetchGuitarsPerPage } from '../../store/api-actions';

const NUMBER_OF_CARDS = 9;

function Catalog(): JSX.Element {

  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const guitars: GuitarAndCommentsType[] = useSelector(getGuitarsPerPageSelector);

  const [catalogSort, setCatalogSort] = useState<CatalogSort>(CatalogSort.None);
  const [catalogSortOrder, setCatalogSortOrder] = useState<CatalogSortOrder>(CatalogSortOrder.None);

  useEffect(() => {
    if (catalogSort !== CatalogSort.None || catalogSortOrder !== CatalogSortOrder.None) {
      let sort = '';
      if (CatalogSortOperators[catalogSort] && CatalogSortOperators[catalogSortOrder]) {
        sort = `${CatalogSortOperators[catalogSort]}&${CatalogSortOperators[catalogSortOrder]}`;
      } else {
        sort = CatalogSortOperators[catalogSort] || CatalogSortOperators[catalogSortOrder];
      }

      if (search) {
        const nonPageFilters = search?.substring(1).split('&').filter((item) => item.split('=')[0] !== 'page' && item.split('=')[0] !== '_sort' && item.split('=')[0] !== '_order').join('&');
        const pageFilter = search?.substring(1).split('&').filter((item) => item.split('=')[0] === 'page').join();
        history.push(`?${nonPageFilters ? `${nonPageFilters}&` : ''}${sort}&${pageFilter ? `${pageFilter}` : ''}`);
      } else {
        history.push(`?${sort}`);
      }
    }
  }, [catalogSort, catalogSortOrder]);

  useEffect(
    () => {
      const nonPageFilters = search?.substring(1).split('&').filter((item) => item.split('=')[0] !== 'page').join('&');
      const currentPage = parseInt(search?.substring(1).split('&').filter((item) => item.split('=')[0] === 'page').join().split('=')[1], 10);
      const pageFilter = `${currentPage > 1 ? `_start=${(currentPage - 1) * NUMBER_OF_CARDS + 1}&_limit=9` : '_start=1&_limit=9'}`;
      if (nonPageFilters) {
        dispatch(fetchGuitarsAndCommentsAction(nonPageFilters));
        dispatch(fetchGuitarsPerPage(`${nonPageFilters}&${pageFilter}`));
      } else {
        dispatch(fetchGuitarsAndCommentsAction());
        dispatch(fetchGuitarsPerPage(pageFilter));
      }
    },
    [search, catalogSort],
  );

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
                onClick={() => setCatalogSort(CatalogSort.Price)}
                aria-label="по цене"
              >
                по цене
              </button>
              <button
                className={`catalog-sort__type-button ${catalogSort === CatalogSort.Rating ? 'catalog-sort__type-button--active' : ''}`}
                tabIndex={catalogSort === CatalogSort.Rating ? -1 : undefined}
                onClick={() => setCatalogSort(CatalogSort.Rating)}
                aria-label="по популярности"
              >
                по популярности
              </button>
            </div>
            <div className="catalog-sort__order">
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--up ${catalogSortOrder === CatalogSortOrder.Up ? 'catalog-sort__order-button--active' : ''}`}
                tabIndex={catalogSortOrder === CatalogSortOrder.Up ? -1 : undefined}
                onClick={() => setCatalogSortOrder(CatalogSortOrder.Up)}
                aria-label="По возрастанию"
              >
              </button>
              <button
                className={`catalog-sort__order-button catalog-sort__order-button--down ${catalogSortOrder === CatalogSortOrder.Down ? 'catalog-sort__order-button--active' : ''}`}
                tabIndex={catalogSortOrder === CatalogSortOrder.Down ? -1 : undefined}
                onClick={() => setCatalogSortOrder(CatalogSortOrder.Down)}
                aria-label="По убыванию"
              >
              </button>
            </div>
          </div>
          <div className="cards catalog__cards">

            {
              guitars.length > 0
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
