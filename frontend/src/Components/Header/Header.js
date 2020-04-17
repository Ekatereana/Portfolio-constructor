// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Header.css';
// eslint-disable-next-line no-unused-vars
import Menu from './../Menu/Menu';
// eslint-disable-next-line no-unused-vars
import Logo from './../Logo/Logo';

function Header () {
  return (
    <div className="Header">
      <Logo className="Logo"/>
      <Menu className="Menu"/>
    </div>
  );
}

export default Header;
