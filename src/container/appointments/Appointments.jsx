import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API_URL from '../../components/helpers/apiUrl';

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

    const url = `${API_URL}/api/v1/providers/${id}/appointments`;

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
    const url = `${API_URL}/api/v1/providers/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
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
        <main>
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
        </main>
      </div>
    );
  }
}

Appointments.propTypes = {
  history: PropTypes.string,
  match: PropTypes.instanceOf(Object).isRequired,
};

Appointments.defaultProps = {
  history: '',
};
export default Appointments;
