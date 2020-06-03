import React from 'react';
import copy from 'copy-to-clipboard';
import About from '../AboutMe/AboutMe';
import '../AboutMe/AboutMe.css';

import { MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from '../Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import '..//HomePage/HomePage.css';

import Projects from '../Projects/Projects';
import '../Projects/Projects.css';

import Services from '../Services/Services';
import '../Services/Services.css';

class Preview extends React.Component {
  handleCopy (id) {
    console.log('copied');
    copy('http://localhost:3000/portfolio-constructor/?id=' + id);
  }

  render () {
    const user = this.props.user;
    console.log('Preview', this.props.preview);
    // <button type="button" onClick={() => this.handleCopy(user.id)} className="btn no-l-mg btn-info">Copy URL</button>
    return (

      <Router>
        <a id="home"/>
        <HomePage handleUser={this.props.handleUser} user = {user} preview={this.props.preview}/>
        <a id="about"/>
        <About handleUser={this.props.handleUser} user = {user} preview={this.props.preview}/>
        <a id="portfolio"/>
        <Projects handleUser={this.props.handleUser} user = {user} preview={this.props.preview}/>
        <a id="services"/>
        <Services handleUser={this.props.handleUser} user = {user} preview={this.props.preview}/>

      </Router>
    );
  }
}
export default Preview;
