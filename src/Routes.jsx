import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import SinglePost from './containers/SinglePost';
import NotFound from './pages/NotFound';

import AuthRoute from './utils/authRoute';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/:postId" component={SinglePost} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
