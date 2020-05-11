import React from 'react';
import './Create.css';

import About from '../AboutMe/AboutMe';
import '../AboutMe/AboutMe.css';

import { MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from '../Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import '..//HomePage/HomePage.css';

class CreateAll extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      arrayOfElements: [],
      isCustom: true
    };
  }

  render () {
    return (
      <div>
        <Header isCustom={this.state.isCustom} />
        <Route path="/create/home" component={HomePage}/>
        <Route path="/create/about" component={About}/>

      </div>
    );
  }
};

class ButtonDrop extends React.Component {
  render () {
    return (
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuMenu" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuMenu">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>
    );
  }
}

export default CreateAll;
export { ButtonDrop };
