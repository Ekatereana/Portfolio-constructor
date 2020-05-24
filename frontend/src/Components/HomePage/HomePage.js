import React, { Component } from 'react';
import './HomePage.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';

import axios from 'axios';
import { MDBBtn, MDBDropdown, MDBDropdownToggle,  MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

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
    switch (className) {
      case 'userPhotoCard':
        console.log('user-photo');
        console.log('new home', newState);
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
        user.home.userPhotoCard = newState;
        break;
    }
    this.setState(user);
  }

  async handleSublmitAll (home) {
    console.log('handleSubmit');
    const { user } = this.state;
    user.home = home;
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
    // window.location.reload();
    console.log('udate user home', this.state.user.home);
  }

  render () {
    console.log('home', this.state.user.home);
    let { home } = this.state.user;
    if (!home) {
      home = {
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
    return (
      <div className="profile-conteiner">
        <button type="button" onClick={() => this.handleSublmitAll(home)} className="btn btn-outline-success waves-effect">SAVE CHANGES</button>
        <UserPhotoCard update = {this.updateState} id='UserPhotoCard' currentState={ home.userPhotoCard } />
        <BasicUserProfile id='BasicUserProfile' update= {this.updateState} currentState= { home.basicProfile }/>
      </div>

    );
  }
}

class BasicUserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      img: this.props.currentState.img,
      title: this.props.currentState.title
    };
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile ({ target: { files } }) {
    console.log('===HomePage file upload===');
    console.log('files: ', files);
    const file = files[0];
    console.log('file: ', file);

    const data = new FormData();
    data.append('image', file);
    console.log('data: ', data);

    axios.post('/upload/image',
      data,
      { port: 4000, withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      console.log('Processed results');
      console.log('frontend result: ', res);
      console.log('the link to the image: ', res.data.url);
      this.setState({
        img: res.data.url
      });
      console.log('new state after file upload', this.state);
      this.props.update('userPhotoCard', this.state);
    });
  }

  render () {
    return (
      <div className="profile-panel">
        <div className="md-form">
          <div className="file-field">
            <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={() => { document.getElementById('selectImage').click(); }}>
              <span>Choose Photo</span>
              <input onClick={this.uploadFile} id='selectImage' hidden type="file" multiple/>
              <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
            </div>
          </div>
        </div>

        <div className="profile-card">

          <div className="card-down card-cascade wider reverse">

            <div className="view-cascade">
              <img className="card-img-top max" src={this.state.img}
                alt="Card image cap"/>
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

          </div>
          <div className="card up">
            <div className="card-body card-body-cascade">
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
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-fb', 'fa-facebook-f pr-1', 'Facebook')}>Facebook</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-lincked', 'fa-linkedin-in pr-1', 'LinkedIn')} >LinkedIn</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-github', 'fa-github pr-1', 'GitHub')}>GitHub</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.addSosialLable('btn-instagram', 'fa-instagram pr-1', 'Instagram')}>Instagram</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    );
  }
};

class SocialButton extends React.Component {
  constructor (props) {
    super(props);
    const { url } = this.props;
    this.state = {
      isEditable: false,
      url: url
    };
    this.editSocial = this.editSocial.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  editSocial () {
    console.log('edit social');
    const { isEditable } = this.state;
    const save = () => this.props.save(this, this.state.url);
    if (isEditable) {
      save();
    }
    this.setState({ isEditable: !isEditable });
  }

  render () {
    return (
      <div className="social-button">
        <div className="socia-item">  <button onClick={ () => this.props.delete(this)} className="far fa-trash-alt btn-edit-social"></button> </div>
        <div className="social-item"> <button
          action={this.state.url}
          type="button"
          className={'btn ' + this.props.butonclass + ' no-rm'}>
          <i className={ 'fab ' + this.props.classname}></i>{this.props.socialName}
        </button> </div>
        { this.state.isEditable ? <div className="social-item"><input name="url" onChange={this.handleChange} className="card-title editable-link" type="text" value={this.state.url}/></div> : null }
        <div className="social-item">  <button type="button" onClick={this.editSocial} className="fas fa-edit btn-edit-social"></button></div>
      </div>

    );
  }
}

class UserPhotoCard extends React.Component {
  constructor (props) {
    super(props);
    const currentS = this.props.currentState;
    this.nameInput = React.createRef();
    this.state = {
      img: currentS.img,
      title: currentS.title,
      quotes: currentS.quotes,
      arrayOfSocial: currentS.arrayOfSocial,
      isShown: false
    };

    console.log('arr', currentS.arrayOfSocial);
    this.addSosialLable = this.addSosialLable.bind(this);
    this.saveSocialLable = this.saveSocialLable.bind(this);
    this.deleteSocial = this.deleteSocial.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  };

