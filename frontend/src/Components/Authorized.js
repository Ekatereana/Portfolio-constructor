import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Conteiner from './Conteiner/Conteiner';
import './Conteiner/Conteiner.css';

import Main from './Main/Main';
import './Main/Main.css';

import Header from './Header/Header';

import CreateAll from './Create/Create';
import './Create/Create.css';

const useStateWithsessionStorage = SessionStorageKey => {
  if (sessionStorage.getItem(SessionStorageKey) == null) {
    sessionStorage.setItem(SessionStorageKey, null);
  }
  const [value, setValue] = React.useState(
    sessionStorage.getItem(SessionStorageKey) || ''
  );

  React.useEffect(() => {
    sessionStorage.setItem(SessionStorageKey, value);
  }, [value]);
  return [value, setValue];
};

function Authorized () {
  let [value, setValue] = useStateWithsessionStorage('user');

  const handleUser = (user) => {
    console.log('handle');
    setValue(JSON.stringify(user));
    sessionStorage.setItem('user', JSON.stringify(user));
  };
  value = JSON.parse(value);
  let content;
  const isAuthorized = value;
  if (isAuthorized) {
    content =
     <Router>
       <Header isAuthorized={isAuthorized} />
       <div className="vertical-panel">
         <Route path="/create" render={props => <CreateAll handleUser={handleUser} user={value} /> }/>
         <Route path="/main" component={ Main }/>
       </div>
     </Router>;
  } else {
    content =
     <Router>
       <Header isAuthorized={isAuthorized}/>
       <div className="vertical-panel">
         <Route path="/registration" render={props => <Conteiner handleUser={handleUser} /> }/>
       </div>
     </Router>;
  }
  return content;
};

export default Authorized;
