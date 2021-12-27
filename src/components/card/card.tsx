import { GuitarAndCommentsType } from '../../types/types';

type CardProps = {
  guitar: GuitarAndCommentsType;
}

function Card({ guitar }: CardProps): JSX.Element {

  const { name, previewImg, rating, price, comments } = guitar;
  const fullStars = Math.round(rating);
  const imgPath = previewImg.split('/').reverse()[0];

  return (
    <div className="product-card"><img src={`img/content/${ imgPath }`} width="75" height="190" alt={ name } />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={fullStars > 0 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={fullStars > 1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={fullStars > 2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={fullStars > 3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={fullStars > 4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <span className="rate__count">{comments.length}</span>
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
