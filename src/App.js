import React, { useState, useCallback} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'; 

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// import NewPlaceTest from './places/pages/NewPlaceTest';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import './App.css';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false); 

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []); 
  
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []); 
  
  let routes; 

  if (isLoggedin) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>

        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>

        <Route path='/places/new' exact>
          <NewPlace />
        </Route>

        <Route path='/places/:placeId' exact>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>

        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>

        <Route path='/auth' exact>
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedin: isLoggedin, login: login, logout:logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>{ routes}</Switch>
        </main>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
