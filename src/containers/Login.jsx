import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import useForm from '../utils/hooks';

export default function Login() {
  const context = useContext(AuthContext);
  console.log('context', context);
  const history = useHistory();
  console.log('history', history);
  const [errors, setErrors] = useState({});

  /* eslint-disable-next-line */
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        username
        createdAt
        token
      }
    }
  `;

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <Header
            as="h1"
            className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Login
          </Header>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please enter all fields</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                  <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={!!errors}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={!!errors}
                    onChange={onChange}
                  />
                  <Button type="submit" primary>
                    Login
                  </Button>
                </Form>
                {error && (
                  <p className="prose text-red-600 text-base mt-2">
                    Error Please fix these then try again
                  </p>
                )}
                {Object.keys(errors).length > 0 && (
                  <div className="ui error message">
                    <ul className="list">
                      {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {loading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
