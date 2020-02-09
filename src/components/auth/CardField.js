import React from 'react';
import '../styles/CardField.css';
import PropTypes from 'prop-types';

const CardField = ({ infoOne, infoTwo }) => (
  <div>
    <div className="card-block">
      <p className="card-block-info-1">{infoOne}</p>
      <p className="card-block-info-2">{infoTwo}</p>
    </div>
  </div>
);

CardField.propTypes = {
  infoOne: PropTypes.string,
  infoTwo: PropTypes.string,
};

CardField.defaultProps = {
  infoOne: '',
  infoTwo: '',
};

export default CardField;
