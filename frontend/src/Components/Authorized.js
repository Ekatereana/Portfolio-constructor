import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Conteiner from './Conteiner/Conteiner';
import './Conteiner/Conteiner.css';

import Main from './Main/Main';
import './Main/Main.css';

import AboutUs from './AboutUs/AboutUs';

import Header from './Header/Header';

import Preview from './Preview/Preview';

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

  let [preview, setPreview] = useStateWithsessionStorage('preview');

  const handleUser = (user) => {
    console.log('handle', user);
    setValue(JSON.stringify(user));
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  const handlePreview = (preview) => {
    console.log('handle');
    setPreview(JSON.stringify(preview));
    sessionStorage.setItem('preview', JSON.stringify(preview));
    console.log('preview value', preview);
    if (preview !== null) {
      console.log('preview value', preview);
      return <Redirect to="/preview/" />;
    } else {
      return <Redirect to="/create/" />;
    };
  };
  value = JSON.parse(value);
  preview = JSON.parse(preview);
  console.log('AUTH', preview);
  let content;
  const isAuthorized = value;
  if (isAuthorized) {
    if (preview) {
      content =
      <Router>
        <Header handlePreview = {handlePreview} isAuthorized={isAuthorized} preview = {preview}/>
        <Route path="/aboutUS" render={props => <AboutUs />}/>
        <Route exact path="/preview/" render={props => <Preview preview = {preview} handleUser={handleUser} user={value} /> }/>
        <Route path="/create"> <Redirect to="/preview/" /></Route>
      </Router>;
    } else {
      content =
     <Router>
       <Header handleUser = {handleUser} preview = {preview} handlePreview = {handlePreview} isAuthorized={isAuthorized} />
       <div className="vertical-panel">
         <Route path="/aboutUS" render={props => <AboutUs />}/>
         <Route path="/create" render={props => <CreateAll handleUser={handleUser} handlePreview={handlePreview} preview={preview} user={value} /> }/>
         <Route exact path="/" render={props => <Main handleUser={handleUser} handlePreview={handlePreview} preview={preview} user={value} /> }/>
       </div>
     </Router>;
    }
  } else {
    content =
     <Router>
       <Header handlePreview = {handlePreview} isAuthorized={isAuthorized}/>
       <div className="vertical-panel">
         <Route path="/aboutUS" render={props => <AboutUs />}/>
         <Route path="/registration" render={props => <Conteiner handleUser={handleUser} /> }/>
         <Route exact path="/" component={ Main }/>
       </div>
     </Router>;
  }

  return content;
};

export default Authorized;
