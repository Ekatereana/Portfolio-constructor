import React, { Component } from 'react';
import './HomePage.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';
import {
  getButtonType, getStyled, saveTextInput, changeFont,
  changeColor, onChangeTiTlePosition, handleChange, uploadFile,
  changeImageForm, changeImageOrientation, changeImageSize, changeImageBorderType, changeStyle
} from '../TextFormater';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu, } from 'mdbreact';
import axios from 'axios';

class SocialButton extends React.Component {
  constructor (props) {
    super(props);
    const { url } = this.props;
    this.state = {
      isEditable: false,
      url: url
    };
    this.editSocial = this.editSocial.bind(this);
    this.handleChange = handleChange.bind(this);
    this.toUrlSocial = this.toUrlSocial.bind(this);
  }

  toUrlSocial (url) {
    window.open(url);
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
      titleStyle: currentS.titleStyle,
      titlePosition: currentS.titlePosition,
      quotesStyle: currentS.quotesStyle,
      titleColor: currentS.titleColor,
      titleFontSize: currentS.titleFontSize,
      quotesPosition: currentS.quotesPosition,
      quotesColor: currentS.quotesColor,
      quotesFontSize: currentS.quotesFonstSize,
      quotes: currentS.quotes,
      arrayOfSocial: currentS.arrayOfSocial,
      imageOrientation: currentS.imageOrientation,
      imageForm: currentS.imageForm,
      imgSize: currentS.imgSize,
      subtitle: currentS.subtitle,
      subtitlePosition: currentS.subtitlePosition,
      subtitleColor: currentS.subtitleColor,
      subtitleFontSize: currentS.subtitleFontSize,
      isShown: false,
      noImg: false,
      imgBorderType: currentS.imgBorderType
    };

