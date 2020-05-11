// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <header className="Menu">
      <Link className="menu-text" to="/create/about">
        <p >About</p>
      </Link>
      <Link className="menu-text" to="/create/portfolio">
        <p >Portfolio</p>
      </Link>
      <Link className="menu-text" to="/create/services">
        <p >Services</p>
      </Link>
      <Link className="menu-text" to="/create/home">User Home</Link>
    </header>
  );
};

export default Menu;
