import React, { Component } from 'react';
import './Services.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable/Editable';

import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import ServicePanel from './ServicesPanel';

class Services extends Component {
  constructor (props) {
    super(props);
    console.log('start');
    const { user } = this.props;

    this.state = {
      user: user
    };
    console.log('start state', user);
    this.handleSublmitAll = this.handleSublmitAll.bind(this);
    this.updateState = this.updateState.bind(this);
  };

  updateState (newState) {
    const { user } = this.state;
    console.log('new state', newState);

    if (!user.services) {
      user.services = {
        servicesPanel: {
          title: 'Why is it so great?',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam.',
          titlePosition: null,
          subtitlePosition: null,
          arrayOfCards: []
        }
      };
    };
    user.services.servicesPanel = newState;
    this.setState(user);
    this.props.handleUser(this.state.user);
    console.log('upate user', this.state.user);
  }

  async handleSublmitAll (services) {
    console.log('handleSubmit');
    const { user } = this.state;
    user.services = services;
    this.setState(user);
    console.log('udate user ', user);

    axios.post('/update', {
      user: user
    },
    { port: 4000, withCredentials: true }).then(response => {
      console.log('sucess', response);
      this.props.handleUser(response.data);
      console.log(JSON.parse(sessionStorage.getItem('user')));
    })
      .catch(error => {
        console.log('error ', error);
      });
    console.log('udate user services', this.state.user.services);
  }

  render () {
    let { services } = this.state.user;
    const noEdit = this.props.preview;
    console.log('services', services);
    if (!services) {
      services = {
        servicesPanel: null
      };
    }
    return (
      <section className="services-card my-5">
        {!noEdit ? <button type="button" onClick={() => this.handleSublmitAll(services)} className="btn no-l-mg btn-info waves-effect">SUBMIT ALL</button> : null}
        <hr/>
        <ServicePanel edit = {noEdit} currentState={ services.servicesPanel } update={this.updateState} sumit={this.handleSublmitAll}/>
        <hr/>
      </section>
    );
  }
};

export default Services;
export { ServicePanel };
