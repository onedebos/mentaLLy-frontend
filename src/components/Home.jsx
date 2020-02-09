/* eslint-disable import/no-duplicates */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import PropTypes from 'prop-types';

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    const { handleLogin, history } = this.props;
    handleLogin(data);
    history.push('/providers');
  }

  render() {
    const { loggedInStatus } = this.props;

    return (
      <div className="home-body">
        <header>
          <div className="menu">
            <FontAwesomeIcon className="menu-icon" icon={faBars} />
            <FontAwesomeIcon className="menu-icon" icon={faSearch} />
          </div>

          <h1 className="logo-title">MentaLLy</h1>
          <p>Book mental health services across Nigeria.</p>
          {loggedInStatus === 'NOT_LOGGED_IN' ? (
            <div>
              <Link to="/sign_up">
                <button className="sign-up" type="button">
                  Sign up to book
                  <FontAwesomeIcon className="sign-up-arrow" icon={faChevronCircleRight} />
                </button>
              </Link>
              <div>
                <p className="have-account">have an account?</p>
                <Link to="/login" className="sign-in">
                  Sign in
                  <FontAwesomeIcon className="sign-up-arrow" icon={faChevronCircleRight} />
                </Link>
              </div>
            </div>
          ) : (
            <p className="signed-in">
              You are signed in. &apos;
              <Link to="/providers">See our partners</Link>
            </p>
          )}
        </header>
      </div>
    );
  }
}
Home.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.object,
  loggedInStatus: PropTypes.string,
};

Home.defaultProps = {
  handleLogin: () => {},
  history: {},
  loggedInStatus: '',
};

export default Home;
