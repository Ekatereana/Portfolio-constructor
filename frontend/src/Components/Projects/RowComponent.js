import React, { Component } from 'react';
import Editable from '../Editable/Editable';
import axios from 'axios';

import {
  getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange, uploadFile, changeStyle
} from '../../helpers/TextFormater';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import EditablePanel from '../EditablePanel/EditablePanel';

class RowComponent extends Component {
  constructor (props) {
    super(props);
    const content = this.props.content;

    if (content) {
      this.state = {
        title: content.title,
        img: content.img,
        titlePosition: content.titlePosition,
        titleColor: content.titleColor,
        titleFontSize: content.titleFontSize,
        titleStyle: content.titleFStyle,
        textPosition: content.textPosition,
        textFontSize: content.textFontSize,
        textColor: content.textColor,
        textStyle: content.textStyle,
        text: content.text,
        url: content.url,
        isSaved: true,
        noImg: false
      };
    } else {
      this.state = {
        title: 'Custom Title',
        titlePosition: null,
        textPosition: null,
        titleColor: null,
        titleFontSize: null,
        textFontSize: null,
        textColor: null,
        img: 'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg',
        text: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        url: '#',
        isSaved: true,
        noImg: false
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
    console.log('upload', id);
    document.getElementById('selectImageprojects' + id).click();
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition);
    const textButton = getButtonType(this.state.textPosition);
    let buttons;
    if (!noEdit) {
      buttons =
       <div className="footer">
         <button type="button" onClick={() => { this.props.update(this); }} className="btn btn-primary">SAVE</button>
         <button type="button" onClick={() => { this.props.delete(this); }} className="btn btn-danger">DELETE</button>
         <div className="btn btn-info" value="Browse..."
           onClick={() => { this.upload(this.props.id); }}>
           <span>Choose Photo</span>
           <div className="file-path-wrapper">
             <input id={'selectImageprojects' + this.props.id} hidden type="file" accept="image/*" onChange={(event) => this.uploadFile(event, false) }/>
           </div>
         </div>
       </div>;
    }
    console.log('rowComponent', this.props);

    return (
      <div className="col-md-6 mb-4">

        <div className="card compact">
          <div className=" overlay no-m">
            {this.state.noImg ? <div><p>The uploaded file is not image, try again!</p>
              <img className="card-img-top" src={this.state.img} alt=""/></div>
              : <img className="card-img-top" src={this.state.img} alt="Card image cap"/>}
          </div>
          <div className="card-body">

            <div className={ this.getStyled(this.state.titlePosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
                edit={noEdit}
                styleName={ 'c-title ' + this.state.titleColor + ' ' + this.state.titleFontSize + ' ' + this.state.titleStyle}
                text={this.state.title} type="input" value={this.state.title}>
                <input
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  type="text"
                  id="inputPrefilledEx"/>
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
            <hr/>
            <div className={ this.getStyled(this.state.textPosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.text, 'text')}
                styleName={ 'card-plain-text text-muted font-weight-light ' + this.state.textColor + ' ' + this.state.textFontSize + ' ' + this.state.textStyle}
                text={this.state.text}
                type="input"
                value={this.state.text}>
                <input
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  type="text"
                  id="inputPrefilledEx"/>
              </Editable>
              {!noEdit ? (
                <EditablePanel name="text"
                  color={this.state.textColor}
                  size={this.state.textFontSize}
                  position={this.state.textPosition}
                  button={textButton}
                  changeColor = {this.changeColor}
                  changeFont = {this.changeFont}
                  style={this.state.textStyle}
                  scaleble = {true}
                  changeStyle ={this.changeStyle}
                  column = {true}
                  onChangeTiTlePosition = {this.onChangeTiTlePosition}
                  isParent={false}/>
              ) : null}
            </div>
            <hr/>
            {buttons}
          </div>
        </div>

      </div>
    );
  }
}

export default RowComponent;
