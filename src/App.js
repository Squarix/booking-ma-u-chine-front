import React from 'react';
import './App.css';
import Homepage from './Home/Homepage';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import { Switch, Route }from 'react-router-dom';
import ProfileRoute from "./Profile/ProfileRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={Homepage}/>
        <Route path={'/sign-in'} component={SignIn} />
        <Route path={'/sign-up'} component={SignUp} />
        <ProfileRoute path={'/users/profile'}  />
      </Switch>
    </div>
  );
}

export default App;
