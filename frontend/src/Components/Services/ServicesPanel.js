import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import Editable from '../Editable';
import '../Editable.css';

import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange } from '../TextFormater';
import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import ServiceComponent from './ServiceComponent';

class ButtonDrop extends React.Component {
  render () {
    return (
      <MDBBtnGroup>
        <MDBBtn color="info">
            Add Service Element
        </MDBBtn>
        <MDBDropdown>
          <MDBDropdownToggle caret color="info" />
          <MDBDropdownMenu color="info">
            <MDBDropdownItem onClick={() => this.props.add('comments')}>Support</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('node-js', true)}>NodeJS</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('react', true)}>React</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('book')}>Tutorial</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('palette')}>Artistic</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('american-sign-language-interpreting')}>Sign lenguage</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('brain')}>Brain</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('capsules')}>Medicine</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('chart-bar')}>Alanalitic</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('code-branch')}>Code-branch</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    );
  }
};

class ServicePanel extends Component {
  constructor (props) {
    super(props);
    const current = this.props.currentState;
    console.log('current state', current);
    if (current !== null) {
      this.state = {
        title: current.title,
        subtitle: current.subtitle,
        titlePosition: current.titlePosition,
        subtitlePosition: current.subtitlePosition,
        arrayOfCards: current.arrayOfCards
      };
    } else {
      this.state = {
        title: 'Why is it so great?',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam.',
        titlePosition: null,
        subtitlePosition: null,
        arrayOfCards: []
      };
    }
    this.handleChange = handleChange.bind(this);
    this.getStyled = getStyled.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.addService = this.addService.bind(this);
    this.deleteServiceCard = this.deleteServiceCard.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.updateService = this.updateService.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
  }

  updateService (component) {
    const newState = this.state;
    console.log('new component', component);
    console.log('id of component', component.props.id);
    const current = newState.arrayOfCards.find(el => el.props.id === component.props.id);
    const id = newState.arrayOfCards.indexOf(current);
    console.log('id', id);
    newState.arrayOfCards.splice(id, 1, <ServiceComponent
      fab = {component.props.fab}
      content={component.state}
      type = { component.props.type}
      delete = {this.deletServiceCard}
      update = {this.updateService}
      key={component.props.id}
      id={component.props.id}/>);
    console.log('add to arr', newState.arrayOfCards);
    this.setState(newState);
    this.props.update(this.state);
  }

  deleteServiceCard (lable) {
    const newState = this.state;
    const index = newState.arrayOfCards.findIndex(a => a.props.id === lable.props.id);
    console.log(index);
    if (index === -1) return;
    newState.arrayOfCards.splice(index, 1);
    console.log(this.state);
    this.setState(newState);
    this.props.update(this.state);
  };

  addService (type, isFab) {
    const { arrayOfCards } = this.state;
    console.log('add card', type);
    arrayOfCards.push(<ServiceComponent
      content={null}
      fab = {isFab}
      type = {type}
      update={this.updateService}
      key={arrayOfCards.length}
      id={arrayOfCards.length }
      delete={this.deleteServiceCard} />);
    this.setState(
      { arrayOfCards: arrayOfCards }
    );
    this.props.update(this.state);
    console.log('add services', this.state.arrayOfCards);
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition);
    const subtitleButton = getButtonType(this.state.subtitlePosition);
    const { arrayOfCards } = this.state;
    console.log('subtitlePosition', this.state.subtitlePosition);
    return (
      <div className="">

        <div className={ this.getStyled(this.state.titlePosition, 'text-control-item editable')}>
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} edit={noEdit}
            styleName={'editable-title  h1-responsive font-weight-bold my-5 ' + this.state.titleFontSize + ' ' + this.state.titleColor}
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
              <div name="titleColor" value={this.state.titleColor} onClick={(event) => this.changeColor(event, true)} className="filler-color">
                <MDBIcon icon="fill" />
              </div>
              <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                { titleButton }
              </div>
              <div name="titleFontSize" value={this.state.titleFontSize} onClick={ (event) => this.changeFont(event, true)} className="filler-color">
                <i class="fas fa-text-height"></i>
              </div>
            </div>
          ) : null}
        </div>

        <div className={ this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
          <Editable styleName={'editable-text lead grey-text w-responsive mx-auto mb-5 ' + this.state.subtitleColor + ' ' + this.state.subtitleFontSize}
            text={this.state.subtitle} edit={noEdit} type="input" value={this.state.subtitle}>
            <input
              name="subtitle"
              value={this.state.subtitle}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"/>
          </Editable>
          {!noEdit ? (
            <div className="row control-panel">
              <div name="subtitleColor" value={this.state.subtitleColor} onClick={(event) => this.changeColor(event, true)} className="filler-color">
                <MDBIcon icon="fill" />
              </div>
              <div onClick={(event) => this.onChangeTiTlePosition(event, false)} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
                { subtitleButton }
              </div>
              <div name="subtitleFontSize" value={this.state.subtitleFontSize} onClick={ (event) => this.changeFont(event, true)} className="filler-color">
                <i class="fas fa-text-height"></i>
              </div>
            </div>
          ) : null}
        </div>
        <hr/>
        {noEdit ? null : <ButtonDrop add = {this.addService}/>}
        <MDBRow>
          {
            arrayOfCards.map((el) => {
              return <ServiceComponent
                edit = {noEdit}
                fab = {el.props.fab}
                content={el.props.content}
                type={el.props.type}
                update={this.updateService}
                delete={this.deleteServiceCard}
                id = {el.props.id}
                key = {el.props.id}/>;
            })
          }
        </MDBRow>
      </div>
    );
  }
}

export default ServicePanel;
