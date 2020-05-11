import React, { Component } from 'react';

import axios from 'axios';

export default class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      loginErrors: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit (event) {
    console.log('login');
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.pssword
    },
    { withCredentials: true, port: 4000 }).then(response => {
      console.log('login', response);
    })
      .catch(error => {
        console.log('error ', error);
      });
  };

  render () {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={'./login.svg'}/>
          </div>
          <form className="form" >

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                placeholder="yourname"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />

            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="yourPassword"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

          </form>

        </div>

        <div className="footer">
          <button type="submit" onClick={this.handleSubmit} className="btn">Login</button>
        </div>
      </div>

    );
  };
}
