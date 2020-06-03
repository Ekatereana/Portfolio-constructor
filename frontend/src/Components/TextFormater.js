import React, { Component } from 'react';
import axios from 'axios';

function getButtonType (value) {
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

function changeFont (event, isParent) {
  console.log('change position');
  console.log(event.currentTarget.getAttribute('name'));
  const newState = this.state;
  let value = event.currentTarget.getAttribute('value');
  if (!value) {
    value = null;
  }
  switch (value) {
    case 'small-text':
      newState[event.currentTarget.getAttribute('name')] = 'middle-text';
      break;
    case 'middle-text':
      newState[event.currentTarget.getAttribute('name')] = 'big-text';
      break;
    case 'big-text':
      newState[event.currentTarget.getAttribute('name')] = 'huge-text';
      break;
    case 'huge-text':
      newState[event.currentTarget.getAttribute('name')] = 'plus-huge-text';
      break;
    case 'plus-huge-text':
      newState[event.currentTarget.getAttribute('name')] = 'mega-huge-text';
      break;
    case 'mega-huge-text':
      newState[event.currentTarget.getAttribute('name')] = 'small-text';
      break;
    case null:
      newState[event.currentTarget.getAttribute('name')] = 'middle-text';
      break;
  }
  newState.isSaved = false;
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function changeImageForm (event, isParent) {
  console.log('change img form');
  console.log(event.currentTarget.getAttribute('name'));
  const newState = this.state;
  let value = event.currentTarget.getAttribute('value');
  if (!value) {
    value = null;
  }
  switch (value) {
    case 'default':
      newState[event.currentTarget.getAttribute('name')] = 'reverse';
      break;
    case 'reverse':
      newState[event.currentTarget.getAttribute('name')] = 'default';
      break;
    case null:
      newState[event.currentTarget.getAttribute('name')] = 'default';
      break;
  }
  newState.isSaved = false;
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function changeImageOrientation (event, isParent) {
  console.log('change img orient');
  console.log(event.currentTarget.getAttribute('name'));
  const newState = this.state;
  let value = event.currentTarget.getAttribute('value');
  if (!value) {
    value = null;
  }
  switch (value) {
    case 'plain':
      newState[event.currentTarget.getAttribute('name')] = 'avatar-reverse';
      break;
    case 'avatar-reverse':
      newState[event.currentTarget.getAttribute('name')] = 'plain';
      break;
    case null:
      newState[event.currentTarget.getAttribute('name')] = '';
      break;
  }
  newState.isSaved = false;
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function changeOpacity (event, isParent) {
  console.log('change opacity');
  console.log(event.currentTarget.getAttribute('name'));
  const newState = this.state;
  let value = event.currentTarget.getAttribute('value');
  if (!value) {
    value = null;
  }
  switch (value) {
    case 'opacity-full':
      newState[event.currentTarget.getAttribute('name')] = 'opacity-middle';
      break;
    case 'opacity-middle':
      newState[event.currentTarget.getAttribute('name')] = 'opacity-null';
      break;
    case 'opacity-null':
      newState[event.currentTarget.getAttribute('name')] = 'opacity-full';
      break;
    case null:
      newState[event.currentTarget.getAttribute('name')] = 'opacity-full';
      break;
  }
  newState.isSaved = false;
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function changeColor (event, isParent) {
  console.log('change color');
  console.log(event.currentTarget.getAttribute('name'));
  const newState = this.state;
  switch (event.currentTarget.getAttribute('value')) {
    case 'grey-text':
      newState[event.currentTarget.getAttribute('name')] = 'orange-text';
      break;
    case 'orange-text':
      newState[event.currentTarget.getAttribute('name')] = 'blue-text';
      break;
    case 'blue-text':
      newState[event.currentTarget.getAttribute('name')] = 'pink-text';
      break;
    case 'pink-text':
      newState[event.currentTarget.getAttribute('name')] = 'cyan-text';
      break;
    case 'cyan-text':
      newState[event.currentTarget.getAttribute('name')] = 'indigo-text';
      break;
    case 'indigo-text':
      newState[event.currentTarget.getAttribute('name')] = 'amber-text';
      break;
    case 'amber-text':
      newState[event.currentTarget.getAttribute('name')] = 'red-text';
      break;
    case 'red-text':
      newState[event.currentTarget.getAttribute('name')] = 'green-text';
      break;
    case 'green-text':
      newState[event.currentTarget.getAttribute('name')] = 'black-text';
      break;
    case 'black-text':
      newState[event.currentTarget.getAttribute('name')] = 'white-text';
      break;
    case 'white-text':
      newState[event.currentTarget.getAttribute('name')] = 'grey-text';
      break;
    case null:
      newState[event.currentTarget.getAttribute('name')] = 'grey-text';
      break;
  }
  newState.isSaved = false;
  this.setState(newState);
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      console.log('isparent', isParent);
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function onChangeTiTlePosition (event, isParent) {
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
  this.setState(newState);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
}

function saveTextInput (event, input, element, isParent) {
  if (event.key === 'Enter') {
    const newState = this.state;
    newState[element] = input;
    newState.isSaved = false;
    this.setState(newState);
    if (isParent) {
      if (isParent !== true) {
        console.log('isparent', isParent);
        this.props.update(isParent, this.state);
      } else {
        console.log('My perent');
        this.props.update(this.state);
      }
    } else {
      this.props.update(this);
    }
  };
}

function handleChange (event) {
  console.log('change');
  this.setState({
    [event.target.name]: event.target.value,
    isSaved: false
  });
};

function getStyled (position, styles) {
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

function uploadFile ({ target: { files } }) {
  console.log('===HomePage file upload===');
  console.log('files: ', files);
  const file = files[0];
  console.log('file: ', file);

  const types = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (file && types.includes(file.type)) {
    const data = new FormData();
    data.append('image', file);
    console.log('data: ', data);
    axios.post('/upload/image',
      data,
      { port: 4000, withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      console.log('Processed results');
      console.log('frontend result: ', res);
      console.log('the link to the image: ', res.data.url);
      this.setState({
        img: res.data.url,
        noImg: false
      });
      console.log('new state after file upload', this.state);
      this.props.update('basicProfile', this.state);
    });
  } else {
    this.setState({
      noImg: true
    });
  }
}

export { getButtonType, getStyled, handleChange, saveTextInput, onChangeTiTlePosition, changeColor, changeFont, changeOpacity, uploadFile, changeImageForm, changeImageOrientation };
