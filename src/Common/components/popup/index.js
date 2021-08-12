import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, Input, Label } from 'reactstrap';
import { PropTypes } from 'prop-types';

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  copyToClipboard = (event) => {
    const textField = document.createElement('textarea');
    textField.innerText = this.props.OTP;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  renderErrors(key) {
    return this.props.data.errors && this.props.data.errors[key]
      ? this.props.data.errors[key].map(errorMessage => (
        <div className='errorMsg'>{errorMessage}</div>
      ))
      : null
  }

  onChange = (event) => {
    let newState = {};
    let key = event.target.name;
    newState[key] = event.target.value;
    this.props.onChange(newState)
  }

  render() {
    return (
      <Fragment>
        {this.props.type === 'CONFIRM' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6>   {this.props.bodyText}</h6>
              <div className="text-right" >
                <Button className="site-button" onClick={this.props.okClick}> Proceed </Button>{' '}
                <Button color="secondary" onClick={this.props.cancelClick}> Cancel </Button>
              </div>
            </ModalBody>
          </Modal> : null}
        {this.props.type === 'INFO' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6>   {this.props.bodyText}</h6>
              <div className="text-right" >
                <Button className="site-button" onClick={this.props.okClick}> OK </Button>{' '}
              </div>
            </ModalBody>
          </Modal> : null}
        {this.props.type === 'OTP' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className} >
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6> {this.props.bodyText}<span style={{ color: 'green' }}></span></h6>
              <div className="text-right" >
                <Button className="site-button" onClick={this.copyToClipboard}> Copy To Clipboard</Button>{' '}
                <Button className="site-button" onClick={this.props.okClick}> OK </Button>{' '}
              </div>
            </ModalBody>
          </Modal> : null}
        {this.props.type === 'SESSION' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className} >
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6> {this.props.bodyText}<span style={{ color: 'green' }}></span></h6>
              <div className="text-right" >
                <Button className="site-button" onClick={this.props.refreshToken}>Refresh Login</Button>
                <Button className="site-button" onClick={this.props.okClick}> Log-out</Button>{' '}
              </div>
            </ModalBody>
          </Modal> : null}
        {this.props.type === 'SESSION' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className} >
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6> {this.props.bodyText}<span style={{ color: 'green' }}></span></h6>
              <div className='text-right' >
                <Button className='site-button' onClick={this.props.refreshToken}>Refresh Login</Button>
                <Button className='site-button' onClick={this.props.okClick}> Log-out</Button>{' '}
              </div>
            </ModalBody>
          </Modal> : null}
        {this.props.type === 'REJECT' ?
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className} >
            <ModalBody toggle={this.togglePopup}>
              <h4>{this.props.title}</h4>
              <h6> {this.props.bodyText}<span style={{ color: 'green' }}></span></h6>
              
                  <Label style={{marginLeft:'0px'}} htmlFor='Line 1<'>Reason For Reject :</Label>
                  <span className='requiredspan'>*</span>

                  <Input type='textarea' name='reject' id='reject' value={this.props.reject} onChange={this.onChange}></Input>
                  {this.renderErrors('reject')}
                <div className='text-right' >
                  <Button className='site-button' onClick={this.props.okClick}> Proceed </Button>{' '}
                  <Button color='secondary' onClick={this.props.cancelClick}> Cancel </Button>
                </div>
            </ModalBody>
          </Modal> : null}
      </Fragment>
    );
      }
    }
    
ModalComponent.propTypes = {
          type: PropTypes.string,
        title: PropTypes.string,
        bodyText: PropTypes.string,
        isOpen: PropTypes.string,
        okClick: PropTypes.func,
        cancelClick: PropTypes.func
      };
      
ModalComponent.defaultProps = {
          type: 'INFO',
        title: 'Modal title',
        bodyText: 'Modal body',
        isOpen: false,
        okClick: () => null,
        cancelClick: () => null
      };
      
export default ModalComponent;