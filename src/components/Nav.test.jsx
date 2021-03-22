/* eslint-disable */
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';

test('Link changes the color when active', () => {
  render(
    <Router>
      <Nav />
    </Router>,
  );
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
