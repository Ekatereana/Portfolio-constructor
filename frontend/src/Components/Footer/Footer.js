// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Footer.css';
// eslint-disable-next-line no-unused-vars

const Footer = (props) => {
  return (
    <footer className="Footer">

      <div className = "links">

        <a className ="big" href="" >
          <img src={'./logotype.svg'}/>

        </a>
        <a className ="big" href="" >
          <img src={'./github.svg'}/>

        </a>
        <a className ="big" href="" >
          <img src={'./social-media.svg'}/>

        </a>
      </div>
      <div className="Authtors">
        <div className="Credits">
          <p className="Credit">By :&nbsp;</p>
          <a className={'Credit'} href="https://github.com/Ekatereana/">
            <strong> Ekatereana</strong>
          </a>
          <p className="Credit">&nbsp;&&nbsp;</p>
          <a className="Credit" href="https://github.com/vermi4elli/">
            <strong> Vermi4elli</strong>
          </a>
        </div>
        <div className="Year">
          <p>. . .</p>
          <p className="Credit">2020</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
