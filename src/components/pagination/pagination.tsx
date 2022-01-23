import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { NUMBER_OF_CARDS } from '../../const/const';
import { getGuitarsAndCommentsSelector } from '../../store/selectors';
import { GuitarAndCommentsType } from '../../types/types';
import { formSearchRequest, getFilterParams } from '../../utils/utils';

function Pagination(): JSX.Element {

  const history = useHistory();
  const { search } = useLocation();
  const filterParams = getFilterParams(search);

  const guitars: GuitarAndCommentsType[] = useSelector(getGuitarsAndCommentsSelector);

  const [pages, setPages] = useState(Math.ceil(guitars.length / NUMBER_OF_CARDS));
  const [currentPage, setCurrentPage] = useState(parseInt(getFilterParams(search).page, 10) || 1);

  useEffect(() => {
    setPages(Math.ceil(guitars.length / NUMBER_OF_CARDS));
  }, [guitars]);

  useEffect(() => {
    setCurrentPage(parseInt(getFilterParams(search).page, 10) || 1);
  }, [search]);

  const handlePaginationClick = (evt: MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    const page = (evt.target as HTMLAnchorElement).href?.split('/').reverse()[0];
    if (page) {
      const searchUrlRequest = formSearchRequest([
        filterParams.filters,
        filterParams.sort,
        filterParams.order,
        `page=${page}`,
      ]);
      history.push(`?${searchUrlRequest}`);
    }
  };

  return(
    <div className="pagination page-content__pagination">
      {
        pages > 1
          ?
          <ul className="pagination__list" onClick={handlePaginationClick}>
            {
              currentPage !== 1
                ?
                <li className="pagination__page pagination__page--prev" id="prev">
                  <a className="link pagination__page-link" href={(currentPage - 1).toString()}>Назад</a>
                </li>
                : null
            }
            {
              Array(pages).fill(null).map((_, index) => {
                const page = index + 1;
                return (
                  <li className={`pagination__page ${currentPage === page ? 'pagination__page--active' : null}`} key={page}>
                    <a className="link pagination__page-link" href={page.toString()}>{page}</a>
                  </li>
                );
              })
            }
            {
              currentPage !== pages
                ?
                <li className="pagination__page pagination__page--next" id="next">
                  <a className="link pagination__page-link" href={(currentPage + 1).toString()}>Далее</a>
                </li>
                : null
            }
          </ul>
          : null
      }
    </div>
  );
}

export default Pagination;
