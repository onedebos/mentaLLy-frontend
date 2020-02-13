import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import PropTypes from 'prop-types';
import { faBars, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import expand from './helpers/menuResponse';

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
    const menuIcon = (
      <div className="menu" id="HomeMenu">
        <FontAwesomeIcon className="MenuIcon" id="MenuIcon" icon={faBars} onClick={expand} />
        <div className="items" id="items">
          <div className="HomeMenuItem">
            <Link to="/login" className="HomeMenuIn">
              Sign in
            </Link>
          </div>
          <div className="HomeMenuItem">
            <Link to="/sign_up" className="HomeMenuUp">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <div className="home-body">
        {loggedInStatus === 'NOT_LOGGED_IN' ? menuIcon : ''}
        <header>
          <h1 className="logo-title">MentaLLy</h1>
          <p className="Book">Book mental health services across Nigeria.</p>
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
              You are signed in. &apos
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
  history: PropTypes.instanceOf(Object).isRequired,
  loggedInStatus: PropTypes.string,
};

Home.defaultProps = {
  handleLogin: () => {},
  loggedInStatus: '',
};

export default Home;
