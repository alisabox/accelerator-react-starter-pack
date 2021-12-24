import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}

export default Main;
