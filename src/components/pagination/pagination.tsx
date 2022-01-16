import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getGuitarsAndCommentsSelector } from '../../store/selectors';
import { GuitarAndCommentsType } from '../../types/types';

const NUMBER_OF_CARDS = 9;

function Pagination(): JSX.Element {

  const guitars: GuitarAndCommentsType[] = useSelector(getGuitarsAndCommentsSelector);

  const [pages, setPages] = useState(Math.ceil(guitars.length / NUMBER_OF_CARDS));

  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationClick = (evt: MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    const page = (evt.target as HTMLAnchorElement).href?.split('/').reverse()[0];
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  };

  const history = useHistory();
  const { search } = useLocation();

  useEffect(
    () => {
      if (currentPage > pages) {
        setCurrentPage(1);
      }

      const pageFilter = search?.substring(1).split('&').filter((item) => item.split('=')[0] === 'page').join().split('=')[1];
      if (pageFilter && parseInt(pageFilter, 10) !== currentPage) {
        setCurrentPage(parseInt(pageFilter, 10));
      }
      return () => setCurrentPage(1);
    },
    [pages],
  );

  useEffect(
    () => {
      setPages(Math.ceil(guitars.length / NUMBER_OF_CARDS));
      const nonPageFilters = search?.substring(1).split('&').filter((item) => item.split('=')[0] !== 'page').join('&');

      if (nonPageFilters) {
        history.push(`?${nonPageFilters}&page=${currentPage}`);
      } else {
        history.push(`?page=${currentPage}`);
      }
    },
    [currentPage, search, guitars],
  );

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
