import Search from '../search/search';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo" href="/#">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="/#">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="/#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <Search />
        <a className="header__cart-link" href="/#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
