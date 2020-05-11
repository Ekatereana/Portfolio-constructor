// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import Header from './Components/Header/Header';
// eslint-disable-next-line no-unused-vars
import Footer from './Components/Footer/Footer';

import Container from './Components/Container/Container';
import './Components/Container/Container.css';

import HomePage from './Components/HomePage/HomePage';
import './Components/HomePage/HomePage.css';

import Main from './Components/Main/Main';
import './Components/Main/Main.css';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <Router>
      <div className="AppMain">
        <Header />
        <div className="vertical-panel">
          <Route path="/home" component={HomePage}/>
          <Route path="/main" component={Main}/>
          <Route path="/registration" component={Container}/>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
