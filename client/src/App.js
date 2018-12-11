import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Login related imports
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
//for ex back button to the previous route. as Router ca sa pot sa-i spun Router
import PrivateRoute from './components/common/PrivateRoute'; //Switch vine cu asta pt a preveni orice problema pe redirect

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';

import Search from './components/bing/Search';
import MySearches from './components/bing/MySearches';
import Comment from './components/bing/Comment';

// Verificam daca exista jwtToken in localStorage pentru a pastra userul logat si in cazul refreshului
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Verific daca tokenul este expirat
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect catre login
    window.location.href = '/login';
  }
}
//for this path we want the comp Landing. "exact" e ca sa fie doar pentru / sa nu se suprapuna cu alta ruta. componenta merge exact la /
class App extends Component {
  render() {
    return (
      <Provider store= { store }>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component= {Landing}/>
          <div className="container">
            <Route exact path="/login" component= {Login}/> 
            <Route exact path="/register" component= {Register}/>
            <Switch>
              <PrivateRoute exact path="/main" component= {Search}/> 
            </Switch>
            <Switch>
              <PrivateRoute exact path="/searches" component= {MySearches}/> 
            </Switch>
            <Switch>
              <PrivateRoute exact path="/comment" component= {Comment}/> 
            </Switch>
          </div>  
          <Footer/> 
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
