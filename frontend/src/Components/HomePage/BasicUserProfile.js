import React, { Component } from 'react';
import './HomePage.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';

import axios from 'axios';
import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange, changeOpacity } from '../TextFormater';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';

class BasicUserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      opacity: this.props.currentState.opacity,
      img: this.props.currentState.img,
      title: this.props.currentState.title,
      subtitle: this.props.currentState.subtitle,
      subtitlePosition: this.props.currentState.subtitlePosition,
      titlePosition: this.props.currentState.titlePosition,
      primaryText: this.props.currentState.primaryText,
      primaryTextPosition: this.props.currentState.primaryTextPosition,
      subtitleColor: this.props.currentState.subtitleColor,
      subtitleFontSize: this.props.currentState.subtitleFontSize,
      titleFontSize: this.props.currentState.titleFontSize,
      primaryTextFontSize: this.props.currentState.primaryTextFontSize,
      primaryTextColor: this.props.currentState.primaryTextColor,
      titleColor: this.props.currentState.titleColor,
      noImg: false
    };
    console.log('title position', this.state.titlePosition);
    this.uploadFile = this.uploadFile.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.handleChange = handleChange.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.changeOpacity = changeOpacity.bind(this);
  }

  uploadFile ({ target: { files } }) {
    console.log('===HomePage file upload===');
    console.log('files: ', files);
    const file = files[0];
    console.log('file: ', file);

    const types = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (file && types.includes(file.type)) {
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
          img: res.data.url,
          noImg: false
        });
        console.log('new state after file upload', this.state);
        this.props.update('basicProfile', this.state);
      });
    } else {
      this.setState({
        noImg: true
      });
    }
  }

  render () {
    const noEdit = this.props.preview;
    const titleButton = getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const primaryTextButton = getButtonType(this.state.primaryTextPosition ? this.state.primaryTextPosition : null);
    console.log('title button', titleButton);
    let choosePhotoButton;
    if (!noEdit) {
      choosePhotoButton =
        <div className="file-field button-mg-top" >
          <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={() => document.getElementById('selectImage-2').click()}>
            <span>Choose Photo</span>
            <div className="file-path-wrapper">
              <input id="selectImage-2" hidden type="file" accept="image/*" onChange={this.uploadFile}/>
            </div>
          </div>
        </div>;
    }

    return (
      <div className="profile-panel">
        <div className="profile-card">

          <div className="card-down card-cascade wider reverse">

            <div className="view-cascade">
              {this.state.noImg ? <p>The uploaded file is not image, try again!</p>
                : <img className="card-img-top max" src={this.state.img}
                  alt="Card image cap"/>}
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

          </div>
          <div className={this.state.opacity === 'opacity-null' ? this.state.opacity + ' ' + `${noEdit ? 'up-full' : 'up-edit'}` : 'card ' + this.state.opacity + ' ' + `${noEdit ? 'up-full' : 'up-edit'}`}>
            {!noEdit ? (
              <div name="opacity" value={this.state.opacity} title="Click to change opacity" onClick={(event) => this.changeOpacity(event, 'basicProfile')}
                className={this.state.opacity === 'opacity-null' ? 'opacity-button ' + 'white-text' : 'opacity-button'}>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            ) : null}
            <div className="card-body card-body-cascade">
              <div className={getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
                <Editable onKeyDown={(event) => saveTextInput(event, this.state.title, 'title')}
                  styleName={ 'editable-title ' + this.state.titleColor + ' ' + this.state.titleFontSize} text={this.state.title} type="input" value={this.state.title}>

                  <input
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div className="row control-panel">
                    <div name="titleColor" value={this.state.titleColor} onClick={(event) => this.changeColor(event, 'basicProfile')} className="filler-color">
                      <MDBIcon icon="fill" />
                    </div>
                    <div onClick={(event) => this.onChangeTiTlePosition(event, 'basicProfile')} name="titlePosition" value={this.state.titlePosition}
                      className="text-format-button">
                      { titleButton }
                    </div>
                    <div name="titleFontSize" value={this.state.titleFontSize} onClick={(event) => this.changeFont(event, 'basicProfile')} className="filler-color">
                      <i class="fas fa-text-height"></i>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className={getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
                <Editable onKeyDown={(event) => saveTextInput(event, this.state.subtitle, 'subtitle')}
                  styleName={ 'font-weight-bold indigo-text py-2 ' + this.state.subtitleColor + ' ' + this.state.subtitleFontSize} text={this.state.subtitle} type="input" value={this.state.subtitle}>

                  <input
                    name="subtitle"
                    value={this.state.subtitle}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div className="row control-panel">
                    <div name="subtitleColor" value={this.state.subtitleColor} onClick={(event) => this.changeColor(event, 'basicProfile')} className="filler-color">
                      <MDBIcon icon="fill" />
                    </div>
                    <div onClick={(event) => this.onChangeTiTlePosition(event, 'basicProfile')} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
                      { subtitleButton }
                    </div>
                    <div name="subtitleFontSize" value={this.state.subtitleFontSize} onClick={(event) => this.changeFont(event, 'basicProfile')} className="filler-color">
                      <i class="fas fa-text-height"></i>
                    </div>
                  </div>
                ) : null}

              </div>

              <div className={getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
                <Editable onKeyDown={(event) => saveTextInput(event, this.state.primaryText, 'primaryText')}
                  styleName={ this.state.primaryTextColor + ' ' + this.state.primaryTextFontSize } text={this.state.primaryText} type="input" value={this.state.subtitle}>

                  <input
                    name="primaryText"
                    value={this.state.primaryText}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"
                    className="card-title"/>
                </Editable>
                {!noEdit ? (
                  <div className="row control-panel">
                    <div name="primaryTextColor" value={this.state.primaryTextColor} onClick={(event) => this.changeColor(event, 'basicProfile')} className="filler-color">
                      <MDBIcon icon="fill" />
                    </div>
                    <div onClick={(event) => this.onChangeTiTlePosition(event, 'basicProfile')} name="primaryTextPosition" value={this.state.primaryTextPosition} className="text-format-button">
                      { primaryTextButton }
                    </div>
                    <div name="primaryTextFontSize" value={this.state.primaryTextFontSize} onClick={(event) => this.changeFont(event, 'basicProfile')} className="filler-color">
                      <i class="fas fa-text-height"></i>
                    </div>
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
};

export default BasicUserProfile;
