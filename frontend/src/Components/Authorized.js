import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Conteiner from './Conteiner/Conteiner';
import './Conteiner/Conteiner.css';

import Main from './Main/Main';
import './Main/Main.css';

import CreateAll from './Create/Create';
import './Create/Create.css';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

function Authorized () {
  const [value, setValue] = useStateWithLocalStorage(
    'user'
  );

  const handleUser = (user) => {
    localStorage.setItem('user', user);
    setValue(user);
  };
  let content;
  const isAuthorized = value;
  if (isAuthorized) {
    content =
     <Router>
       <Route path="/create" render={props => <CreateAll user={value} /> }/>
       <Route path="/main" component={ Main }/>
     </Router>;
  } else {
    content =
     <Router>
       <Route path="/(create|registration)/" render={props => <Conteiner handleUser={handleUser} /> }/>
       <Route path="/main" component={ Main }/>
     </Router>;
  }
  return content;
};

export default Authorized;
