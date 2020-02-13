/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';
import statesInNigeria from '../../components/appointments/statesInNigeria';
import '../../components/styles/NewAppointment.css';
import API_URL from '../../components/helpers/apiUrl';

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
      .then()
      .catch(error => error.message);
  }

  render() {
    const { provider, time } = this.state;
    const onChangeTime = time => this.setState({ time });
    const displayStatesInNigeria = () =>
      statesInNigeria.map(state => <option key={state}>{state}</option>);

    return (
      <div className="make-appointment-bg">
        <main>
          <div className="make-appointment-container">
            <div className="make-appointment-wrapper">
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
                  <input type="date" name="date" id="date" required onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <div>
                    <TimePicker className="TimePicker" onChange={onChangeTime} value={time} />
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
        </main>
      </div>
    );
  }
}

NewAppointment.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  userStatus: PropTypes.instanceOf(Object).isRequired,
};

export default NewAppointment;
