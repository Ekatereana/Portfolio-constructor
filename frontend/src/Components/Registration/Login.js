import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

export default class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      loginErrors: '',
      isRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    console.log(event.target.name);
  }

  handleSubmit (event) {
    console.log('login');
    axios.defaults.port = 4000;
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    },
    { port: 4000, withCredentials: true }).then(response => {
      console.log('user', response.data);
      this.props.handleUser(response.data);
    })
      .catch(error => {
        console.log('error ', error);
      });
    this.setState({
      isRedirect: true
    });
  };

  render () {
    if (this.state.isRedirect) {
      return <Redirect to='/create' />;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={'./login.svg'}/>
          </div>
          <form className="form" >

            <div className="form-group regist-title">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="yourEmail"
                value={this.state.email}
                onChange={this.handleChange}
                className="regist-title"
                required
              />

            </div>

            <div className="form-group regist-title">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="yourPassword"
                value={this.state.password}
                className="regist-title"
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
