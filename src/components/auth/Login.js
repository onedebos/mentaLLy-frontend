/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import PropTypes from 'prop-types';
import API_URL from '../helpers/apiUrl';
import Field from './Field';
import Submit from './Submit';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      LoginErrors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSuccessfulAuth(data) {
    const { handleLogin, history } = this.props;
    handleLogin(data);
    history.push('/providers');
  }

  handleSubmit(e) {
    const { email, password } = this.state;

    e.preventDefault();
    axios
      .post(
        `${API_URL}/api/v1/sessions`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.handleSuccessfulAuth(response.data);
        }
      })
      .catch(() => {
        this.setState({
          LoginErrors: 'The username or password you have entered is incorrect.',
        });
      });
  }

  render() {
    const { email, password, LoginErrors } = this.state;

    return (
      <div className="login-bg">
        <div className="login-wrapper">
          <p className="login-errors">{LoginErrors}</p>
          <h3 className="login-logo">MentaLLy</h3>
          <h3 className="login-title">Log in</h3>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <Field
              value={email}
              type="email"
              onChange={this.handleChange}
              label="E-mail"
              name="email"
              id="email"
            />
            <Field
              value={password}
              type="password"
              onChange={this.handleChange}
              label="Password"
              name="password"
              id="password"
            />
            <div className="remember-me">
              <input type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Submit
              buttonType="submit"
              buttonText="Sign in"
              linkOne="/sign_up"
              linkOneText="Sign up"
              linkTwo="/"
              linkTwoText="Forgot your password?"
            />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.string,
};

Login.defaultProps = {
  push: '',
  handleLogin: () => {},
};

export default Login;
