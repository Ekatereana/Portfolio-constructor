import React, { useState } from 'react';
import { MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Editable from '../Editable';
import axios from 'axios';
import AboutCard from './AboutCard';

class AboutMe extends React.Component {
  constructor (props) {
    super(props);
    console.log('start');

    let cards = [];
    if (this.props.user.aboutMe) {
      cards = this.props.user.aboutMe.arrayOfCards;
    }

    this.state = {
      arrayOfCards: cards
    };
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleSublmitAll = this.handleSublmitAll.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.saveChangedCard = this.saveChangedCard.bind(this);
  };

  removeCard (id) {
    const newState = this.state;
    console.log('remove');

    const index = newState.arrayOfCards.findIndex(a => a.props.id === id.props.id);
    console.log(index);
    if (index === -1) return;
    newState.arrayOfCards.splice(index, 1);
    console.log(this.state);
    this.setState(newState);
  };

  saveChangedCard (card) {
    const newState = this.state;
    console.log('new card', card);
    console.log('id of component', card.props.id);
    const current = newState.arrayOfCards.find(el => el.props.id === card.props.id);
    const id = newState.arrayOfCards.indexOf(current);
    console.log('id', id);
    newState.arrayOfCards.splice(id, 1, <AboutCard
      content={card.state}
      delete = {this.removeCard}
      update = {this.saveChangedCard}
      key={card.props.id}
      id={card.props.id}/>);
    console.log('add to arr', newState.arrayOfCards);
    this.setState(newState);
  }

  async handleSublmitAll (about) {
    console.log('handleSubmit');
    const { user } = this.props;
    user.aboutMe = about;
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
  }

  handleAddCard (event) {
    let { arrayOfCards } = this.state;
    if (arrayOfCards == null) {
      arrayOfCards = [];
    }
    arrayOfCards.push(<AboutCard
      content = {null}
      delete={this.removeCard}
      update={this.saveChangedCard}
      key={ arrayOfCards.length }
      id={ arrayOfCards.length } />);
    this.setState(
      { arrayOfCards: arrayOfCards }
    );
  }

  render () {
    let { arrayOfCards } = this.state;
    const onEdit = this.props.preview;
    if (!arrayOfCards) {
      arrayOfCards = [];
    }
    return (
      <div className="about-conteiner">
        <div className="add-card-button-group">
          {onEdit ? null
            : (
              <div>
                <MDBBtn onClick={ this.handleAddCard } color="primary">Add Card</MDBBtn>
                <MDBBtn onClick={ () => this.handleSublmitAll(this.state) } color="info">Save Changes</MDBBtn>
              </div>
            )
          }

        </div>

        <div className="SomeDetails row">
          { arrayOfCards.map((el) => {
            return <AboutCard
              edit = {onEdit}
              content = {el.props.content}
              delete={this.removeCard}
              update={this.saveChangedCard}
              key={ el.props.id }
              id={ el.props.id } />;
          })}
        </div>
      </div>
    );
  }
};

export default AboutMe;
