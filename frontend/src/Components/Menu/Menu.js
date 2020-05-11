// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <header className="Menu">
      <Link className="menu-text" to="/main">
        <p >Main</p>
      </Link>
      <Link to="/create-new-portfolio">
        <p className="menu-text" id="create">Create</p>
      </Link>
      <Link className="menu-text" to="/about">
        <p >About</p>
      </Link>
      <Link className="menu-text" to="/registration">Registration</Link>
      <Link className="menu-text" to="/home">User Home</Link>
    </header>
  );
};

export default Menu;
