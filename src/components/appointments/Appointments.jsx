import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: { city: '', Date: '', Time: '' },
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;

    const url = `http://localhost:3001/api/v1/providers/${id}/appointments`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ appointment: response }))
      .catch(() => history.push('/user_appointments'));
  }

  deleteAppointment() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    const url = `http://localhost:3001/api/v1/providers/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => history.push('/providers'))
      .catch(error => error.message);
  }

  render() {
    const { appointment } = this.state;

    return (
      <div className="">
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group" key={appointment.id}>
                <h5 className="mb-2">Details</h5>
                <li>{appointment.city}</li>
                <li>{appointment.date}</li>
                <li>{appointment.time}</li>
              </ul>
            </div>

            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteProvider}>
                Delete Provider
              </button>
            </div>
          </div>

          <Link to="/providers" className="btn btn-link">
            Back to providers
          </Link>
        </div>
      </div>
    );
  }
}

Appointments.propTypes = {
  history: PropTypes.string,
  match: PropTypes.number,
};

Appointments.defaultProps = {
  history: '',
  match: 1,
};
export default Appointments;
