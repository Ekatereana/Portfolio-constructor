import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

export default class Registration extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      registrationErrors: '',
      isRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange (event) {
    console.log('change');
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit (event) {
    console.log('handleSubmit');
    axios.post('/auth/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }, { withCredentials: true, port: 4000 })
      .then(function (response) {
        console.log('added user in Registration');
        console.log(response);
        this.props.handleUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
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
        <div className="header">Registration</div>
        <div className="content">
          <div className="image">
            <img src={'./login.svg'}/>
          </div>
          <form className="form" onSubmit={this.handleSubmit}>

            <div className="form-group regist-title">
              <label htmlFor="username">Username</label>
              <input
                className="regist-title"
                type="text"
                name="name"
                placeholder="yourname"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />

            </div>

            <div className="form-group regist-title">
              <label htmlFor="email">Email</label>
              <input
                className="regist-title "
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group regist-title">
              <label htmlFor="password">Password</label>
              <input
                className="regist-title"
                type="password"
                name="password"
                placeholder="yourPassword"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group regist-title">
              <label htmlFor="password">Confirm password</label>
              <input
                className="regist-title"
                type="password"
                name="password_confirm"
                placeholder="confirm yourPassword"
                value={this.state.password_confirm}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">Register</button>
            </div>
          </form>

        </div>

      </div>

    );
  };
}
