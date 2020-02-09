/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/Menu.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    const { handleLogout } = this.props;
    axios
      .delete('/api/v1/logout', {
        withCredentials: true,
      })
      .then(() => {
        handleLogout();
      })
      .catch(error => error);
    handleLogout();
  }

  render() {
    const { loggedInStatus, userStatus } = this.props;
    const navigation = user => (
      <div>
        <div className="user-name">
          <p className="user-name">@{user.name}</p>
        </div>
        <div className="menu-items">
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/providers" className="menu-item">
            Partners
          </Link>
          <Link to={`/appointments/${user.id}`} className="menu-item">
            Appointments
          </Link>
          {userStatus.admin === true ? (
            <Link to="/provider" className="menu-item">
              NEW PARTNER
            </Link>
          ) : (
            ''
          )}
          <Link to="/" onClick={() => this.handleLogOutClick()} className="menu-item" href="#">
            Logout
          </Link>
        </div>
      </div>
    );

    return (
      <nav className="menu-bar">
        <h3 className="menu-logo">MentaLLy</h3>
        <img
          className="user-avatar"
          src="https://api.adorable.io/avatars/100/abott@adorable.png"
          alt="user-avatar"
        />

        {loggedInStatus === 'LOGGED_in' ? navigation(userStatus) : ''}
      </nav>
    );
  }
}
Menu.propTypes = {
  handleLogout: PropTypes.func,
  userStatus: PropTypes.object,
  loggedInStatus: PropTypes.string,
};

Menu.defaultProps = {
  handleLogout: () => {},
  loggedInStatus: {},
  userStatus: {},
};
