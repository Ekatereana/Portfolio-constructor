import React, { Component } from 'react';
import Editable from '../Editable';
import axios from 'axios';

import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange } from '../TextFormater';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';

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
        textPosition: content.textPosition,
        textFontSize: content.textFontSize,
        textColor: content.textColor,
        text: content.text,
        url: content.url,
        isSaved: true
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
        isSaved: true
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
    console.log('upload', id);
    document.getElementById('selectImage' + id).click();
  }

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
             <input id={'selectImage' + this.props.id} hidden type="file" onChange={this.uploadFile }/>
           </div>
         </div>
       </div>;
    }
    console.log('rowComponent', this.props);

    return (
      <div className="col-md-6 mb-4">

        <div className="card compact">
          <div className=" overlay no-m">
            <img className="card-img-top" src={this.state.img} alt="Card image cap"/>
          </div>
          <div className="card-body">

            <div className={ this.getStyled(this.state.titlePosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
                edit={noEdit} styleName={ 'editable-title card-title ' + this.state.titleColor + ' ' + this.state.titleFontSize} text={this.state.title} type="input" value={this.state.title}>
                <input
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  type="text"
                  id="inputPrefilledEx"/>
              </Editable>
              {!noEdit ? (
                <div className="row control-panel">
                  <div name="titleColor" value={this.state.titleColor} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                    <MDBIcon icon="fill" />
                  </div>
                  <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                    { titleButton }
                  </div>
                  <div name="titleFontSize" value={this.state.titleFontSize} onClick={ (event) => this.changeFont(event, false)} className="filler-color">
                    <i class="fas fa-text-height"></i>
                  </div>
                </div>
              ) : null}
            </div>
            <hr/>
            <div className={ this.getStyled(this.state.textPosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.text, 'text')}
                styleName={ 'card-plain-text text-muted font-weight-light ' + this.state.textColor + ' ' + this.state.textFontSize}
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
                <div className="row control-panel">
                  <div name="textColor" value={this.state.textColor} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                    <MDBIcon icon="fill" />
                  </div>
                  <div onClick={this.onChangeTiTlePosition} name="textPosition" value={this.state.textPosition} className="text-format-button">
                    { textButton }
                  </div>
                  <div name="textFontSize" value={this.state.textFontSize} onClick={ (event) => this.changeFont(event, false)} className="filler-color">
                    <i class="fas fa-text-height"></i>
                  </div>
                </div>
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
