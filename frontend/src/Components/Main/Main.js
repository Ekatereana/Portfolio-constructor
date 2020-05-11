import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import '../Logo/Logo.css';

class Main extends Component {
  render () {
    return (
      <div className="main-container">
        <img src={'/mainpage.png'} className="profilepic"/>
        <Logo />
      </div>
    );
  }
}
export default Main;
