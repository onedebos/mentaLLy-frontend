/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API_URL from '../../components/helpers/apiUrl';
import CardField from '../../components/auth/CardField';
import '../../components/styles/ProviderComponent.css';

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: { name: '', email: '', state: '', logo: '', description: '' },
    };
    this.deleteProvider = this.deleteProvider.bind(this);
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
      .catch(() => history.push('/provider'));
  }

  deleteProvider() {
    const {
      match: {
        params: { id },
        history,
      },
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
    const { provider } = this.state;
    const { userStatus } = this.props;

    return (
      <div className="provider-bg">
        <main>
          <div className="scream-div">
            <img
              alt="man"
              className="screaming"
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80"
            />
          </div>
          <div className="provider-component-wrapper">
            <div className="provider-information-wrapper">
              <div className="provider-information-name-div">
                <h3 className="provider-information-name">{provider.name}</h3>
              </div>
              <div className="card-fields">
                <CardField infoOne="E-mail:" infoTwo={provider.email} />
                <CardField infoOne="State: " infoTwo={provider.state} />
              </div>
              <div className="provider-information-description">{provider.description}</div>
            </div>
            <div className="provider-info-buttons">
              <div className="p-btn">
                <Link to="/providers" className="provider-info-btns">
                  Back to our partners
                </Link>
              </div>
              <div className="p-btn">
                <Link to={`/make_appointment/${provider.id}`} className="provider-info-btns">
                  Book an appointment with {provider.name}
                </Link>
              </div>

              {userStatus.admin === true ? (
                <div>
                  <div className="p-btn">
                    <Link to="" onClick={this.deleteProvider} className="provider-info-btns">
                      Delete Partner
                    </Link>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Provider.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  userStatus: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.string,
};

Provider.defaultProps = {
  push: '',
};
export default Provider;
