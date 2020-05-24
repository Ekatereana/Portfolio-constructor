import React from 'react';
import './Create.css';

import About from '../AboutMe/AboutMe';
import '../AboutMe/AboutMe.css';

import { MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from '../Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import '..//HomePage/HomePage.css';

import Projects from '../Projects/Projects';
import '../Projects/Projects.css';

import Services  from '../Services/Services';
import '../Services/Services.css'
class CreateAll extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      arrayOfElements: [],
      isCustom: true
    };
  }

  render () {
    const user = this.props.user;
    return (
      <Router>
        <Header isCustom={this.state.isCustom} />
        <Route path="/create/home" exact render={props => <HomePage handleUser={this.props.handleUser} user = {user}/>}/>
        <Route path="/create/portfolio" exact render={props => <Projects handleUser={this.props.handleUser} user = {user}/>}/>
        <Route path="/create/about" exact render={props => <About handleUser={this.props.handleUser} user = {user}/>} />
        <Route path="/create/services" exact render={props => <Services handleUser={this.props.handleUser} user = {user}/>} />
        <Route path="/create/" exact component={CreatePlaceHolder} />
      </Router>
    );
  }
};

class CreatePlaceHolder extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isRedirect: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit () {
    console.log('to preview');
    this.setState({
      isRedirect: true
    });
  };

  render () {
    if (this.state.isRedirect) {
      return <Redirect to="/preview/" />;
    }

    return (
      <div className="card create-filler">

        <section className="dark-grey-text">

          <div className="row pr-lg-5">
            <div className="col-md-7 mb-4">

              <div className="view">
                <img src="create.png" className="img-fluid" alt="smaple image"/>
              </div>

            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div>
                <h3 className="font-weight-bold mb-4">Create your personal portfolio-web site with US</h3>

                <p>Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus, fugiat eum soluta blanditiis adipisci, velit dolore magnam.</p>

                <button type="button" onClick={this.onSubmit} className="btn btn-secondary">to Preview</button>

              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
}

class ButtonDrop extends React.Component {
  render () {
    return (
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuMenu" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuMenu">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>
    );
  }
}

export default CreateAll;
export { ButtonDrop, CreatePlaceHolder };
