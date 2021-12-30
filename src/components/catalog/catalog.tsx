import { useDispatch, useSelector } from 'react-redux';
import CatalogFilters from '../catalog-filters/catalog-filters';
import Card from '../card/card';
import { getGuitarsAndCommentsSelector } from '../../store/selectors';
import { GuitarAndCommentsType } from '../../types/types';
import { useEffect, useState } from 'react';
import { CatalogSort, CatalogSortOrder, sortGuitars } from '../../const/const';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchGuitarsAndCommentsAction } from '../../store/api-actions';

const NUMBER_OF_CARDS = 9;

function Catalog(): JSX.Element {

  const guitars: GuitarAndCommentsType[] = useSelector(getGuitarsAndCommentsSelector);

  const [sortedGuitars, setSortedGuitars] = useState<GuitarAndCommentsType[]>(guitars);
  const [catalogSort, setCatalogSort] = useState<CatalogSort>(CatalogSort.None);
  const [catalogSortOrder, setCatalogSortOrder] = useState<CatalogSortOrder>(CatalogSortOrder.None);

  useEffect(() => {
    if (catalogSort !== CatalogSort.None || catalogSortOrder !== CatalogSortOrder.None) {
      setSortedGuitars(sortGuitars(guitars, catalogSort, catalogSortOrder));
    } else {
      setSortedGuitars(guitars);
    }
  }, [catalogSort, catalogSortOrder, guitars]);

  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(
    () => {
      history.push(search);
      dispatch(fetchGuitarsAndCommentsAction(search.substring(1)));
    },
    [search],
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
              sortedGuitars.length > 0
                ? sortedGuitars.slice(0, NUMBER_OF_CARDS).map((guitar) => <Card key={ guitar.id } guitar={ guitar }/>)
                : 'Загружаем...'
            }

          </div>
          <div className="pagination page-content__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
              </li>
              <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
              </li>
              <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Catalog;
