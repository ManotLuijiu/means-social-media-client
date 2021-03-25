import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { Form, Button, Header } from 'semantic-ui-react';
import { AUTH_TOKEN } from '../constants';

// const REGISTER_MUTATION = gql`
//   mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(registerInput: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Login() {
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // const [formState, setFormState] = useState({
  //   login: true,
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    variables: {
      username,
      password,
    },
    onCompleted: () => {
      localStorage.setItem(AUTH_TOKEN, loginUser.token);
      history.push('/');
    },
  });
  console.log('login', loginUser);

  // const [register] = useMutation(REGISTER_MUTATION, {
  //   variables: {
  //     username: formState.username,
  //     email: formState.email,
  //     password: formState.password,
  //     confirmPassword: formState.confirmPassword,
  //   },
  //   onCompleted: () => {
  //     localStorage.setItem(AUTH_TOKEN, register.token);
  //     history.push('/');
  //   },
  // });
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <Header
            as="h4"
            className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Login
          </Header>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please enter all fields</p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" primary disabled={!validateForm}>
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
