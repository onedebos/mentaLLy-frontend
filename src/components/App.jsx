/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import API_URL from './helpers/apiUrl';
import Menu from './Menu';
import Home from './Home';
import Providers from './provider/Providers';
import ProviderComponent from './provider/ProviderComponent';
import NewProvider from './provider/NewProvider';
import NewAppointment from './appointments/NewAppointment';
import EditProvider from './provider/EditProvider';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Appointments from './appointments/Appointments';
import UserAppointment from './appointments/UserAppointment';
import './styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const { loggedInStatus } = this.state;
    axios
      .get(`${API_URL}/api/v1/logged_in`, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_in',
            user: response.data.user,
          });
        } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_in',
            user: {},
          });
        }
      })
      .catch(error => error);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_in',
      user: data.user,
    });
  }

  render() {
    const { loggedInStatus, user } = this.state;

    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} loggedInStatus={loggedInStatus} handleLogout={this.handleLogout} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loggedInStatus={loggedInStatus} handleLogin={this.handleLogin} />
              )}
            />

            <Route
              exact
              path="/sign_up"
              render={props => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
            <>
              <div className="App-styles">
                <Menu
                  loggedInStatus={loggedInStatus}
                  userStatus={user}
                  handleLogout={this.handleLogout}
                />

                <Route
                  exact
                  path="/providers"
                  render={props => (
                    <Providers {...props} loggedInStatus={loggedInStatus} userStatus={user} />
                  )}
                />
                <Route
                  exact
                  path="/provider/:id"
                  render={props => (
                    <ProviderComponent
                      {...props}
                      loggedInStatus={loggedInStatus}
                      userStatus={user}
                    />
                  )}
                />
                <Route
                  exact
                  path="/provider/"
                  render={props => <NewProvider {...props} loggedInStatus={loggedInStatus} />}
                />
                <Route
                  exact
                  path="/make_appointment/:id"
                  render={props => (
                    <NewAppointment {...props} loggedInStatus={loggedInStatus} userStatus={user} />
                  )}
                />
                <Route
                  exact
                  path="/appointments/:id"
                  render={props => (
                    <UserAppointment {...props} loggedInStatus={loggedInStatus} userStatus={user} />
                  )}
                />
                <Route
                  path="/edit/:id"
                  render={props => <EditProvider {...props} loggedInStatus={loggedInStatus} />}
                />

                <Route
                  path="/user_appointments"
                  render={props => (
                    <Appointments
                      {...props}
                      loggedInStatus={loggedInStatus}
                      handleLogin={this.handleLogin}
                      userStatus={user}
                    />
                  )}
                />
              </div>
            </>
          </Switch>
        </Router>
      </div>
    );
  }
}
