'use strict';

var e = React.createElement;

var Menu = function Menu(props) {
  return React.createElement(
    'div',
    { className: 'Menu' },
    React.createElement(
      'ul',
      null,
      'About'
    ),
    React.createElement(
      'ul',
      null,
      'Create'
    ),
    React.createElement(
      'ul',
      null,
      'Account'
    )
  );
};

var domContainer = document.querySelector('root');
ReactDOM.render(e(Menu), domContainer);