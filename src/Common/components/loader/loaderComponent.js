import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NoDataFound } from '..';
import {Spinner} from 'reactstrap'

const Loader = (props) => {
  if (props.loading) {
    return (
      <div className='Loader' style={{
        height: props.height,
        width: props.width,
        cursor:'wait',
        zIndex:'2'
      }}>
        <Spinner style={{color:"#003B5C", width: '3rem', height: '3rem',marginTop:'20%'}}  />
        
      </div>
    )
  } else if (props.error) {
    return (
      <div
        style={{
          height: props.height,
          width: props.width
        }}
        className='loader'
      >
        Oops! There has been an issue. Re-try in some time.
      </div>
    )
  } else if (props.noData) {
    return <NoDataFound message={props.message} />
  }
  return (
    <Fragment>
      
      {props.children}
    </Fragment>
  )
}

Loader.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  noData: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string
}
Loader.defaultProps = {
  height: '100vh',
  width: '100%',
  noData: false,
  children: null,
  message: ''
};

export default Loader;
