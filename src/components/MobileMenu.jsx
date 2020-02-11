/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import expand from './helpers/menuResponse';
import API_URL from './helpers/apiUrl';
import './styles/MobileMenu.css';

export default class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    const { handleLogout } = this.props;
    axios
      .delete(`${API_URL}/api/v1/logout`, {
        withCredentials: true,
      })
      .then(() => {
        handleLogout();
      })
      .catch(error => error);
    handleLogout();
  }

  render() {
    const { userStatus } = this.props;
    const mMenu = user => (
      <div>
        <div className="HomeMenuItem">
          <Link to={`/appointments/${user.id}`} className="HomeMenuIn">
            Appointments
          </Link>
        </div>
        <div>
          {userStatus.admin === true ? (
            <div className="HomeMenuItem">
              <Link to="/provider" className="HomeMenuIn">
                New Partner
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
    return (
      <div className="menuMobile" id="HomeMenu">
        <FontAwesomeIcon className="MenuIcon" id="MenuIcon" icon={faBars} onClick={expand} />
        <div className="items" id="items">
          <div className="HomeMenuItem">
            <Link to="/providers" className="HomeMenuIn">
              Providers
            </Link>
          </div>
          <div>{mMenu(userStatus)}</div>
          <div className="HomeMenuItem">
            <Link to="/" onClick={() => this.handleLogOutClick()} className="HomeMenuIn" href="#">
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

MobileMenu.propTypes = {
  handleLogout: PropTypes.func,
  userStatus: PropTypes.instanceOf(Object).isRequired,
};

MobileMenu.defaultProps = {
  handleLogout: () => {},
};
