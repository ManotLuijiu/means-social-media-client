import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Routes from '../Routes';

import { AuthProvider } from '../context/auth';

import '../styles/App.css';

import Nav from './Nav';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Nav />
          <Routes />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
