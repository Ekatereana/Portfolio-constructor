import React from 'react';
import './HomePage.css';

import Editable from '../Editable';

import { MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
        password: '1234555'
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

          <div class="card-down card-cascade wider reverse">

            <div class="view view-cascade overlay">
              <img class="card-img-top max" src={this.state.img}
                alt="Card image cap"/>
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

          </div>
          <div className="card up">
            <div class="card-body card-body-cascade text-center">
              <Editable styleName="editable-title" text={this.state.title} type="input" value={this.state.title}>
                <input
                  ref={ this.textInput }
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  type="text"
                  id="inputPrefilledEx"
                  className="form-control card-title"/>
              </Editable>

              <h6 class="font-weight-bold indigo-text py-2">Photography</h6>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem perspiciatis
                voluptatum a, quo nobis, non commodi quia repellendus sequi nulla voluptatem dicta reprehenderit, placeat
                laborum ut beatae ullam suscipit veniam.
              </p>

              <a class="px-2 fa-lg li-ic"><i class="fab fa-linkedin-in"></i></a>
              <a class="px-2 fa-lg tw-ic"><i class="fab fa-twitter"></i></a>
              <a class="px-2 fa-lg fb-ic"><i class="fab fa-facebook-f"></i></a>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

class UserPhotoCard extends React.Component {
  constructor (props) {
    super(props);
    console.log('start');
    const user = this.props.user;

    this.state = {
      img: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg',
      title: 'My adventure',
      user: user
    };
  };

  render () {
    return (
      <div className="card ">

        <div className="card-up indigo lighten-1"></div>
        <div className="profile-photo">
          <div className="avatar white">
            <img src={this.state.img} class="rounded-circle avatar"
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
            <MDBBtn onClick={ this.handleSublmitAll } outline color="success">Save Changes</MDBBtn>

          </div>

        </div>

        <div className="card-body">
          <Editable styleName="editable-title card-title" text={this.state.user.name} type="input" value={this.state.user.name}>
            <input
              name="name"
              value={this.state.user.name}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"
              className="form-control card-title"/>
          </Editable>

          <hr/>

          <p><i class="fas fa-quote-left"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci
          </p>
        </div>
      </div>

    );
  }
}

export default HomePage;
export { BasicUserProfile, UserPhotoCard };