    console.log('arr', currentS.arrayOfSocial);
    this.addSosialLable = this.addSosialLable.bind(this);
    this.saveSocialLable = this.saveSocialLable.bind(this);
    this.deleteSocial = this.deleteSocial.bind(this);
    this.handleChange = handleChange.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFile = uploadFile.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.changeImageForm = changeImageForm.bind(this);
    this.changeImageOrientation = changeImageOrientation.bind(this);
    this.changeImageSize = changeImageSize.bind(this);
    this.changeImageBorderType = changeImageBorderType.bind(this);
    this.changeStyle = changeStyle.bind(this);
  };

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

  render () {
    let { arrayOfSocial } = this.state;
    const imMuteble = this.props.preview;
    const titleButton = getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const quotesButton = getButtonType(this.state.quotesPosition ? this.state.quotesPosition : null);
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
                <input id="selectImage-1" hidden type="file" accept="image/*" onChange={(event) => this.uploadFile(event, 'userPhotoCard')}/>
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

        <div className={ this.state.imageForm + ' profile-photo' }>
          <div className={ this.state.imageOrientation + ' ' + `${this.state.imgSize ? this.state.imgSize : 'avatar'}` + ' ' + this.state.imgBorderType }>
            {this.state.noImg ? <p>The uploaded file is not image, try again!</p>
              : <img src={this.state.img} className="avatar"
                alt="woman avatar"/>}
            {!imMuteble ? (
              <div title="change imageOrientation" className="row control-panel">
                <div name="imageForm" value={this.state.imageForm} onClick={(event) => this.changeImageForm(event, 'userPhotoCard')} className="filler-color">
                  <MDBIcon icon="exchange-alt" />
                </div>
                <div title="turn image" onClick={(event) => this.changeImageOrientation(event, 'userPhotoCard')}
                  name="imageOrientation"
                  value={this.state.imageOrientation} className="text-format-button">
                  <MDBIcon icon="undo-alt" />
                </div>
                <div name="imgSize" title="Change size of image" value={this.state.imgSize} onClick={ (event) => this.changeImageSize(event, 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-expand"></i>
                </div>
                <div name="imgBorderType" title = "change borders" value={this.state.imgBorderType} onClick={ (event) => this.changeImageBorderType(event, 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-border-style"></i>
                </div>
              </div>
            ) : null}
          </div>

          <div className="center-text-keeper">
            {editPhotoCard}
            <div className="row">
              <i class="fab fa-angellist"></i>
              <div className={getStyled(this.state.subtitlePosition, 'text-control-item  editable')}>
                <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle', 'userPhotoCard')}
                  edit={imMuteble} styleName={ this.state.subtitleColor + ' ' + this.state.subtitleFontSize} text={this.state.subtitle} type="input" value={this.state.subtitle}>
                  <input
                    name="subtitle"
                    value={this.state.subtitle}
                    onChange={this.handleChange}
                    type="text"
                    id="inputPrefilledEx"/>
                </Editable>
                {!imMuteble ? (
                  <div className="row control-panel">
                    <div name="subtitleColor" value={this.state.subtitleColor} onClick={(event) => this.changeColor(event, 'userPhotoCard')} className="filler-color">
                      <MDBIcon icon="fill" />
                    </div>
                    <div onClick={(event) => this.onChangeTiTlePosition(event, 'userPhotoCard')} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
                      { subtitleButton }
                    </div>
                    <div name="subtitleFontSize" value={this.state.subtitleFontSize} onClick={ (event) => this.changeFont(event, 'userPhotoCard', true)} className="filler-color">
                      <i class="fas fa-text-height"></i>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
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
          <div className={getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title', 'userPhotoCard')}
              edit={imMuteble}
              styleName={ 'editable-title card-title ' + this.state.titleColor + ' ' + this.state.titleFontSize + ' ' + this.state.titleStyle}
              text={this.state.title} type="input" value={this.state.title}>
              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"/>
            </Editable>
            {!imMuteble ? (
              <div className="row control-panel">
                <div name="titleColor" value={this.state.titleColor} onClick={(event) => this.changeColor(event, 'userPhotoCard')} className="filler-color">
                  <MDBIcon icon="fill" />
                </div>
                <div onClick={(event) => this.onChangeTiTlePosition(event, 'userPhotoCard')} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                  { titleButton }
                </div>
                <div name="titleFontSize" value={this.state.titleFontSize} onClick={ (event) => this.changeFont(event, 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-text-height"></i>
                </div>
                <div name="titleStyle" value={this.state.titleStyle} onClick={ (event) => this.changeStyle(event, 'underline', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-underline"/>
                </div>

                <div name="titleStyle" value={this.state.titleStyle} onClick={ (event) => this.changeStyle(event, 'italic', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-italic"/>
                </div>

                <div name="titleStyle" value={this.state.titleStyle} onClick={ (event) => this.changeStyle(event, 'bold', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-bold"/>
                </div>
              </div>
            ) : null}
          </div>

          <hr/>
          <i className="fas fa-quote-left "></i>
          <div className={ getStyled(this.state.quotesPosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => saveTextInput(event, this.state.quotes, 'quotes', 'userPhotoCard')} edit={imMuteble}
              styleName={ 'editable-text ' + this.state.quotesColor + ' ' + this.state.quotesFontSize + ' ' + this.state.quotesStyle}
              text={this.state.quotes} type="input" value={this.state.quotes}>
              <input
                name="quotes"
                value={this.state.quotes}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"
                className="card-title"/>
            </Editable>
            {!imMuteble ? (
              <div className="row control-panel">
                <div name="quotesColor" value={this.state.quotesColor} onClick={(event) => this.changeColor(event, 'userPhotoCard')} className="filler-color">
                  <MDBIcon icon="fill" />
                </div>
                <div onClick={this.onChangeTiTlePosition} name="quotesPosition" value={this.state.quotesPosition} className="text-format-button">
                  { quotesButton }
                </div>
                <div name="quotesFontSize" value={this.state.quotesFontSize} onClick={ (event) => this.changeFont(event, 'userPhotoCard', true)} className="filler-color">
                  <i class="fas fa-text-height"></i>
                </div>

                <div name="quotesStyle" value={this.state.quotesStyle} onClick={ (event) => this.changeStyle(event, 'underline', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-underline"/>
                </div>

                <div name="quotesStyle" value={this.state.quotesStyle} onClick={ (event) => this.changeStyle(event, 'italic', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-italic"/>
                </div>

                <div name="quotesStyle" value={this.state.quotesStyle} onClick={ (event) => this.changeStyle(event, 'bold', 'userPhotoCard')} className="filler-color">
                  <i class="fas fa-bold"/>
                </div>
              </div>
            ) : null}
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

export default UserPhotoCard;
