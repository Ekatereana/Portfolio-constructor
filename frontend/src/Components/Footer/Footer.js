// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Footer.css';
// eslint-disable-next-line no-unused-vars
import Menu from '../Menu/Menu';

const Footer = (props) => {
  return (
    <footer className="Footer">
      <Menu className="Menu"/>
      <div className="Credits">
        <p>By :&nbsp;</p>
        <a className={'github'} href="https://github.com/Ekatereana/">
          <strong> Ekatereana</strong>
        </a>
        <p>&nbsp;&&nbsp;</p>
        <a href="https://github.com/vermi4elli/">
          <strong> Vermi4elli</strong>
        </a>
      </div>
      <div className="Year">
        <p>2019</p>
      </div>
    </footer>
  );
};

export default Footer;
