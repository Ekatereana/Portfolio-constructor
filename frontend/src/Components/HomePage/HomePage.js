import React, { Component } from 'react';
import './HomePage.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';

import axios from 'axios';
import { MDBBtn, MDBDropdown, MDBDropdownToggle,  MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import BasicUserProfile from './BasicUserProfile';
import UserPhotoCard from './UserPhotoProfile';

// import { useLocation } from 'react-router-dom';

class HomePage extends React.Component {
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

  updateState (className, newState) {
    const { user } = this.state;
    if (!user.home) {
      user.home = {
        userPhotoCard: {
          img: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg',
          title: 'My adventure',
          quotes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci',
          arrayOfSocial: []
        },
        basicProfile: {
          img: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
          title: 'My adventure'
        }
      };
    };
    switch (className) {
      case 'userPhotoCard':
        console.log('user-photo');
        console.log('new home', newState);
        user.home.userPhotoCard = newState;
        break;
      case 'basicProfile':
        console.log('user-basic');
        console.log('new home', newState);
        user.home.basicProfile = newState;
    }
    this.setState(user);
  }

  async handleSublmitAll (home) {
    console.log('handleSubmit');
    const { user } = this.props;
    user.home = home;
    this.setState(user);

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
    // window.location.reload();
  }

  render () {
    console.log('home', this.state.user.home);
    let { home } = this.state.user;
    if (!home) {
      home = {
        userPhotoCard: {
          img: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg',
          title: 'My adventure',
          titlePosition: null,
          quotesPosition: null,
          quotes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci',
          arrayOfSocial: []
        },
        basicProfile: {
          img: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
          title: 'My adventure',
          subtitle: 'Photograpy',
          titlePosition: null,
          subtitlePosition: null,
          primaryTextPosition: null

        }
      };
    };
    return (
      <div className="profile-conteiner">
        {!this.props.preview ? <button type="button" onClick={() => this.handleSublmitAll(home)} className="btn btn-info waves-effect">SAVE CHANGES</button> : null}
        <UserPhotoCard preview={this.props.preview} update = {this.updateState} id='UserPhotoCard' currentState={ home.userPhotoCard } />
        <BasicUserProfile preview={this.props.preview} id='BasicUserProfile' update= {this.updateState} currentState= { home.basicProfile }/>
      </div>

    );
  }
}

export default HomePage;
