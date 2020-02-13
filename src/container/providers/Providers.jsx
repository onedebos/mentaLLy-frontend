/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../components/styles/Providers.css';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import API_URL from '../../components/helpers/apiUrl';
import ProvidersComponent from '../../components/provider/ProvidersComponent';
import DisplayAllTitles from '../../components/auth/DisplayAllTtitles';

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
    };
  }

  componentDidMount() {
    const url = `${API_URL}/api/v1/providers/`;
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

    return (
      <>
        {loggedInStatus === 'LOGGED_in' && providers ? (
          <div>
            <DisplayAllTitles main="OUR PARTNERS" sub="Select a provider to book an appointment." />
            <div className="grid-for-providers-list">
              {providers.length > 0 ? allProviders : <div>''</div>}
            </div>
          </div>
        ) : (
          <div>''</div>
        )}
      </>
    );
  }
}

Providers.propTypes = {
  loggedInStatus: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.string,
};

Providers.defaultProps = {
  push: '',
  loggedInStatus: '',
};
export default Providers;
