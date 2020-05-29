import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Editable from '../Editable';
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange } from '../TextFormater';

class AboutCard extends React.Component {
  constructor (props) {
    super(props);

    const content = this.props.content;

    if (content) {
      this.state = {
        title: content.title,
        titleColor: content.titleColor,
        img: content.img,
        titlePosition: content.titlePosition,
        primaryText: content.primaryText,
        primaryTextColor: content.primaryTextColor,
        subtitlePosition: content.subtitlePosition,
        primaryTextPosition: content.primaryTextPosition,
        subtitle: content.subTitle,
        subtitleColor: content.subtitleColor,
        subtitleFontSize: content.subtitleFontSize,
        titleFontSize: content.titleFontSize,
        primaryTextFontSize: content.primaryTextFontSize

      };
    } else {
      this.state = {
        img: 'https://mdbootstrap.com/img/Photos/Others/images/43.jpg',
        title: 'Alison Belmont',
        subtitle: 'Graffiti Artist',
        titlePosition: null,
        subtitlePosition: null,
        primaryTextPosition: null,
        primaryText: 'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque \nlaudantium, totam rem aperiam.',
        subtitleColor: null,
        subtitleFontSize: null,
        titleFontSize: null,
        primaryTextFontSize: null,
        titleColor: null,
        primaryTextColor: null
      };
    }

    this.getStyled = getStyled.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.handleChange = handleChange.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
  };

  upload (id) {
    document.getElementById('selectImage' + id).click();
  };

  async uploadFile ({ target: { files } }) {
    console.log('===HomePage file upload===');
    const file = files[0];
    const data = new FormData();
    data.append('image', file);
    await axios.post('/upload/image',
      data,
      { port: 4000, withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      console.log('the link to the image: ', res.data.url);
      this.setState({
        img: res.data.url
      });
    });
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const primaryTextButtom = getButtonType(this.state.primaryTextPosition ? this.state.primaryTextPosition : null);
    let buttons;
    if (!noEdit) {
      buttons =
       <div className="footer max-h-10">
         <a href="#" onClick={() => this.props.update(this)} className="btn btn-primary">Save</a>
         <a href="#" onClick={() => this.props.delete(this)} className="btn btn-danger">Delete</a>
         <div className="btn btn-info" value="Browse..."
           onClick={() => { this.upload(this.props.id); }}>
           <span>Choose Photo</span>
           <div className="file-path-wrapper">
             <input id={'selectImage' + this.props.id} hidden type="file" onChange={this.uploadFile }/>
           </div>
         </div>
       </div>;
    }

    return (
      <div className="card card-element">
        <img className="card-img-top" src={this.state.img} alt="Card image cap"/>
        <div className="card-body">
          <div className={this.getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
              styleName={'editable-title ' + this.state.titleColor + ' ' + this.state.titleFontSize}
              edit={noEdit} text={this.state.title} type="input" value={this.state.title}>

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
                <div name="titleColor" value={this.state.titleColor} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                  <MDBIcon icon="fill" />
                </div>
                <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                  { titleButton }
                </div>
                <div name="titleFontSize" value={this.state.titleFontSize} onClick={(event) => this.changeFont(event, false)} className="filler-color">
                  <i class="fas fa-text-height"></i>
                </div>
              </div>
            ) : null}
          </div>

          <div className={this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle')}
              styleName={ this.state.subtitleColor + ' ' + this.state.subtitleFontSize } edit={noEdit} text={this.state.subtitle} type="input" value={this.state.subtitle}>

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
                <div name="subtitleColor" value={this.state.subtitleColor} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                  <MDBIcon icon="fill" />
                </div>
                <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
                  { subtitleButton }
                </div>
                <div name="subtitleFontSize" value={this.state.subtitleFontSize} onClick={(event) => this.changeFont(event, false)} className="filler-color">
                  <i class="fas fa-text-height"></i>
                </div>
              </div>
            ) : null}

          </div>

          <div className={this.getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.primaryText, 'primaryText')}
              edit={noEdit} styleName= { this.state.primaryTextColor + ' ' + this.state.primaryTextFontSize } text={this.state.primaryText} type="input" value={this.state.primaryText}>

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
                <div name="primaryTextColor" value={this.state.primaryTextColor} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                  <MDBIcon icon="fill" />
                </div>
                <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="primaryTextPosition" value={this.state.primaryTextPosition} className="text-format-button">
                  { primaryTextButtom }
                </div>
                <div name="primaryTextFontSize" value={this.state.primaryTextFontSize} onClick={(event) => this.changeFont(event, false)} className="filler-color">
                  <i class="fas fa-text-height"></i>
                </div>
              </div>
            ) : null}

          </div>
          {buttons}
        </div>
      </div>
    );
  }
};

export default AboutCard;
