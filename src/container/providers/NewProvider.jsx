import React from 'react';
import PropTypes from 'prop-types';
import API_URL from '../../components/helpers/apiUrl';
import statesInNigeria from '../../components/appointments/statesInNigeria';
import DisplayAllTitles from '../../components/auth/DisplayAllTtitles';
import Field from '../../components/auth/Field';
import '../../components/styles/NewProvider.css';

class NewProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      state: '',
      logo: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `${API_URL}/api/v1/providers/`;
    const { name, email, state, logo, description } = this.state;

    if (name.length === 0 || email.length === 0 || state.length === 0) return;

    const body = {
      name,
      email,
      state,
      logo,
      description,
    };

    const { history } = this.props;

    fetch(url, {
      method: 'POST',
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
    const { name, email, state, logo, description } = this.state;
    const displayStatesInNigeria = () =>
      statesInNigeria.map(state => <option key={state}>{state}</option>);
    return (
      <div className="container">
        <main>
          <div className="row new-provider-wrapper">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <DisplayAllTitles
                main="Add a new provider/partner"
                sub={`You're signed in as an admin.`}
              />
              <form className="new-provider-form" onSubmit={this.onSubmit}>
                <Field
                  name="name"
                  label="Name: "
                  onChange={this.onChange}
                  type="text"
                  id="name"
                  value={name}
                />

                <Field
                  name="email"
                  label="Email: "
                  onChange={this.onChange}
                  type="email"
                  id="email"
                  value={email}
                />
                <div className="state-group">
                  <label className="state-label" htmlFor="email">
                    State:
                  </label>
                  <select
                    name="state"
                    id="state"
                    className="form-control-state"
                    required
                    onChange={this.onChange}
                    placeholder="Lagos"
                    value={state}
                  >
                    {displayStatesInNigeria()}
                  </select>
                </div>

                <Field
                  name="logo"
                  label="Logo URL: "
                  onChange={this.onChange}
                  type="url"
                  id="logo"
                  value={logo}
                />

                <div className="description-label">
                  <label htmlFor="description">Description</label>
                  <div>
                    <textarea
                      className="form-control-txtarea"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={this.onChange}
                      value={description}
                    />
                  </div>
                </div>
                <button type="submit" className="make-provider-btn">
                  Create Provider
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

NewProvider.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  push: PropTypes.string,
};

NewProvider.defaultProps = {
  push: '',
};

export default NewProvider;
