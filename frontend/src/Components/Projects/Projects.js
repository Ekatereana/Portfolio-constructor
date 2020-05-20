import React, { Component } from 'react';
import './Projects.css';

import { Route } from 'react-router-dom';
import Editable from '../Editable';

import axios from 'axios';
import { MDBBtn, MDBDropdown, MDBDropdownToggle,  MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
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
    console.log('current state', user.portfolio);
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
    if (!portfolio) {
      portfolio = {
        best: null,
        casual: null
      };
    }
    return (
      <div className="portfolio-container">
        <button type="button" onClick={() => this.handleSublmitAll(portfolio)} className="btn btn-outline-secondary waves-effect">SUBMIT ALL</button>
        <Best currentState={portfolio.best} update={this.updateState} sumit={this.handleSublmitAll}/>
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
        arrayOfCards: current.arrayOfCards
      };
    } else {
      this.state = {
        title: 'Our best projects',
        subtitle: 'TYPE SOME TEXT',
        titlePosition: null,
        subtitlePosition: null,
        arrayOfCards: []
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.getStyled = this.getStyled.bind(this);
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
    this.addBestCard = this.addBestCard.bind(this);
    this.deleteBestCard = this.deleteBestCard.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
  }

  addBestCard () {
    const { arrayOfCards } = this.state;
    console.log('add card');
    arrayOfCards.push(<RowComponent
      key={ arrayOfCards.length }
      id={ arrayOfCards.length }
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
        newState.titlePosition = 'text-left';
        break;
      case 'text-left':
        newState.titlePosition = 'text-right';
        break;
      case 'text-right':
        newState.titlePosition = 'text-center';
        break;
      case null:
        newState.titlePosition = 'text-left';
        break;
    }
    this.setState(newState);
    console.log('change-position', this.state);
    this.props.update('best', this.state);
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

  saveTextInput (event, input, element) {
    if (event.key === 'Enter') {
      const newState = this.state;
      newState[element] = input;
      this.setState(newState);
      this.props.update('best', this.state);
    };
  }

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render () {
    const titleButton = this.getButtonType(this.state.titlePosition);
    const subtitleButton = this.getButtonType(this.state.subtitlePosition);
    const { arrayOfCards } = this.state;
    console.log(subtitleButton);
    return (
      <div className="best-container">

        <section className="dark-grey-text editable ">
          <div className="best-header">
            <div className={ this.getStyled(this.state.titlePosition, 'text-control-item ')}>
              <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName='editable-title card-title' text={this.state.title} type="input" value={this.state.title}>
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

            <div className={ this.getStyled(this.state.subtitlePosition, 'text-control-item ')}>
              <Editable styleName={'editable-text card-text' + this.getStyled} text={this.state.subtitle} type="input" value={this.state.subtitle}>
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
          </div>
          <button type="button" onClick={this.addBestCard} className="btn btn-secondary">ADD NEW PROJECT</button>
          <div className="row">
            {
              arrayOfCards.map((el) => {
                return <RowComponent
                  delete={el.props.delete}
                  id = {el.props.id}
                  key = {el.props.key}/>;
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

class RowComponent extends Component {
  render () {
    return (
      <div className="col-md-6 mb-4">

        <div className="card compact">
          <div className="view overlay no-m">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg" alt="Card image cap"/>
          </div>
          <div className="right-side-arr " onClick={console.log('hey')}>
            <p class="hint-text"> Learn more</p>
            <i className="fas fa-chevron-circle-right arrow"></i>
          </div>
          <div className="card-body">
            <h4 className="card-title">Read more about my project</h4>
            <hr/>
            <p className="card-text text-muted font-weight-light">
            Some quick example text to build on the card title and make up the bulk of the card's content.
            Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <hr/>
            <button type="button" onClick={() => { this.props.delete(this); }} class="btn btn-danger">DELETE</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Projects;
export { Best, RowComponent };
