// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Header.css';

// eslint-disable-next-line no-unused-vars
import Menu from './../Menu/Menu';
// eslint-disable-next-line no-unused-vars
import Logo from './../Logo/Logo';

class Header extends React.Component {
  render () {
    let header;
    let content;
    if (this.props.isAuthorized) {
      content =
       <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
           <a className="nav-link" href="/main">Home<span className="sr-only">(current)</span></a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/create">Create</a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/preview">Preview</a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/aboutUS">AboutUS</a>
         </li>
       </ul>;
    } else {
      content =
       <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
           <a className="nav-link" href="/main">Home<span className="sr-only">(current)</span></a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/preview">Preview</a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/registration">Register</a>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="/aboutUS">AboutUS</a>
         </li>
       </ul>;
    }
    if (this.props.isCustom) {
      header = <div className="Header"><Menu className="Menu"/></div>;
    } else {
      header = <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark blue scrolling-navbar">
          <a className="navbar-brand" href="#"><strong>Navbar</strong></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {content}
            <ul className="navbar-nav nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link"><i className="fab fa-facebook-f"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link"><i className="fab fa-twitter"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link"><i className="fab fa-instagram"></i></a>
              </li>
            </ul>
          </div>
        </nav>

      </header>;
    }
    return header;
  }
}

export default Header;
