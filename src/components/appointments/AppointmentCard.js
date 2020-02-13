import React from 'react';
import '../styles/AppointmentCard.css';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

const AppointmentCard = ({ pName, appDate, appTime, appLocation }) => (
  <div>
    <main>
      <div className="card-wrapper">
        <div className="p-name">{pName}</div>
        <div className="app-date-div">
          <p className="app-date-text">Date:&nbsp;</p>
          {dateFormat(appDate, 'fullDate')}
        </div>
        <div className="app-time-div">
          <p className="app-time-text">Time:&nbsp;</p>
          {dateFormat(appTime, 'shortTime')}
        </div>
        <div className="app-location-div">
          <p className="app-location-text">Location:&nbsp;</p>
          {appLocation}
        </div>
      </div>
    </main>
  </div>
);

AppointmentCard.propTypes = {
  pName: PropTypes.arrayOf(PropTypes.string),
  appDate: PropTypes.string,
  appTime: PropTypes.string,
  appLocation: PropTypes.string,
};

AppointmentCard.defaultProps = {
  pName: [],
  appDate: '',
  appTime: '',
  appLocation: '',
};
export default AppointmentCard;
