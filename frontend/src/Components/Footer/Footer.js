// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Footer.css';

const Footer = (props) => {
  return (
    <footer className="Footer">
      <Router>
        <Link to={'/home'}>
          <p>Home</p>
        </Link>
        <Link to={'/create-new'}>
          <p>Create</p>
        </Link>
        <Link to={'/about'}>
          <p>About</p>
        </Link>
      </Router>
    </footer>
  );
};

export default Footer;
