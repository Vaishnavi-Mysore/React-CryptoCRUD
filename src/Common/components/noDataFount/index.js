import React from 'react';
import PropTypes from 'prop-types';

const NoDataFound = props => (
  <div style={props.style} className={props.className ? props.className : 'no-data'} >{props.message || 'No Data Found'}</div>
)

NoDataFound.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

NoDataFound.defaultProps = {
  message: '',
  className: '',
  style: {}
};

export default NoDataFound;
