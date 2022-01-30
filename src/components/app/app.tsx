import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Main from '../main/main';
import NotFound from '../not-found/not-found';


function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Root} exact>
        <Main />
      </Route>
      <Route >
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
