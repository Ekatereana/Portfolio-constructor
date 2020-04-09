'use strict'

const e = React.createElement;

const Menu = props => {
  return <div className="Menu">
    <ul>About</ul>
    <ul>Create</ul>
    <ul>Account</ul>
  </div>
}

const domContainer = document.querySelector('root');
ReactDOM.render(e(Menu), domContainer);
