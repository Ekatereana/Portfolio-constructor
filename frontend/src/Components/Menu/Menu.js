// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <header className="Menu">
      <Router>
        <Link to={'/home'}>
          <p>Home</p>
        </Link>
        <Link to={'/create-new-portfolio'}>
          <p id={'create'}>Create</p>
        </Link>
        <Link to={'/about'}>
          <p>About</p>
        </Link>
      </Router>
    </header>
  );
};

export default Menu;
