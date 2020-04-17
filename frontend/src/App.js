// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
// eslint-disable-next-line no-unused-vars
import Header from './Components/Header/Header';
// eslint-disable-next-line no-unused-vars
import Footer from './Components/Footer/Footer';
// eslint-disable-next-line no-unused-vars
import Test from './Components/Test/Test';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/about" exact component={Test}/>
          <Route path="/" component={null} />
          <Route path="/create-new-portfolio" component={null} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
