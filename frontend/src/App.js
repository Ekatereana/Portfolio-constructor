// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import Header from './Components/Header/Header';
// eslint-disable-next-line no-unused-vars
import Footer from './Components/Footer/Footer';
// eslint-disable-next-line no-unused-vars
import Test from './Components/Test/Test';

import Conteiner from './Components/Conteiner/Conteiner';
import './Components/Conteiner/Conteiner.css';

import Main from './Components/Main/Main';
import './Components/Main/Main.css';

import CreateAll from './Components/Create/Create';
import './Components/Create/Create.css';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <Router>
      <div className="AppMain">
        <Header />
        <div className="vertical-panel">
          <Route path="/main" component={Main}/>
          <Route path="/create" component={CreateAll}/>
          <Route path="/registration" component={Conteiner}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
