import React from 'react';
import '../styles/Field.css';
import PropTypes from 'prop-types';

const Field = ({ label, value, onChange, type, name, id }) => {
  return (
    <div>
      <div className="password-field">
        <label htmlFor={label} className="label">
          {label}
        </label>
        <div className="password-field">
          <input
            value={value}
            onChange={onChange}
            required
            type={type}
            name={name}
            id={id}
            className="field"
          />
        </div>
      </div>
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Field.defaultProps = {
  label: '',
  value: '',
  type: '',
  name: '',
  id: '',
  onChange: () => {},
};

export default Field;
