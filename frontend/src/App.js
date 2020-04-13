import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //BrowserRouter is for pressing forward and backward button in browser window
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./Redux/store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Report from "./components/report/Report";
import LeaderBoard from "./components/leaderboard/LeaderBoard";
import Admin from "./components/admin/Admin";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              {/* protected routes goes here */}
              <Switch>
                <PrivateRoute exact path='/home' component={Home} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/report' component={Report} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/leaderboards'
                  component={LeaderBoard}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/admin' component={Admin} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
