import React, { Component } from 'react';
import './HomePage.css';

import Editable from '../Editable';

import { MDBBtn, MDBDropdown, MDBDropdownToggle,  MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

// import { useLocation } from 'react-router-dom';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    console.log('start');

    this.state = {
      arrayOfCards: [],
      user: {
        name: 'Ekate',
        email: 'ekatereana@gmail.com',
        password: '1234555',
        homePage: null
      }
    };
  };

  render () {
    return (
      <div className="profile-conteiner">
        <UserPhotoCard user={this.state.user} />
        <BasicUserProfile />
      </div>

    );
  }
}

class BasicUserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      img: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
      title: 'My adventure'

    };
  }

  render () {
    return (
      <div className="profile-panel">
        <div className="md-form">
          <div className="file-field">
            <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={this.upload}>
              <span>Choose Photo</span>
              <input id='selectImage' hidden type="file" multiple/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
            </div>
          </div>
        </div>

        <div className="profile-card">

          <div className="card-down card-cascade wider reverse">

            <div className="view view-cascade overlay">
              <img className="card-img-top max" src={this.state.img}
                alt="Card image cap"/>
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

          </div>
          <div className="card up">
            <div className="card-body card-body-cascade text-center">
              <div className="title-row">
                <Editable styleName="editable-title" text={this.state.title} type="input" value={this.state.title}>

                  <input
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>

              </div>

              <h6 className="font-weight-bold indigo-text py-2">Photography</h6>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem perspiciatis
                voluptatum a, quo nobis, non commodi quia repellendus sequi nulla voluptatem dicta reprehenderit, placeat
                laborum ut beatae ullam suscipit veniam.
              </p>

              <a className="px-2 fa-lg li-ic"><i className="fab fa-linkedin-in"></i></a>
              <a className="px-2 fa-lg tw-ic"><i className="fab fa-twitter"></i></a>
              <a className="px-2 fa-lg fb-ic"><i className="fab fa-facebook-f"></i></a>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

class ButtonDrop extends React.Component {
  render () {
    return (
      <MDBBtnGroup>
        <MDBBtn color="primary">
            Add Social Button
        </MDBBtn>
        <MDBDropdown>
          <MDBDropdownToggle caret color="primary" />
          <MDBDropdownMenu color="primary">
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-fb', 'fa-facebook-f pr-1', )}>Facebook</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-tw', 'fa-linkedin-in pr-1')} >LinkedIn</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-fb', 'fa-google-plus-g pr-1')}>GitHub</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-fb', 'fa-instagram pr-1')}>Instagram</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    );
  }
};

class SocialButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditable: false
    };
  }

  render () {
    return <button type="button" className={'btn' + this.props.butonClass}><i className={ 'fab' + this.props.classname}></i>{this.props.socialName}</button>;
  }
}

class UserPhotoCard extends React.Component {
  constructor (props) {
    super(props);
    console.log('start');

    this.state = {
      img: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg',
      title: 'My adventure',
      arrayOfSocial: []
    };

    this.addSosialLable = this.addSosialLable.bind(this);
  };

  addSosialLable (btnclass, classname) {
    const array = this.state.arrayOfSocial;
    array.push(<SocialButton
      buttonClass = {btnclass}
      classname = {classname}
      key={ array.length }
      id={ array.length } />);
    console.log(array);
    this.setState(
      { arrayOfSocial: array }
    );
  }

  render () {
    const { arrayOfSocial } = this.state;
    return (
      <div className="card ">

        <div className="card-up indigo lighten-1"></div>
        <div className="profile-photo">
          <div className="avatar white">
            <img src={this.state.img} className="rounded-circle avatar"
              alt="woman avatar"/>
          </div>
          <div className="md-form">
            <div className="file-field">
              <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={this.upload}>
                <span>Choose Photo</span>
                <input id='selectImage' hidden type="file" multiple/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
              </div>
            </div>
            <ButtonDrop addSosialLable={this.addSosialLable}/>

          </div>
          {
            arrayOfSocial.map((el) => {
              return el;
            })
          }

        </div>

        <div className="card-body">
          <Editable styleName="editable-title card-title" text={this.state.title} type="input" value={this.state.title}>
            <input
              name="name"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"
              className="form-control card-title"/>
          </Editable>

          <hr/>

          <p><i className="fas fa-quote-left"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci
          </p>
        </div>
      </div>

    );
  }
}

export default HomePage;
export { BasicUserProfile, UserPhotoCard, ButtonDrop, SocialButton };
