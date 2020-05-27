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
        {!this.props.preview ? <button type="button" onClick={() => this.handleSublmitAll(home)} className="btn btn-outline-success waves-effect">SAVE CHANGES</button> : null}
        <UserPhotoCard preview={this.props.preview} update = {this.updateState} id='UserPhotoCard' currentState={ home.userPhotoCard } />
        <BasicUserProfile preview={this.props.preview} id='BasicUserProfile' update= {this.updateState} currentState= { home.basicProfile }/>
      </div>

    );
  }
}

class BasicUserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      img: this.props.currentState.img,
      title: this.props.currentState.title,
      subtitle: this.props.currentState.subtitle,
      subtitlePosition: this.props.currentState.subtitlePosition,
      titlePosition: this.props.currentState.titlePosition,
      primaryText: this.props.currentState.primaryText,
      primaryTextPosition: this.props.currentState.primaryTextPosition
    };
    console.log('title position', this.state.titlePosition);
    this.uploadFile = this.uploadFile.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
  }

  getStyled (position, styles) {
    let styleHeader;
    switch (position) {
      case null:
        styleHeader = 'text-center';
        break;
      case 'text-center':
        styleHeader = 'text-center';
        break;
      case 'text-left':
        styleHeader = 'text-left';
        break;
      case 'text-right':
        styleHeader = 'text-right';
        break;
    };
    return styleHeader + ' ' + styles;
  };

  onChangeTiTlePosition (event) {
    console.log('change position');
    console.log(event.currentTarget.getAttribute('name'));
    const newState = this.state;

    if (!newState[event.currentTarget.getAttribute('name')]) {
      newState[event.currentTarget.getAttribute('name')] = null;
    };
    switch (event.currentTarget.getAttribute('value')) {
      case 'text-center':
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
      case 'text-left':
        newState[event.currentTarget.getAttribute('name')] = 'text-right';
        break;
      case 'text-right':
        newState[event.currentTarget.getAttribute('name')] = 'text-center';
        break;
      case null:
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
    }
    newState.isSaved = false;
    this.setState(newState);
    this.props.update('basicProfile', this.state);
  }

  getButtonType (value) {
    let titleButton;
    console.log('button-value', value);
    switch (value) {
      case 'text-center':
        titleButton = <i className="fas fa-align-center"></i>;
        break;
      case 'text-left':
        titleButton = <i className="fas fa-align-left"></i>;
        break;
      case 'text-right':
        titleButton = <i className="fas fa-align-right"></i>;
        break;
      case null:
        titleButton = <i className="fas fa-align-center"></i>;
        break;
    };
    return titleButton;
  }

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveTextInput (event, input, element) {
    if (event.key === 'Enter') {
      const newState = this.state;
      newState[element] = input;
      newState.isSaved = false;
      this.setState(newState);
      this.props.update('basicProfile', this.state);
    };
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
      this.props.update('basicProfile', this.state);
    });
  }

  render () {
    const noEdit = this.props.preview;
    const titleButton = this.getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = this.getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const primaryTextButton = this.getButtonType(this.state.primaryTextPosition ? this.state.primaryTextPosition : null);
    console.log('title button', titleButton);
    let choosePhotoButton;
    if (!noEdit) {
      choosePhotoButton =
        <div className="file-field button-mg-top" >
          <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={() => document.getElementById('selectImage-2').click()}>
            <span>Choose Photo</span>
            <div className="file-path-wrapper">
              <input id="selectImage-2" hidden type="file" onChange={this.uploadFile}/>
            </div>
          </div>
        </div>;
    }

    return (
      <div className="profile-panel">
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
          <div className={'card ' + `${noEdit ? 'up-full' : 'up-edit'}`}>
            <div className="card-body card-body-cascade">
              <div className={this.getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
                <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName="editable-title" text={this.state.title} type="input" value={this.state.title}>

                  <input
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div onClick={this.onChangeTiTlePosition} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                    { titleButton }
                  </div>
                ) : null}

              </div>

              <div className={this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
                <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle')} styleName="font-weight-bold indigo-text py-2" text={this.state.subtitle} type="input" value={this.state.subtitle}>

                  <input
                    name="subtitle"
                    value={this.state.subtitle}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div onClick={this.onChangeTiTlePosition} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
                    { subtitleButton }
                  </div>
                ) : null}

              </div>

              <div className={this.getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
                <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.primaryText, 'primaryText')} styleName="card-text" text={this.state.primaryText} type="input" value={this.state.subtitle}>

                  <input
                    name="primaryText"
                    value={this.state.primaryText}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div onClick={this.onChangeTiTlePosition} name="primaryTextPosition" value={this.state.primaryTextPosition} className="text-format-button">
                    { primaryTextButton }
                  </div>
                ) : null}

              </div>
              <hr/>
              <a className="px-2 fa-lg li-ic"><i className="fab fa-linkedin-in"></i></a>
              <a className="px-2 fa-lg tw-ic"><i className="fab fa-twitter"></i></a>
              <a className="px-2 fa-lg fb-ic"><i className="fab fa-facebook-f"></i></a>
              {choosePhotoButton}

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
    this.toUrlSocial = this.toUrlSocial.bind(this);
  }

  toUrlSocial (url) {
    window.open(url);
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
    let edit;
    if (!this.props.editable) {
      edit =
      <div>
        <div className="social-item">  <button onClick={this.editSocial} className="fas fa-edit btn-edit-social"></button></div>
        <div className="socia-item">  <button onClick={ () => this.props.delete(this)} className="far fa-trash-alt btn-edit-social"></button> </div>
      </div>;
    }
    return (
      <div className="social-button">
        <div className="social-item"> <button
          onClick={() => this.toUrlSocial(this.state.url)}
          type="button"
          className={'btn ' + this.props.butonclass + ' no-rm'}>
          <i className={ 'fab ' + this.props.classname}></i>{this.props.socialName}
        </button> </div>
        { this.state.isEditable ? <div className="social-item editable"><input name="url" onChange={this.handleChange} className="card-title editable-link" type="text" value={this.state.url}/></div> : null }
        {edit}
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
      titlePosition: currentS.titlePosition,
      quotesPosition: currentS.quotesPosition,
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
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
  };

  getStyled (position, styles) {
    let styleHeader;
    switch (position) {
      case null:
        styleHeader = 'text-center';
        break;
      case 'text-center':
        styleHeader = 'text-center';
        break;
      case 'text-left':
        styleHeader = 'text-left';
        break;
      case 'text-right':
        styleHeader = 'text-right';
        break;
    };
    return styleHeader + ' ' + styles;
  };

  onChangeTiTlePosition (event) {
    const newState = this.state;
    switch (event.currentTarget.getAttribute('value')) {
      case 'text-center':
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
      case 'text-left':
        newState[event.currentTarget.getAttribute('name')] = 'text-right';
        break;
      case 'text-right':
        newState[event.currentTarget.getAttribute('name')] = 'text-center';
        break;
      case null:
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
    }
    this.setState(newState);
    console.log('change-position', this.state);
    this.props.update('userPhotoCard', this.state);
    console.log(this.state);
  }

  getButtonType (value) {
    let titleButton;
    switch (value) {
      case 'text-center':
        titleButton = <i className="fas fa-align-center"></i>;
        break;
      case 'text-left':
        titleButton = <i className="fas fa-align-left"></i>;
        break;
      case 'text-right':
        titleButton = <i className="fas fa-align-right"></i>;
        break;
      case null:
        titleButton = <i className="fas fa-align-center"></i>;
        break;
    };
    return titleButton;
  }

  upload (id) {
    console.log(document.getElementById('selectImage'));
    document.getElementById('selectImage-1').click();
  }

  addSosialLable (btnclass, classname) {
    let { arrayOfSocial } = this.state;
    console.log('add social');
    if (!arrayOfSocial) {
      arrayOfSocial = [];
    }
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
    if (!newState.arrayOfSocial) {
      newState.arrayOfSocial = [];
    }
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
    let { arrayOfSocial } = this.state;
    const imMuteble = this.props.preview;
    const titleButton = this.getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const quotesButton = this.getButtonType(this.state.quotesPosition ? this.state.quotesPosition : null);
    let editPhotoCard;
    if (arrayOfSocial == null) {
      arrayOfSocial = [];
    }
    if (!imMuteble) {
      editPhotoCard =
        <div className="md-form">
          <div className="file-field">
            <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={this.upload}>
              <span>Choose Photo</span>
              <div className="file-path-wrapper">
                <input id="selectImage-1" hidden type="file" onChange={this.uploadFile}/>
              </div>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
            </div>
          </div>
          <ButtonDrop addSosialLable={this.addSosialLable}/>

        </div>;
    }

    return (
      <div className="card ">

        <div className="card-up indigo lighten-1"></div>
        <div className="profile-photo">
          <div className="avatar white">
            <img src={this.state.img} className="avatar"
              alt="woman avatar"/>
          </div>

          {editPhotoCard}
        </div>

        <div className="social-panel row">
          {
            arrayOfSocial.map((el) => {
              return <SocialButton
                editable={imMuteble}
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

        <div className="card-body no-mg-top editable">
          <div className={this.getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} edit={imMuteble} styleName="editable-title card-title" text={this.state.title} type="input" value={this.state.title}>
              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"/>
            </Editable>
            {!imMuteble ? (
              <div onClick={this.onChangeTiTlePosition} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                { titleButton }
              </div>
            ) : null}
          </div>

          <hr/>
          <i className="fas fa-quote-left "></i>
          <div className={this.getStyled(this.state.quotesPosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.quotes, 'quotes')} edit={imMuteble} styleName="editable-text card-text" text={this.state.quotes} type="input" value={this.state.quotes}>
              <input
                name="quotes"
                value={this.state.quotes}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"
                className="card-title"/>
            </Editable>
            {!imMuteble ? (
              <div onClick={this.onChangeTiTlePosition} name="quotesPosition" value={this.state.quotesPosition} className="text-format-button">
                { quotesButton }
              </div>
            ) : null}
          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
export { BasicUserProfile, UserPhotoCard, ButtonDrop, SocialButton };
