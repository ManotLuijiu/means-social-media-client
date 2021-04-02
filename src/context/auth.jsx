import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { AUTH_TOKEN } from '../constants';

const initialState = {
  user: null,
};

if (localStorage.getItem(AUTH_TOKEN)) {
  const decodedToken = jwtDecode(localStorage.getItem(AUTH_TOKEN));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(AUTH_TOKEN);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {}, // eslint-disable-line
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem(AUTH_TOKEN, userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem(AUTH_TOKEN);
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
