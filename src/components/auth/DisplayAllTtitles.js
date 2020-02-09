import React from 'react';
import '../styles/DisplayAllTitles.css';
import PropTypes from 'prop-types';

const DisplayAllTitles = ({ main, sub }) => {
  return (
    <div>
      <div className="providers-page-title">
        <h1 className="providers-heading">{main}</h1>
        <p className="providers-subheading">{sub}</p>
        <hr className="rule" />
      </div>
    </div>
  );
};

DisplayAllTitles.propTypes = {
  main: PropTypes.string,
  sub: PropTypes.string,
};

DisplayAllTitles.defaultProps = {
  main: '',
  sub: '',
};

export default DisplayAllTitles;
