import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import useForm from '../utils/hooks';

export default function Register() {
  const context = useContext(AuthContext);
  const history = useHistory();
  console.log(history);
  const [errors, setErrors] = useState({});

  /* eslint-disable-next-line */
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // const enabled =
  //   values.username.length > 0 &&
  //   values.email.length > 0 &&
  //   values.password.length > 0 &&
  //   values.confirmPassword.length > 0;
  // console.log(enabled);

  const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdAt
        token
      }
    }
  `;

  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <Header
            as="h2"
            className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Register
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
                    error={!!errors.username}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={!!errors.email}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={!!errors.confirmPassword}
                    onChange={onChange}
                  />
                  <Button type="submit" primary>
                    Register
                  </Button>
                </Form>
                {error && (
                  <p className="prose text-red-600 text-base mt-2">
                    Error ➡️ Please fix following errors then try again
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
