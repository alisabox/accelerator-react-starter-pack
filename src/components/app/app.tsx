import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Main from '../main/main';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.ROOT} exact>
        <Main />
      </Route>
      <Route path={`${AppRoute.ROOT}?:filter`}>
        <Main />
      </Route>
      <Route >
        <div>404 Not Found</div>
      </Route>
    </Switch>
  );
}

export default App;
