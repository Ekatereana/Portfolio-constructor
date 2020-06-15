import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Editable from '../Editable/Editable';
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange, uploadFile, changeStyle } from '../../helpers/TextFormater';
import EditablePanel from '../EditablePanel/EditablePanel';

class AboutCard extends React.Component {
  constructor (props) {
    super(props);

    const content = this.props.content;

    if (content) {
      this.state = {
        title: content.title,
        titleColor: content.titleColor,
        titleStyle: content.titleStyle,
        img: content.img,
        titlePosition: content.titlePosition,
        primaryText: content.primaryText,
        primaryTextStyle: content.primaryTextStyle,
        primaryTextColor: content.primaryTextColor,
        subtitlePosition: content.subtitlePosition,
        subtitleStyle: content.subtitleStyle,
        primaryTextPosition: content.primaryTextPosition,
        subtitle: content.subTitle,
        subtitleColor: content.subtitleColor,
        subtitleFontSize: content.subtitleFontSize,
        titleFontSize: content.titleFontSize,
        primaryTextFontSize: content.primaryTextFontSize,
        noImg: false
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
    this.uploadFile = uploadFile.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.changeStyle = changeStyle.bind(this);
  };

  upload (id) {
    document.getElementById('selectImage' + id).click();
  };

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    const primaryTextButton = getButtonType(this.state.primaryTextPosition ? this.state.primaryTextPosition : null);
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
             <input id={'selectImage' + this.props.id} hidden type="file" accept="image/*" onChange={(event) => this.uploadFile(event,false) }/>
           </div>
         </div>
       </div>;
    }

    return (
      <div className="card card-element">
        {this.state.noImg ? <p>The uploaded file is not image, try again!</p>
          : <img className="card-img-top" src={this.state.img} alt="Card image cap"/>
        }
        <div className="card-body">
          <div className={this.getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
              styleName={'c-title ' + this.state.titleColor + ' ' + this.state.titleFontSize + ' ' + this.state.titleStyle}
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
                scaleble={true}
                isParent={false}/>
            ) : null}
          </div>

          <div className={this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle')}
              styleName={ this.state.subtitleColor + ' ' + this.state.subtitleFontSize + ' ' + this.state.subtitleStyle}
              edit={noEdit} text={this.state.subtitle} type="input" value={this.state.subtitle}>

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
                isParent={false}/>
            ) : null}

          </div>

          <div className={this.getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.primaryText, 'primaryText')}
              edit={noEdit} styleName= { this.state.primaryTextColor + ' ' + this.state.primaryTextFontSize + ' ' + this.state.primaryTextStyle}
              text={this.state.primaryText} type="input" value={this.state.primaryText}>

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
                button= {primaryTextButton}
                column = {true}
                style={this.state.primaryTextStyle}
                changeStyle ={this.changeStyle}
                changeColor = {this.changeColor}
                changeFont = {this.changeFont}
                scaleble={true}
                onChangeTiTlePosition = {this.onChangeTiTlePosition}
                isParent={false}/>
            ) : null}

          </div>
          {buttons}
        </div>
      </div>
    );
  }
};

export default AboutCard;
