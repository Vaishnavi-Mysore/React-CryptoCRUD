import React, { Component } from 'react';
import { Button, Col, Container, Input, Row, FormGroup, Label } from 'reactstrap';
import { Binder } from '../../../Common/Utilities/binder';
import Validator from '../../../Common/Utilities/stateValidator';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Loader from '../../../Common/components/loader/loaderComponent';
import { MESSAGE } from '../../../Common/constant';
export class Login extends Component {
  constructor(props) {
    super(props);
    this.binder = new Binder(this);
    this.state = {
      userName: '',
      userauth: '',
      fields: {},
      errors: {},
      userId: '',
      isLoader: false,
    };
    this.onChange = this.onChange.bind(this)
    const validationRules = {
      userName: 'nonEmptyLength',
      userauth: 'nonEmptyLength',
    };
    this.validator = new Validator(validationRules);
  }


  componentDidMount() {
    setTimeout(() => {
      var elementExists = document.getElementById("passwordId");
      if (elementExists) {
        document.getElementById("passwordId").focus();
        document.getElementById("userNameId").focus()
      }
    }, 1000);
  }

  renderErrors(key) {
    return this.state.errors[key] ? this.state.errors[key].map(errorMessage => (
      <div className='errorMsg'>{errorMessage}</div>)) : null;
  }

  onChange(e) {
    let newState = {};
    let key = e.target.name;
    newState[key] = e.target.value;
    this.setState(newState, function () {
      let validationResult = this.validator.validateField(this.state, key);
      if (validationResult.valid === false) {
        return this.setState({
          isValid: false,
          errors: validationResult.errors
        });
      }
      return this.setState({ isValid: true, errors: {} });
    });
  }

  handleChange = (e) => {
    if (e.key === 'Enter') {
      let validationResult = this.validator.validateState(this.state);
      if (validationResult.valid === false) {
        return this.setState({ isValid: false, errors: validationResult.errors, flag: true });
      }
      this.login();
    }
  }

  login = async () => {
    this.setState({
      isLoader: true
    })
    if (this.state.userName === 'admin' && this.state.userauth === 'Admin#123') {
      this.setState({
        isLoader: false
      })
      this.props.history.push('/dashboard')
    }
    else {
      this.setState({
        isLoader: false
      })
      ToastsStore.error(MESSAGE.INVALID_LOGIN, MESSAGE.TOAST_INTERVAL);
    }
  }

  render() {
    return (
      <div id='frmLogin' className='logincss'>
        <Loader loading={this.state.isLoader} error={false}></Loader>
        <ToastsContainer position='top_center' store={ToastsStore} />
        <Container>
          <Row className='justify-content-center row-margin'>
            <Col md='8' >
              {/* <h2 className='center-text'>
                <img src='/static/media/currency-pay-logo.650e76bc.svg' alt='' ></img>
              </h2> */}
              <br></br>
              <hr className='login-hr'></hr>
              <br></br>
              <h2 className='center-text login-text'>Login</h2>
              <br></br>
              <FormGroup>
                <Row>
                  <Col xs='12'>
                  <Label >Username</Label>
                    <Input
                      type='text'
                      placeholder=' '
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id='userNameId'
                      name='userName'
                      onChange={this.onChange}
                      value={this.state.userName}
                      onKeyPress={this.handleChange}
                    />
                    <span className="highlight"></span>
                    
                    {this.renderErrors('userName')}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs='12' >
                  <Label >Password</Label>
                    <Input
                      type='password'
                      placeholder=' '
                      // className={this.state.errors && this.state.errors.userauth ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id='userauthId'
                      name='userauth'
                      onChange={this.onChange}
                      value={this.state.userauth}
                      onKeyPress={this.handleChange}
                    />
                    <span className="highlight"></span>
                   
                    {this.renderErrors('userauth')}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row >
                  <Col className='center-text'>
                    <Button
                      id='loginButton'
                      onClick={this.login}
                      className='login-button'
                    > Login
									</Button>
                  </Col>
                </Row>
              </FormGroup>
              <br></br>
              <hr className='login-hr'></hr></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
