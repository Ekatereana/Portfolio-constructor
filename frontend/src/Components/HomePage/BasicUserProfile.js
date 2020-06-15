import React, { Component } from 'react';
import './HomePage.css';
import Draggable from 'react-draggable';

import { Route } from 'react-router-dom';
import Editable from '../Editable/Editable';

import axios from 'axios';
import {
  getButtonType, getStyled, saveTextInput, changeFont,
  changeColor, onChangeTiTlePosition, handleChange, changeOpacity, uploadFile, changeStyle
} from '../../helpers/TextFormater';

import { onStart, onStop, handleDrag } from '../../helpers/OnDrag';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import EditablePanel from '../EditablePanel/EditablePanel';

class BasicUserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeDrags: this.props.currentState.activeDrags,
      deltaPosition: this.props.currentState.deltaPosition,
      isDragged: this.props.currentState.isDragged,
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
      titleStyle: this.props.currentState.titleStyle,
      subtitleStyle: this.props.currentState.subtitleStyle,
      primaryTextStyle: this.props.currentState.primaryTextStyle,
      noImg: false
    };

    console.log('title position', this.state.titlePosition);
    this.uploadFile = uploadFile.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.handleChange = handleChange.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.changeOpacity = changeOpacity.bind(this);
    this.changeStyle = changeStyle.bind(this);
    this.onStart = onStart.bind(this);
    this.onStop = onStop.bind(this);
    this.handleDrag = handleDrag.bind(this);
  }

  render () {
    const noEdit = this.props.preview;
    const titleButton = getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const primaryTextButton = getButtonType(this.state.primaryTextPosition ? this.state.primaryTextPosition : null);
    console.log('title button', titleButton);
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    let choosePhotoButton;
    if (!noEdit) {
      choosePhotoButton =
        <div className="file-field button-mg-top" >
          <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={() => document.getElementById('selectImage-3').click()}>
            <span>Choose Photo</span>
            <div className="file-path-wrapper">
              <input id="selectImage-3" hidden type="file" accept="image/*" onChange={(event) => this.uploadFile(event, 'basicProfile')}/>
            </div>
          </div>
        </div>;
    }

    return (
      <Draggable cancel={noEdit ? 'profile-panel' : ''} onDrag={!noEdit ? (event, ui) => this.handleDrag(event, ui, 'basicProfile') : null}
        defaultPosition={this.state.isDragged ? this.state.deltaPosition : { x: 0, y: 0 } } onTouchEnd={console.log('state', this.state.deltaposition)}
        bounds={ { top: -200, left: -100, right: 100, bottom: 200 }} {...dragHandlers}>
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
                  className="opacity-button">
                  <i class="fas fa-ellipsis-v"></i>
                </div>
              ) : null}
              <div className="card-body card-body-cascade">
                <div className={getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
                  <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title', 'basicProfile')}
                    styleName={ 'c-title ' + this.state.titleColor + ' ' + this.state.titleFontSize + ' ' + this.state.titleStyle}
                    text={this.state.title} type="input" value={this.state.title}>

                    <input
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      type="text"
                      id="inputPrefilledEx"
                      className="card-title"/>
                  </Editable>
                  {!noEdit ? (
                    <EditablePanel name="title"
                      color={this.state.titleColor}
                      size={this.state.titleFontSize}
                      position={this.state.titlePosition}
                      button={titleButton}
                      style={this.state.titleStyle}
                      changeStyle ={this.changeStyle}
                      changeColor = {this.changeColor}
                      changeFont = {this.changeFont}
                      onChangeTiTlePosition = {this.onChangeTiTlePosition}
                      isParent="basicProfile"/>
                  ) : null}
                </div>

                <div className={getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
                  <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle', 'basicProfile')}
                    styleName={ 'indigo-text py-2 ' + this.state.subtitleColor + ' ' + this.state.subtitleFontSize + ' ' + this.state.subtitleStyle}
                    text={this.state.subtitle} type="input" value={this.state.subtitle}>

                    <input
                      name="subtitle"
                      value={this.state.subtitle}
                      onChange={this.handleChange}
                      type="text"
                      id="inputPrefilledEx"
                      className="card-title"/>
                  </Editable>
                  {!noEdit ? (
                    <EditablePanel name="subtitle"
                      color={this.state.subtitleColor}
                      size={this.state.subtitleFontSize}
                      position={this.state.subtitlePosition}
                      button={subtitleButton}
                      changeColor = {this.changeColor}
                      changeFont = {this.changeFont}
                      style={this.state.subtitleStyle}
                      scaleble = {true}
                      changeStyle ={this.changeStyle}
                      onChangeTiTlePosition = {this.onChangeTiTlePosition}
                      isParent="basicProfile"/>
                  ) : null}

                </div>

                <div className={getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
                  <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.primaryText, 'primaryText', 'basicProfile')}
                    styleName={ 'lock ' + this.state.primaryTextColor + ' ' + this.state.primaryTextFontSize + ' ' + this.state.primaryTextStyle }
                    text={this.state.primaryText} type="input" value={this.state.subtitle}>

                    <input
                      name="primaryText"
                      value={this.state.primaryText}
                      onChange={this.handleChange}
                      type="text"
                      id="inputPrefilledEx"
                      className="card-title"/>
                  </Editable>
                  {!noEdit ? (
                    <EditablePanel name="primaryText"
                      color={this.state.primaryTextColor}
                      size={this.state.primaryTextFontSize}
                      position={this.state.primaryTextPosition}
                      button={primaryTextButton}
                      style={this.state.primaryTextStyle}
                      changeStyle ={this.changeStyle}
                      changeColor = {this.changeColor}
                      changeFont = {this.changeFont}
                      scaleble={true}
                      onChangeTiTlePosition = {this.onChangeTiTlePosition}
                      isParent="basicProfile"/>
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
      </Draggable>
    );
  }
};

export default BasicUserProfile;
