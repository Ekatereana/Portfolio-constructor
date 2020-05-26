import React, { Component } from 'react';
import './Services.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';
import '../Editable.css';

import axios from 'axios';
import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBDropdownToggle, MDBDropdownItem, MDBBtnGroup, MDBDropdown, MDBDropdownMenu } from 'mdbreact';

class Services extends Component {
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

  updateState (newState) {
    const { user } = this.state;
    console.log('new state', newState);

    if (!user.services) {
      user.services = {
        servicesPanel: {
          title: 'Why is it so great?',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam.',
          titlePosition: null,
          subtitlePosition: null,
          arrayOfCards: []
        }
      };
    };
    user.services.servicesPanel = newState;
    this.setState(user);
    console.log('upate user', this.state.user);
  }

  async handleSublmitAll (services) {
    console.log('handleSubmit');
    const { user } = this.state;
    console.log('services: ', services);
    user.services = services;
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
    console.log('udate user services', this.state.user.services);
  }

  render () {
    let { services } = this.state.user;
    console.log('services', services);
    if (!services) {
      services = {
        servicesPanel: null
      };
    }
    return (
      <section className="services-card my-5">
        <button type="button" onClick={() => this.handleSublmitAll(services)} className="btn no-l-mg btn-info waves-effect">SUBMIT ALL</button>
        <hr/>
        <ServicePanel currentState={ services.servicesPanel } update={this.updateState} sumit={this.handleSublmitAll}/>
        <hr/>
      </section>
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
    this.handleChange = this.handleChange.bind(this);
    this.getStyled = this.getStyled.bind(this);
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
    this.addService = this.addService.bind(this);
    this.deleteServiceCard = this.deleteServiceCard.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
    this.updateService = this.updateService.bind(this);
    // this.updateRowComponent = this.updateRowComponent.bind(this);
  }

  updateService (component) {
    const newState = this.state;
    console.log('new component', component);
    console.log('id of component', component.props.id);
    const current = newState.arrayOfCards.find(el => el.props.id === component.props.id);
    const id = newState.arrayOfCards.indexOf(current);
    console.log('id', id);
    this.deleteServiceCard(component);
    newState.arrayOfCards.push(<ServiceComponent
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

  addService (type) {
    const { arrayOfCards } = this.state;
    console.log('add card', type);
    arrayOfCards.push(<ServiceComponent
      content={null}
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

  saveTextInput (event, input, element) {
    if (event.key === 'Enter') {
      const newState = this.state;
      newState[element] = input;
      this.setState(newState);
      this.props.update(this.state);
    };
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getStyled (position, styles) {
    let styleHeader;
    switch (position) {
      case null:
        styleHeader = 'text-center';
        break;
      case 'text-center':
        styleHeader = 'text-center';
        break;
      case 'text-left':
        styleHeader = 'text-left';
        break;
      case 'text-right':
        styleHeader = 'text-right';
        break;
    };
    return styleHeader + ' ' + styles;
  };

  onChangeTiTlePosition (event) {
    const newState = this.state;
    switch (event.currentTarget.getAttribute('value')) {
      case 'text-center':
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
      case 'text-left':
        newState[event.currentTarget.getAttribute('name')] = 'text-right';
        break;
      case 'text-right':
        newState[event.currentTarget.getAttribute('name')] = 'text-center';
        break;
      case null:
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
    }
    this.setState(newState);
    console.log('change-position', this.state);
    this.props.update(this.state);
    console.log(this.state);
  }

  getButtonType (value) {
    let titleButton;
    switch (value) {
      case 'text-center':
        titleButton = <i className="fas fa-align-center"></i>;
        break;
      case 'text-left':
        titleButton = <i className="fas fa-align-left"></i>;
        break;
      case 'text-right':
        titleButton = <i className="fas fa-align-right"></i>;
        break;
      case null:
        titleButton = <i className="fas fa-align-center"></i>;
        break;
    };
    return titleButton;
  }

  render () {
    const titleButton = this.getButtonType(this.state.titlePosition);
    const subtitleButton = this.getButtonType(this.state.subtitlePosition);
    const { arrayOfCards } = this.state;
    console.log('array of components', arrayOfCards);
    return (
      <div className="">

        <div className={ this.getStyled(this.state.titlePosition, 'text-control-item editable')}>
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName='editable-title  h1-responsive font-weight-bold my-5' text={this.state.title} type="input" value={this.state.title}>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"/>
          </Editable>
          <div onClick={this.onChangeTiTlePosition} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
            { titleButton }
          </div>
        </div>

        <div className={ this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
          <Editable styleName={'editable-text lead grey-text w-responsive mx-auto mb-5' + this.getStyled} text={this.state.subtitle} type="input" value={this.state.subtitle}>
            <input
              name="subtitle"
              value={this.state.subtitle}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"/>
          </Editable>
          <div onClick={this.onChangeTiTlePosition} name="subtitlePosition" value={this.state.subtitlePosition} className="text-format-button">
            { subtitleButton }
          </div>
        </div>
        <hr/>
        <ButtonDrop add = {this.addService}/>
        <MDBRow>
          {
            arrayOfCards.map((el) => {
              return <ServiceComponent
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

class ButtonDrop extends React.Component {
  render () {
    return (
      <MDBBtnGroup>
        <MDBBtn color="info">
            Add Portfolio Card
        </MDBBtn>
        <MDBDropdown>
          <MDBDropdownToggle caret color="info" />
          <MDBDropdownMenu color="info">
            <MDBDropdownItem onClick={() => this.props.add('comments')}>Support</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('book')}>Tutorial</MDBDropdownItem>
            <MDBDropdownItem onClick={() => this.props.add('palette')}>Artistic</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBBtnGroup>
    );
  }
};

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
        isSaved: true
      };
    } else {
      this.state = {
        iconPosition: null,
        title: 'Support',
        color: null,
        titlePosition: null,
        textPosition: null,
        icon: this.props.type,
        text: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        url: '#',
        isSaved: true
      };
    }
    this.getStyled = this.getStyled.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeColor (event) {
    console.log('change position');
    console.log(event.currentTarget.getAttribute('name'));
    const newState = this.state;
    switch (event.currentTarget.getAttribute('value')) {
      case 'orange-text':
        newState[event.currentTarget.getAttribute('name')] = 'blue-text';
        break;
      case 'blue-text':
        newState[event.currentTarget.getAttribute('name')] = 'red-text';
        break;
      case 'red-text':
        newState[event.currentTarget.getAttribute('name')] = 'orange-text';
        break;
      case null:
        newState[event.currentTarget.getAttribute('name')] = 'orange-text';
        break;
    }
    newState.isSaved = false;
    this.setState(newState);
    this.props.update(this);
  }

  getStyled (position, styles) {
    let styleHeader;
    switch (position) {
      case null:
        styleHeader = 'text-center';
        break;
      case 'text-center':
        styleHeader = 'text-center';
        break;
      case 'text-left':
        styleHeader = 'text-left';
        break;
      case 'text-right':
        styleHeader = 'text-right';
        break;
    };
    return styleHeader + ' ' + styles;
  };

  onChangeTiTlePosition (event) {
    console.log('change position');
    console.log(event.currentTarget.getAttribute('name'));
    const newState = this.state;
    switch (event.currentTarget.getAttribute('value')) {
      case 'text-center':
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
      case 'text-left':
        newState[event.currentTarget.getAttribute('name')] = 'text-right';
        break;
      case 'text-right':
        newState[event.currentTarget.getAttribute('name')] = 'text-center';
        break;
      case null:
        newState[event.currentTarget.getAttribute('name')] = 'text-left';
        break;
    }
    newState.isSaved = false;
    this.setState(newState);
    this.props.update(this);
  }

  getButtonType (value) {
    let titleButton;
    switch (value) {
      case 'text-center':
        titleButton = <i className="fas fa-align-center"></i>;
        break;
      case 'text-left':
        titleButton = <i className="fas fa-align-left"></i>;
        break;
      case 'text-right':
        titleButton = <i className="fas fa-align-right"></i>;
        break;
      case null:
        titleButton = <i className="fas fa-align-center"></i>;
        break;
    };
    return titleButton;
  }

  saveTextInput (event, input, element) {
    if (event.key === 'Enter') {
      const newState = this.state;
      newState[element] = input;
      newState.isSaved = false;
      this.setState(newState);
      this.props.update(this);
    };
  }

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value,
      isSaved: false
    });
  };

  render () {
    const titleButton = this.getButtonType(this.state.titlePosition);
    const textButton = this.getButtonType(this.state.textPosition);
    const iconButton = this.getButtonType(this.state.iconPosition);
    console.log('iconButton', this.state.iconPosition);
    return (
      <MDBCol md="4">
        <div className="del-button" onClick={() => this.props.delete(this)}>
          <MDBIcon icon="trash-alt" />
        </div>
        <div className={ this.getStyled(this.state.iconPosition, 'text-control-item editable ')}>
          <div name="color" value={this.state.color} onClick={this.changeColor} className="filler-color">
            <MDBIcon icon="fill" />
          </div>
          <MDBIcon icon={this.state.icon} size="3x" className={this.state.color} />
          <div onClick={this.onChangeTiTlePosition} name="iconPosition" value={this.state.iconPosition} className="text-format-button">
            { iconButton }
          </div>
        </div>
        <div className={ this.getStyled(this.state.titlePosition, 'text-control-item editable')}>
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName='editable-title font-weight-bold my-4' text={this.state.title} type="input" value={this.state.title}>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              id="inputPrefilledEx"/>
          </Editable>
          <div onClick={this.onChangeTiTlePosition} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
            { titleButton }
          </div>
        </div>

        <div className={ this.getStyled(this.state.textPosition, 'text-control-item ')}>
          <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.text, 'text')}
            styleName='grey-text mb-md-0 mb-5'
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
          <div onClick={this.onChangeTiTlePosition} name="textPosition" value={this.state.textPosition} className="text-format-button">
            { textButton }
          </div>
        </div>
      </MDBCol>
    );
  }
}

export default Services;
export { ServiceComponent, ServicePanel };
