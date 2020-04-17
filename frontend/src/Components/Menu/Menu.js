// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <header className="Menu">
      <Link to="/home">
        <p>Home</p>
      </Link>
      <Link to="/create-new-portfolio">
        <p id="create">Create</p>
      </Link>
      <Link to="/about">
        <p>About</p>
      </Link>
    </header>
  );
};

export default Menu;
