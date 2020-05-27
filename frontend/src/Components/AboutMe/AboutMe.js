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
    this.removeCard(card);
    newState.arrayOfCards.push(<AboutCard
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
    console.log('about', about);
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
    console.log('udate user about', this.props.user);
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
                <MDBBtn onClick={ this.handleAddCard } outline color="primary">Add Card</MDBBtn>
                <MDBBtn onClick={ () => this.handleSublmitAll(this.state) } outline color="success">Save Changes</MDBBtn>
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

class AboutCard extends React.Component {
  constructor (props) {
    super(props);

    const content = this.props.content;

    if (content) {
      this.state = {
        title: content.title,
        img: content.img,
        titlePosition: content.titlePosition,
        primaryText: content.primaryText,
        subtitlePosition: content.subtitlePosition,
        primaryTextPosition: content.primaryTextPosition,
        subTitle: content.subTitle
      };
    } else {
      this.state = {
        img: 'https://mdbootstrap.com/img/Photos/Others/images/43.jpg',
        title: 'Alison Belmont',
        subTitle: 'Graffiti Artist',
        titlePosition: null,
        subtitlePosition: null,
        primaryTextPosition: null,
        primaryText: 'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque \nlaudantium, totam rem aperiam.'
      };
    }

    this.getStyled = this.getStyled.bind(this);
    this.saveTextInput = this.saveTextInput.bind(this);
    this.onChangeTiTlePosition = this.onChangeTiTlePosition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  };

  upload (id) {
    document.getElementById('selectImage' + id).click();
  };

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
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

  render () {
    const noEdit = this.props.edit;
    const titleButton = this.getButtonType(this.state.titlePosition ? this.state.titlePosition : null);
    const subtitleButton = this.getButtonType(this.state.subtitlePosition ? this.state.subtitlePosition : null);
    let buttons;
    if (!noEdit) {
      buttons =
       <div className="footer max-h-10">
         <a href="#" onClick={() => this.props.update(this)} className="btn btn-primary">Save</a>
         <a href="#" onClick={() => this.props.delete(this)} className="btn btn-danger">Delete</a>
         <div className="btn btn-info" value="Browse..."
           onClick={() => { this.upload(this.props.id); }}>
           <span>Choose Photo</span>
           <div className="file-path-wrapper">
             <input id={'selectImage' + this.props.id} hidden type="file" onChange={this.uploadFile }/>
           </div>
         </div>
       </div>;
    }

    return (
      <div className="card card-element">
        <img className="card-img-top" src={this.state.img} alt="Card image cap"/>
        <div className="card-body">
          <div className={this.getStyled(this.state.titlePosition, 'text-control-item title-row editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.title, 'title')} styleName="editable-title" edit={noEdit} text={this.state.title} type="input" value={this.state.title}>

              <input
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"
                className="card-title"/>
            </Editable>
            {!noEdit ? (
              <div onClick={this.onChangeTiTlePosition} name="titlePosition" value={this.state.titlePosition} className="text-format-button">
                { titleButton }
              </div>
            ) : null}
          </div>

          <div className={this.getStyled(this.state.subtitlePosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.subTitle, 'subtitle')} styleName="card-text"  edit={noEdit} text={this.state.subTitle} type="input" value={this.state.subtitle}>

              <input
                name="subtitle"
                value={this.state.subTitle}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"
                className="card-title"/>
            </Editable>
            {!noEdit ? (
              <div onClick={this.onChangeTiTlePosition} name="subtitlePosition" value={this.state.subTitlePosition} className="text-format-button">
                { subtitleButton }
              </div>
            ) : null}

          </div>

          <div className={this.getStyled(this.state.primaryTextPosition, 'text-control-item editable')}>
            <Editable onKeyDown={(event) => this.saveTextInput(event, this.state.primaryText, 'primaryText')} edit={noEdit} styleName="card-text" text={this.state.primaryText} type="input" value={this.state.primaryText}>

              <input
                name="primaryText"
                value={this.state.primaryText}
                onChange={this.handleChange}
                type="text"
                id="inputPrefilledEx"
                className="card-title"/>
            </Editable>
            {!noEdit ? (
              <div onClick={this.onChangeTiTlePosition} name="subtitlePosition" value={this.state.subTitlePosition} className="text-format-button">
                { subtitleButton }
              </div>
            ) : null}

          </div>
          {buttons}
        </div>
      </div>
    );
  }
};

export default AboutMe;
export { AboutCard };
