/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API_URL from '../helpers/apiUrl';

class EditProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: {
        name: '',
        email: '',
        state: '',
        logo: '',
        description: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `${API_URL}/api/v1/providers/${id}`;
    const { history } = this.props;
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

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    event.preventDefault();
    const url = `${API_URL}/api/v1/providers/${id}`;
    const { name, email, state, logo, description } = this.state;

    const body = {
      name,
      email,
      state,
      logo,
      description,
    };

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => history.push(`/provider/${response.id}`))
      .catch(error => error.message);
  }

  render() {
    const { provider } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Update information for {provider.name}</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">Provider name: </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={provider.name}
                  id="providerName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  defaultValue={provider.email}
                  name="email"
                  id="email"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">State:</label>
                <input
                  type="text"
                  defaultValue={provider.state}
                  name="state"
                  id="state"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">logo:</label>
                <input
                  type="url"
                  name="logo"
                  id="logo"
                  defaultValue={provider.logo}
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="logoHelp" className="form-text text-muted">
                  Enter a URL where the logo is located
                </small>
              </div>
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                defaultValue={provider.description}
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Update Provider
              </button>
              <Link to="/providers" className="btn btn-link mt-3">
                Back to Providers
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
EditProvider.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  push: PropTypes.string,
};

EditProvider.defaultProps = {
  push: '',
  history: {},
  match: {},
};

export default EditProvider;
