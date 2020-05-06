// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import Header from './Components/Header/Header';
// eslint-disable-next-line no-unused-vars
import Footer from './Components/Footer/Footer';
// eslint-disable-next-line no-unused-vars
import Test from './Components/Test/Test';

import Conteiner from './Components/Conteiner/Conteiner';
import './Components/Conteiner/Conteiner.css';

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <Router>
      <div className="App.Main">
        <Conteiner />
      </div>
    </Router>
  );
}

export default App;
