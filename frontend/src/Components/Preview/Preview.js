import React from 'react';

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
  render () {
    const user = this.props.user;
    console.log('Preview', this.props.preview);
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
