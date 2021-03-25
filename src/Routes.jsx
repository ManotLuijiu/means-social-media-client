import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import NotFound from './pages/NotFound';

import AuthRoute from './utils/authRoute';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
