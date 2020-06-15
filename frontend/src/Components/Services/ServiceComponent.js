import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import Editable from '../Editable/Editable';
import Draggable from 'react-draggable';
import { onStart, onStop, handleDrag } from '../../helpers/OnDrag';

import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange, changeStyle } from '../../helpers/TextFormater';
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import EditablePanel from '../EditablePanel/EditablePanel';

class ServiceComponent extends Component {
  constructor (props) {
    super(props);
    const content = this.props.content;

    if (content !== null) {
      this.state = {
        activeDrags: content.activeDrags,
        deltaPosition: content.deltaPosition,
        isDragged: content.isDragged,
        title: content.title,
        titleStyle: content.titleStyle,
        icon: this.props.type,
        iconColor: content.color,
        titlePosition: content.titlePosition,
        textPosition: content.textPosition,
        text: content.text,
        iconPosition: content.iconPosition,
        textColor: content.textColor,
        textStyle: content.textStyle,
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
        iconColor: null,
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
    this.changeStyle = changeStyle.bind(this);
    this.onStart = onStart.bind(this);
    this.onStop = onStop.bind(this);
    this.handleDrag = handleDrag.bind(this);
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition);
    const textButton = getButtonType(this.state.textPosition);
    const iconButton = getButtonType(this.state.iconPosition);
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    console.log('iconButton', this.state.iconPosition);
    return (
      <Draggable cancel={noEdit ? 'col-md-4' : ''} onDrag={!noEdit ? (event, ui) => this.handleDrag(event, ui, false) : null}
        defaultPosition={this.state.isDragged ? this.state.deltaPosition : { x: 0, y: 0 } } bounds={ { left: -100, right: 500, bottom: 100, top: -200 } } {...dragHandlers}>
        <MDBCol md="4">
          {!noEdit ? <div className="del-button" onClick={() => this.props.delete(this)}>
            <MDBIcon icon="trash-alt" />
          </div> : null }

          <div className={ this.getStyled(this.state.iconPosition, 'text-control-item editable icon ')}>
            {this.props.fab ? <MDBIcon fab icon={this.state.icon} size="3x" className={this.state.color + ' ' + this.state.iconFontSize} />
              : <MDBIcon icon={this.state.icon} size="3x" className={this.state.iconColor + ' ' + this.state.iconFontSize} />}
            {!noEdit ? (
              <EditablePanel name="icon"
                color={this.state.iconColor}
                size={this.state.iconFontSize}
                position={this.state.iconPosition}
                button={iconButton}
                changeColor = {this.changeColor}
                changeFont = {this.changeFont}
                plusSize = {true}
                onChangeTiTlePosition = {this.onChangeTiTlePosition}
                isParent={false}/>
            ) : null }
          </div>

          <div className={ this.getStyled(this.state.titlePosition, 'text-control-item editable')}>
            <Editable
              onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')}
              edit={noEdit} styleName={'c-title my-4 ' + this.state.titleColor + ' ' + this.state.titleFontSize + ' ' + this.state.titleStyle}
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

          <div className={ this.getStyled(this.state.textPosition, 'text-control-item editable') }>
            <Editable edit={noEdit} onKeyDown={(event) => this.saveTextInput(event, this.state.text, 'text')}
              styleName={ this.state.textColor ? 'mb-md-0 mb-5 ' + this.state.textColor + ' ' + this.state.textFontSize + ' ' + this.state.textPosition + ' ' + this.state.textStyle
                : ' grey-text' + ' ' + this.state.textStyle + ' ' + this.state.textFontSize + ' ' + this.state.textPosition}
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
            ) : null }
          </div>
        </MDBCol>
      </Draggable>
    );
  }
}

export default ServiceComponent;
