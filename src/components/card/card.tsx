import { GuitarType } from '../../types/types';

type CardProps = {
  guitar: GuitarType;
}

const MAX_RATING = 5;

function Card({ guitar }: CardProps): JSX.Element {

  const { name, previewImg, rating, price } = guitar;
  const fullStars = Math.round(rating);
  const emptyStars = MAX_RATING - fullStars;
  const imgPath = previewImg.split('/').reverse()[0];

  return (
    <div className="product-card"><img src={`img/content/${ imgPath }`} width="75" height="190" alt={ name } />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {
            [...Array(fullStars)].map(() => (
              <svg width="12" height="11" aria-hidden="true" key="full-star">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
            ))
          }
          {
            [...Array(emptyStars)].map(() => (
              <svg width="12" height="11" aria-hidden="true" key="empty-star">
                <use xlinkHref="#icon-star"></use>
              </svg>
            ))
          }
          <span className="rate__count">9</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{ name }</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{ price } ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="/#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
      </div>
    </div>
  );
}

export default Card;
