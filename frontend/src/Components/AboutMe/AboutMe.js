import React, { useState } from 'react';
import { MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Editable from '../Editable';
import axios from 'axios';

class AboutMe extends React.Component {
  constructor (props) {
    super(props);
    console.log('start');

    this.state = {
      arrayOfCards: []
    };
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleSublmitAll = this.handleSublmitAll.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.saveChangedCard = this.saveChangedCard.bind(this);
  };

  removeCard (id) {
    const newState = this.state;
    console.log('remove');

    const index = newState.arrayOfCards.findIndex(a => a.props.id === id);
    console.log(index);
    if (index === -1) return;
    newState.arrayOfCards.splice(index, 1);
    console.log(this.state);
    this.setState(newState);
  };

  saveChangedCard (card) {
    console.log('save card');
    const newState = this.state;
    newState.arrayOfCards.slice(0, card.id, card);
    this.setState(newState);
  }

  async handleSublmitAll (event) {
    console.log('handleSubmit');
    this.setState({
      arrayOfCards: this.state.arrayOfCards
    });
    console.log('udate about', this.state);
  }

  handleAddCard (event) {
    const arr = this.state.arrayOfCards;
    arr.push(<AboutCard
      removeCard={this.removeCard.bind(this)}
      saveChangedCard={this.saveChangedCard.bind(this)}
      key={ arr.length }
      id={ arr.length } />);
    this.setState(
      { arrayOfCards: arr }
    );
  }

  render () {
    const { arrayOfCards } = this.state;
    let cards;
    if (arrayOfCards.length === 0) {
      cards = <AboutCard saveChangedCard={this.saveChangedCard.bind(this)} removeCard={this.removeCard.bind(this)} id={ 0 } key={0} />;
      arrayOfCards.push(cards);
    }
    return (
      <div className="about-conteiner">
        <div className="add-card-button-group">
          <MDBBtn onClick={ this.handleAddCard } outline color="primary">Add Card</MDBBtn>
          <MDBBtn onClick={ this.handleSublmitAll } outline color="success">Save Changes</MDBBtn>

        </div>

        <div className="SomeDetails">
          { arrayOfCards.map((el) => {
            return el;
          })}
        </div>
      </div>
    );
  }
};

class AboutCard extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: 'Alison Belmont',
      subTitle: 'Graffiti Artist',
      primaryText: 'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque \nlaudantium, totam rem aperiam.'

    };
    this.upload = this.upload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.textInput = React.createRef();
  };

  upload () {
    document.getElementById('selectImage').click();
  };

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render () {
    return (
      <div className="card card-element">
        <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
        <div className="card-body">
          <div className="md-form">
            <div className="file-field">
              <div className="btn btn-primary btn-sm float-left" value="Browse..." onClick={this.upload}>
                <span>Choose Photo</span>
                <input id='selectImage' hidden type="file" multiple/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
              </div>
            </div>
          </div>

          <Editable childRef={ this.textInput} className="card-title" text={this.state.title} type="input">
            <input ref={ this.textInput } name="title" value={this.state.title} onChange={this.handleChange} type="text" id="inputPrefilledEx" className="form-control"/>
          </Editable>

          <Editable type="text" className="card-text" text={this.state.subTitle}>
            <input value={this.state.subTitle} name="subTitle" type="text" className="form-control"/>
          </Editable>

          <Editable type="text" className="card-text" text={this.state.primaryText}>
            <input value={this.state.primaryText} name="primaryText" type="text" className="form-control" onChange={this.handleChange}/>
          </Editable>
          <a href="#" onClick={() => this.props.saveChangedCard(this)} className="btn btn-primary">Save</a>
          <a href="#" onClick={() => this.props.removeCard(this.props.id)} className="btn btn-danger">Delete</a>

        </div>
      </div>
    );
  }
};

export default AboutMe;
