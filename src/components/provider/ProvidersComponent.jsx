import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/ProvidersComponent.css';

const ProvidersComponent = ({ imageURL, name, providerURL, appointmentURL, alt }) => {
  return (
    <div>
      <div className="display-providers-model">
        <div className="img-section">
          <img alt={alt} className="img-section-img" src={imageURL} />
          <p className="providers-name">{name}</p>
        </div>
        <hr />
        <div className="providers-buttons">
          <Link to={providerURL} className="see-more">
            See more
          </Link>
          <Link to={appointmentURL} className="book-appointment">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

ProvidersComponent.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  providerURL: PropTypes.string,
  appointmentURL: PropTypes.string,
  alt: PropTypes.string,
};

ProvidersComponent.defaultProps = {
  name: '',
  providerURL: '',
  appointmentURL: '',
  alt: '',
  imageURL: '',
};

export default ProvidersComponent;