  upload () {
    console.log(document.getElementById('selectImage'));
    document.getElementById('selectImage').click();
  }

  addSosialLable (btnclass, classname) {
    const { arrayOfSocial } = this.state;
    console.log('add social');
    arrayOfSocial.push(<SocialButton
      delete = {this.deleteSocial}
      save = {this.saveSocialLable}
      url = "#"
      butonclass = {btnclass}
      classname = {classname}
      key={ arrayOfSocial.length }
      id={ arrayOfSocial.length } />);
    console.log('add social');
    this.setState(
      { arrayOfSocial: arrayOfSocial }
    );
    this.props.update('userPhotoCard', this.state);
    console.log('add social', this.state.arrayOfSocial);
  }

  saveTextInput (event, input, element) {
    if (event.key === 'Enter') {
      const newState = this.state;
      newState[element] = input;
      this.setState(newState);
      this.props.update('userPhotoCard', this.state);
    };
  }

  saveSocialLable (lable, url) {
    console.log('save social-lable', url);
    const newState = this.state;
    console.log(lable.props.id);
    this.deleteSocial(lable);
    console.log('replace', newState.arrayOfSocial);
    newState.arrayOfSocial.push(<SocialButton delete = {this.deleteSocial}
      save = {this.saveSocialLable} url = {url} butonclass = {lable.props.butonclass} classname = {lable.props.classname} key={lable.props.id} id={lable.props.id}/>);
    this.setState(newState);
    this.props.update('userPhotoCard', this.state);
  };

  deleteSocial (lable) {
    const newState = this.state;
    const index = newState.arrayOfSocial.findIndex(a => a.props.id === lable.props.id);
    console.log(index);
    if (index === -1) return;
    newState.arrayOfSocial.splice(index, 1);
    console.log(this.state);
    this.setState(newState);
    this.props.update('userPhotoCard', this.state);
  }

  uploadFile ({ target: { files } }) {
    console.log('===HomePage file upload===');
    console.log('files: ', files);
    const file = files[0];
    console.log('file: ', file);

    const data = new FormData();
    data.append('image', file);
    console.log('data: ', data);

    axios.post('/upload/image',
      data,
      { port: 4000, withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      console.log('Processed results');
      console.log('frontend result: ', res);
      console.log('the link to the image: ', res.data.url);
      this.setState({
        img: res.data.url
      });
      console.log('new state after file upload', this.state);
      this.props.update('userPhotoCard', this.state);
    });
  }

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render () {
    const { arrayOfSocial } = this.state;
    return (
      <div className="card ">

        <div className="card-up indigo lighten-1"></div>
        <div className="profile-photo">
          <div className="avatar white">
            <img src={this.state.img} className="avatar"
              alt="woman avatar"/>
          </div>

          <div className="md-form">
            <div className="file-field">
              <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={this.upload}>
                <span>Choose Photo</span>
                <div className="file-path-wrapper">
                  <input id="selectImage" hidden type="file" onChange={this.uploadFile}/>
                </div>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
              </div>
            </div>
            <ButtonDrop addSosialLable={this.addSosialLable}/>

          </div>

        </div>

        <div className="social-panel">
          {
            arrayOfSocial.map((el) => {
              return <SocialButton
                delete = {this.deleteSocial}
                save = {this.saveSocialLable}
                url = {el.props.url}
                butonclass = { el.props.butonclass}
                classname = { el.props.classname}
                key={ el.props.id }
                id={ el.props.id } />;
            })
          }
        </div>

        <div className="card-body editable">
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName="editable-title card-title" text={this.state.title} type="input" value={this.state.title}>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"/>
          </Editable>

          <hr/>

          <i className="fas fa-quote-left"></i>
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.quotes, 'quotes')} styleName="editable-text card-text" text={this.state.quotes} type="input" value={this.state.quotes}>
            <input
              name="quotes"
              value={this.state.quotes}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"
              className="form-control card-title"/>
          </Editable>
        </div>
      </div>

    );
  }
}

export default HomePage;
export { BasicUserProfile, UserPhotoCard, ButtonDrop, SocialButton };
