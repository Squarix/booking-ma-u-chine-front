import React from 'react';
import './App.css';
import Homepage from './Home/Homepage';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import RoomRoutes from './Room/RoomRoutes';
import { Switch, Route }from 'react-router-dom';
import ProfileRoute from "./Profile/ProfileRoute";
import Search from "./Search/Search";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={Homepage}/>
        <Route path={'/sign-in'} component={SignIn} />
        <Route path={'/sign-up'} component={SignUp} />
        <Route path={'/search'} component={Search} />
        <Route path={'/rooms'} component={RoomRoutes}/>
        <Route path={'/profile'} component={ProfileRoute} />
      </Switch>
    </div>
  );
}

export default App;
