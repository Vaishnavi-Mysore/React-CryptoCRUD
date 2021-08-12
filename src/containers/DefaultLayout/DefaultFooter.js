import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
export class DefaultFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginRight: '0px',
          marginLeft: '0px'
        }}>
          <Col md={12}>
            {/* <p className="lastLogin">Pay Engine Currency Pay</p> */}
            </Col>
        </Row>
      </div>
    );
  }
}

DefaultFooter.propTypes = {
  children: PropTypes.node
}

export default DefaultFooter;
