import React, { Component } from 'react';

import axios from 'axios';

export default class Registration extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      registrationErrors: ''
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

  async handleSubmit (event) {
    console.log('handleSubmit');

    axios.post('/auth/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }, { withCredentials: true, port: 4000 })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render () {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Registration</div>
        <div className="content">
          <div className="image">
            <img src={'./login.svg'}/>
          </div>
          <form className="form" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="regist-title"
                type="text"
                name="name"
                placeholder="Your name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />

            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="regist-title"
                type="email"
                name="email"
                placeholder="your_email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="regist-title"
                type="password"
                name="password"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm password</label>
              <input
                className="regist-title"
                type="password"
                name="password_confirm"
                placeholder="Confirm Your password"
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
