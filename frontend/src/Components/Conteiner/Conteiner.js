import React from 'react';

import '../Registration/register-login.css';
import Login from '../Registration/Login';
import Register from '../Registration/Registration';

class Conteiner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount () {
    // Add .right by default
    this.rightSide.classList.add('right');
  }

  changeState () {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove('right');
      this.rightSide.classList.add('left');
    } else {
      this.rightSide.classList.remove('left');
      this.rightSide.classList.add('right');
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render () {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? 'Register' : 'Login';
    const currentActive = isLogginActive ? 'login' : 'register';
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login handleUser={this.props.handleUser} containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register handleUser={this.props.handleUser} containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default Conteiner;
