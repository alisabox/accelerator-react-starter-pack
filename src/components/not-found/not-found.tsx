function NotFound(): JSX.Element {
  return (
    <div className="not-found">
      <header className="header" id="header">
        <div className="container header__wrapper">
          <a className="header__logo logo" href="/#">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </a>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--not-found ">404 Not Found</h1>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
