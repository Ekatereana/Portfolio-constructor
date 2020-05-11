// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <header className="Menu">
      <Link to="/main">Home</Link>
      <Link to="/create-new-portfolio">Create</Link>
      <Link to="/about">About</Link>
      <Link to="/registration">Account</Link>
    </header>
  );
};

export default Menu;
