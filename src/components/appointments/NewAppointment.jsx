/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';
import statesInNigeria from './statesInNigeria';
import '../styles/NewAppointment.css';
import API_URL from '../helpers/apiUrl';

class NewAppointment extends React.Component {
  constructor(props) {
    super(props);
    const { userStatus } = this.props;
    this.state = {
      city: '',
      date: null,
      time: '',
      user_id: userStatus.id,
      provider: { name: '' },
      errors: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;

    const url = `${API_URL}/api/v1/providers/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ provider: response }))
      .catch(() => history.push('/providers'));
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userStatus.id !== state.user_id) {
      return {
        user_id: props.userStatus.id,
      };
    }
    return null;
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;

    event.preventDefault();
    const url = `${API_URL}/api/v1/providers/${id}/appointments`;

    const { city, date, time, user_id } = this.state;

    const body = {
      id,
      city,
      date,
      time,
      user_id,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          history.push(`/appointments/${user_id}`);
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(this.setState({ errors: 'City cannot be empty. ' }))
      .catch(error => error.message);
  }

  render() {
    const { provider, errors, time } = this.state;
    const onChangeTime = time => this.setState({ time });
    const displayStatesInNigeria = () =>
      statesInNigeria.map(state => <option key={state}>{state}</option>);
    const displayErrors = () => <div className="login-errors">{errors}</div>;

    return (
      <div className="make-appointment-bg">
        <div className="make-appointment-container">
          <div className="make-appointment-wrapper">
            {errors.length > 0 ? displayErrors() : ''}
            <h1 className="make-appointment-title">Make an appointment with {provider.name}</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <div className="res-state">
                  <label htmlFor="city">Your resident state:</label>
                </div>
                <select name="city" id="city" required onChange={this.onChange}>
                  {displayStatesInNigeria()}
                </select>
              </div>
              <div className="form-group">
                <div className="res-state">
                  <label htmlFor="Date">Date:</label>
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  placeholder="12/02/2020"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <div>
                  <TimePicker onChange={onChangeTime} value={time} />
                </div>
                <small id="logoHelp">24hr clock</small>
              </div>
              <div className="btn-div">
                <button type="submit" className="make-appointment-btn">
                  Create appointment
                </button>
              </div>
              <div className="btn-link-providers">
                <Link to="/providers" className="btn-link-providers">
                  Back to Providers
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewAppointment.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  userStatus: PropTypes.object,
};

NewAppointment.defaultProps = {
  history: {},
  match: {},
  userStatus: {},
};
export default NewAppointment;
