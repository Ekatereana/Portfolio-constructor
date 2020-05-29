import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import Editable from '../Editable';
import '../Editable.css';

import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange } from '../TextFormater';
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';

class ServiceComponent extends Component {
  constructor (props) {
    super(props);
    const content = this.props.content;

    if (content !== null) {
      this.state = {
        title: content.title,
        icon: this.props.type,
        color: content.color,
        titlePosition: content.titlePosition,
        textPosition: content.textPosition,
        text: content.text,
        iconPosition: content.iconPosition,
        textColor: content.textColor,
        titleColor: content.titleColor,
        titleFontSize: content.titleFontSize,
        textFontSize: content.textFontSize,
        iconFontSize: content.iconFontSize,
        isSaved: true
      };
    } else {
      this.state = {
        iconPosition: null,
        title: 'Support',
        color: null,
        titleColor: null,
        textColor: null,
        titlePosition: null,
        titleFontSize: null,
        textFontSize: null,
        textPosition: null,
        iconFontSize: null,
        icon: this.props.type,
        text: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        url: '#',
        isSaved: true
      };
    }
    this.getStyled = getStyled.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.handleChange = handleChange.bind(this);
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition);
    const textButton = getButtonType(this.state.textPosition);
    const iconButton = getButtonType(this.state.iconPosition);
    console.log('iconButton', this.state.iconPosition);
    return (
      <MDBCol md="4">
        {!noEdit ? <div className="del-button" onClick={() => this.props.delete(this)}>
          <MDBIcon icon="trash-alt" />
        </div> : null }

        <div className={ this.getStyled(this.state.iconPosition, 'text-control-item editable icon ')}>
          {this.props.fab ? <MDBIcon fab icon={this.state.icon} size="3x" className={this.state.color + ' ' + this.state.iconFontSize} />
            : <MDBIcon icon={this.state.icon} size="3x" className={this.state.color + ' ' + this.state.iconFontSize} />}
          {!noEdit ? (
            <div className=" row control-panel">
              <div name="color" value={this.state.color} onClick={(event) => this.changeColor(event, false)} className="filler-color">
                <MDBIcon icon="fill" />
              </div>

              <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="iconPosition" value={this.state.iconPosition} className="text-format-button">
                { iconButton }
              </div>

              <div name="iconFontSize" value={this.state.iconFontSize} onClick={(event) => this.changeFont(event, false)} className="filler-color">
                <i class="fas fa-plus-circle"></i>
              </div>
            </div>) : null }
        </div>

        <div className={ this.getStyled(this.state.titlePosition, 'text-control-item editable')}>
          <Editable
            onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
            edit={noEdit} styleName={'editable-title font-weight-bold my-4 ' + this.state.titleColor + ' ' + this.state.titleFontSize}
            text={this.state.title} type="input" value={this.state.title}>
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
              <div name="titleFontSize" value={this.state.titleFontSize} onClick={(event) => this.changeFont(event, false)} className="filler-color">
                <i class="fas fa-text-height"></i>
              </div>
            </div>) : null}

        </div>

        <div className={ this.getStyled(this.state.textPosition, 'text-control-item ') }>
          <Editable edit={noEdit} onKeyDown={(event) => this.saveTextInput(event, this.state.text, 'text')}
            styleName={ this.state.textColor ? 'mb-md-0 mb-5 ' + this.state.textColor : ' grey-text'}
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
              <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="textPosition" value={this.state.textPosition} className="text-format-button">
                { textButton }
              </div>
            </div>
          ) : null }
        </div>
      </MDBCol>
    );
  }
}

export default ServiceComponent;