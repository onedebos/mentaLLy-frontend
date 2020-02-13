import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import revealPass from '../../components/helpers/revealPassword';
import Field from '../../components/auth/Field';
import Submit from '../../components/auth/Submit';
import API_URL from '../../components/helpers/apiUrl';
import '../../components/styles/Registration.css';

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      registrationErrors: '',
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
    const { name, email, password, passwordConfirmation } = this.state;
    e.preventDefault();
    axios
      .post(
        `${API_URL}/api/v1/registrations`,
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
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
        this.setState({ registrationErrors: "You're already registered." });
      });
  }

  render() {
    const { name, email, password, passwordConfirmation, registrationErrors } = this.state;

    return (
      <div className="login-bg">
        <div className="sign-up-wrapper">
          <h3 className="login-logo">MentaLLy</h3>
          <p className="login-errors">{registrationErrors.length > 0 ? registrationErrors : ''}</p>
          <h3 className="login-title">Sign up</h3>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <Field
              label="Name"
              value={name}
              onChange={this.handleChange}
              type="name"
              id="name"
              name="name"
            />
            <Field
              label="E-mail"
              value={email}
              onChange={this.handleChange}
              type="email"
              name="email"
              id="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={this.handleChange}
              type="password"
              name="password"
              id="password"
            />
            <Field
              label="Re-enter password"
              value={passwordConfirmation}
              onChange={this.handleChange}
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
            />
            <div className="revealPass">
              <input type="checkbox" onClick={revealPass} />
              <label htmlFor="revealPass">Show Password</label>
            </div>
            <Submit
              buttonType="submit"
              buttonText="Sign up"
              linkOne="/login"
              linkOneText="Already signed up?"
              linkTwo="/"
              linkTwoText="Home"
            />
          </form>
        </div>
      </div>
    );
  }
}
Registration.propTypes = {
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.string,
};

Registration.defaultProps = {
  push: '',
  handleLogin: () => {},
};

export default Registration;
