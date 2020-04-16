import React, { Component } from 'react'
import './App.css'

class Menu extends Component {
  constructor () {
    super()
    this.state = {
      message: ''
    }
  }

  componentDidMount () {
    fetch('/home')
      .then(res => res.json())
      .then(result => this.setState({ message: result.message }, console.log(result)))
  }

  render () {
    return (
      <div className="App">
        {this.state.message}
      </div>
    )
  }
}

export default Menu
