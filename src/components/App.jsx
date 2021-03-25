import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Routes from '../Routes';

import '../styles/App.css';

import Nav from './Nav';

function App() {
  return (
    <Router>
      <Container>
        <Nav />
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
