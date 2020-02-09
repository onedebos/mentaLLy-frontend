/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Providers.css';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import ProvidersComponent from './ProvidersComponent';
import DisplayAllTitles from '../auth/DisplayAllTtitles';

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3001/api/v1/providers/';
    const { history } = this.props;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ providers: response }))
      .catch(() => history.push('/'));
  }

  render() {
    const { providers } = this.state;
    const { loggedInStatus } = this.props;

    const allProviders = providers.map(provider => (
      <div key={uuid()}>
        <ProvidersComponent
          imageURL={provider.logo}
          name={provider.name}
          alt={`${provider.name} image`}
          providerURL={`/provider/${provider.id}`}
          appointmentURL={`/make_appointment/${provider.id}`}
        />
      </div>
    ));
    const noProvider = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No Providers yet. Why not <Link to="/new_provider">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        {loggedInStatus === 'LOGGED_in' ? (
          <div>
            <DisplayAllTitles main="OUR PARTNERS" sub="Select a provider to book an appointment." />
            <div className="grid-for-providers-list">
              {providers.length > 0 ? allProviders : noProvider}
            </div>
          </div>
        ) : (
          <div>You're not logged in</div>
        )}
      </>
    );
  }
}

Providers.propTypes = {
  loggedInStatus: PropTypes.string,
  history: PropTypes.object,
  push: PropTypes.string,
};

Providers.defaultProps = {
  push: '',
  loggedInStatus: '',
  history: {},
};
export default Providers;
