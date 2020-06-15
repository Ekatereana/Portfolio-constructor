import React, { Component } from 'react';
import './Projects.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable/Editable';

import axios from 'axios';
import RowComponent from './RowComponent';
import { getButtonType, getStyled, saveTextInput, changeFont, changeColor, onChangeTiTlePosition, handleChange, changeStyle } from '../../helpers/TextFormater';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';
import EditablePanel from '../EditablePanel/EditablePanel';

class Projects extends Component {
  constructor (props) {
    super(props);
    console.log('start');
    const { user } = this.props;

    this.state = {
      user: user
    };
    console.log('start state', user);
    this.handleSublmitAll = this.handleSublmitAll.bind(this);
    this.updateState = this.updateState.bind(this);
  };

  updateState (className, newState) {
    const { user } = this.state;
    console.log('new state', newState);
    switch (className) {
      case 'best':
        if (!user.portfolio) {
          user.portfolio = {
            best: null,
            casual: null
          };
        };
        user.portfolio.best = newState;
        break;
    }
    this.setState(user);
  }

  async handleSublmitAll (portfolio) {
    console.log('handleSubmit');
    const { user } = this.state;
    user.portfolio = portfolio;
    this.setState(user);
    console.log('udate user ', user);

    axios.post('/update', {
      user: user
    },
    { port: 4000, withCredentials: true }).then(response => {
      console.log('sucess', response);
      this.props.handleUser(response.data);
      console.log(JSON.parse(sessionStorage.getItem('user')));
    })
      .catch(error => {
        console.log('error ', error);
      });
    console.log('udate user portfolio', this.state.user.portfolio);
  }

  render () {
    let { portfolio } = this.state.user;
    const noEdit = this.props.preview;
    if (!portfolio) {
      portfolio = {
        best: null,
        casual: null
      };
    }
    return (
      <div className="portfolio-container">
        {!noEdit ? <button type="button" onClick={() => this.handleSublmitAll(portfolio)} className="btn no-l-mg btn-info waves-effect">SUBMIT ALL</button> : null}
        <Best edit={noEdit} currentState={portfolio.best} update={this.updateState} sumit={this.handleSublmitAll}/>
      </div>
    );
  }
};

class Best extends Component {
  constructor (props) {
    super(props);
    const current = this.props.currentState;
    if (current) {
      this.state = {
        title: current.title,
        subtitle: current.subtitle,
        titlePosition: current.titlePosition,
        subtitlePosition: current.subtitlePosition,
        arrayOfCards: current.arrayOfCards,
        titleColor: current.titleColor,
        titleStyle: current.titleStyle,
        subtitleColor: current.subtitleColor,
        subtitleStyle: current.subtitleStyle,
        subtitleFontSize: current.subtitleFontSize,
        titleFontSize: current.titleFontSize
      };
    } else {
      this.state = {
        title: 'Our best projects',
        subtitle: 'TYPE SOME TEXT',
        titlePosition: null,
        subtitlePosition: null,
        arrayOfCards: [],
        titleColor: null,
        subtitleColor: null,
        subtitleFontSize: null,
        titleFontSize: null
      };
    }
    this.handleChange = handleChange.bind(this);
    this.getStyled = getStyled.bind(this);
    this.onChangeTiTlePosition = onChangeTiTlePosition.bind(this);
    this.addBestCard = this.addBestCard.bind(this);
    this.deleteBestCard = this.deleteBestCard.bind(this);
    this.saveTextInput = saveTextInput.bind(this);
    this.updateRowComponent = this.updateRowComponent.bind(this);
    this.changeColor = changeColor.bind(this);
    this.changeFont = changeFont.bind(this);
    this.changeStyle = changeStyle.bind(this);
  }

  updateRowComponent (component) {
    const newState = this.state;
    console.log('new component', component);
    console.log('id of component', component.props.id);
    const current = newState.arrayOfCards.find(el => el.props.id === component.props.id);
    const id = newState.arrayOfCards.indexOf(current);
    console.log('id', id);
    newState.arrayOfCards.splice(id, 1, <RowComponent
      content={component.state}
      delete = {this.deleteBestCard}
      update = {this.updateRowComponent}
      key={component.props.id}
      id={component.props.id}/>);
    console.log('add to arr', newState.arrayOfCards);
    this.setState(newState);
    this.props.update('best', this.state);
  }

  addBestCard () {
    const { arrayOfCards } = this.state;
    console.log('add card');
    arrayOfCards.push(<RowComponent
      content={null}
      update={this.updateRowComponent}
      key={arrayOfCards.length}
      id={arrayOfCards.length }
      delete={this.deleteBestCard} />);
    this.setState(
      { arrayOfCards: arrayOfCards }
    );
    this.props.update('best', this.state);
    console.log('add social', this.state.arrayOfCards);
  }

  deleteBestCard (lable) {
    const newState = this.state;
    const index = newState.arrayOfCards.findIndex(a => a.props.id === lable.props.id);
    console.log(index);
    if (index === -1) return;
    newState.arrayOfCards.splice(index, 1);
    console.log(this.state);
    this.setState(newState);
    this.props.update('best', this.state);
  }

  render () {
    const noEdit = this.props.edit;
    const titleButton = getButtonType(this.state.titlePosition);
    const subtitleButton = getButtonType(this.state.subtitlePosition);
    const { arrayOfCards } = this.state;
    console.log('array of components', arrayOfCards);
    return (
      <div className="best-container">
        <hr/>
        <section className="dark-grey-text editable ">
          <div className="best-header">
            <div className={ this.getStyled(this.state.titlePosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title', 'best')}
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
                  isParent="best"/>
              ) : null}
            </div>

            <div className={ this.getStyled(this.state.subtitlePosition, 'text-control-item ')}>
              <Editable styleName={'editable-text card-text ' + this.state.subtitleFontSize + ' ' + this.state.subtitleColor + ' ' + this.state.subtitleStyle }
                onKeyDown={(event) => this.saveTextInput(event, this.state.subtitle, 'subtitle', 'best')} text={this.state.subtitle} edit={noEdit} type="input" value={this.state.subtitle}>
                <input
                  name="subtitle"
                  value={this.state.subtitle}
                  onChange={this.handleChange}
                  type="text"
                  id="inputPrefilledEx"/>
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
                  changeStyle ={this.changeStyle}
                  onChangeTiTlePosition = {this.onChangeTiTlePosition}
                  isParent="best"/>
              ) : null}
            </div>
          </div>
          <hr/>
          {!noEdit ? <button type="button" onClick={this.addBestCard} className="btn no-l-mg btn-info">ADD NEW PROJECT</button> : null }
          <div className="row">
            {
              arrayOfCards.map((el) => {
                return <RowComponent
                  edit = {noEdit}
                  content={el.props.content}
                  update={this.updateRowComponent}
                  delete={this.deleteBestCard}
                  uploadFile={this.uploadFile}
                  id = {el.props.id}
                  key = {el.props.id}/>;
              })
            }
          </div>

        </section>
      </div>
    );
  }
}

class ButtonDrop extends React.Component {
  render () {
    return (
      <MDBBtnGroup>
        <MDBBtn color="secondary">
            Add Portfolio Card
        </MDBBtn>
        <MDBDropdown>
          <MDBDropdownToggle caret color="secondary" />
          <MDBDropdownMenu color="secondary">
            <MDBDropdownItem onClick={() => this.props.add('best-card')}>BEST-project</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('best-card')} >BASIC-project</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    );
  }
};

export default Projects;
export { Best };
