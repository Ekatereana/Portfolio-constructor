// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Link } from 'react-router-dom';
import './Header.css';

function Header () {
  return (
    <div className="Header">
      <BrowserRouter>
        <Link to={'/home'}>
          <h2>Home</h2>
        </Link>
        <Link to={'/create-new'}>
          <h1>Create</h1>
        </Link>
        <Link to={'/about'}>
          <h2>About</h2>
        </Link>
      </BrowserRouter>
    </div>
  );
}

export default Header;
