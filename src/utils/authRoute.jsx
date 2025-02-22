/* eslint-disable */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function authRoute({ component: Component, ...rest }) {
  console.log('rest', rest);
  const { user } = useContext(AuthContext);
  return (
    <Route {...rest} render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)} />
  );
}
