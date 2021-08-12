import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Loader from "../../Common/components/loader/loaderComponent";
import { MESSAGE } from "../../Common/constant/index";
import Validator from "../../Common/Utilities/stateValidator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { states } from "../../Common/Utilities/USState";
import { _GET, _POST } from "../../Services/HttpMethodHandler";
import ReactSwitch from "react-switch";

class DiscoverCrypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeTC: false,
      enableAccess: false,
      country: "United States",
      id_number_type: "ssn",
      id_number: "123456789",
      state: "",
      city: "",
      zip: "",
      date_of_birth: "",
      address_one: "",
      address_two: "",
      email: "",
      last_name: "",
      first_name: "",
      signed_timestamp: 1603378501286,
      metadata: {},
      isOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    const validationRules = {
      country: "nonEmptyLength",
      state: "nonEmptyLength",
      city: "nonEmptyLength",
      zip: "nonEmptyLength, zipCodeValidation",
      date_of_birth: "nonEmptyLength",
      address_one: "nonEmptyLength",
      // address_two: "nonEmptyLength",
      email: "nonEmptyLength, validEmail",
      last_name: "nonEmptyLength",
      first_name: "nonEmptyLength",
    };
    this.validator = new Validator(validationRules);
  }
  SubmitForm = async (event) => {
    event.preventDefault();
    let validationResult = this.validator.validateState(this.state);
    if (validationResult.valid === false) {
      return this.setState({ isValid: false, errors: validationResult.errors });
    } else {
      let payload = { ...this.state };
      _POST("/participants/customers/new", payload).then((responsePost) => {
        let account_owner =
          responsePost &&
          responsePost.data &&
          responsePost.data.message &&
          responsePost.data.message.participant_code;
        sessionStorage.setItem("account_owner", account_owner);
        this.props.history.push("/account-signin")
      });
    }
  };
  onChange(event) {
    let newState = {};
    let key = event.target.name;
    newState[key] = event.target.value;
    this.setState(newState, function() {
      let validationResult = this.validator.validateField(this.state, key);
      if (validationResult.valid === false) {
        return this.setState({
          isValid: false,
          errors: validationResult.errors,
        });
      }
      return this.setState({ isValid: true, errors: {} });
    });
  }

  renderErrors(key) {
    return key && this.state.errors && this.state.errors[key]
      ? this.state.errors[key].map((errorMessage) => (
          <div className="errorMsg">{errorMessage}</div>
        ))
      : null;
  }

  renderOptionsState = () => {
    return states.map((item, key) => {
      return (
        <option key={key} value={item.abbreviation}>
          {" "}
          {item.name}
        </option>
      );
    });
  };

  handleChange = (checked, event, id) => {
    let newState = {};
    let key = id;

    newState[key] = checked;
    this.setState({ [id]: checked }, () => {});
  };

  onConfirm = () => {
    let validationResult = this.validator.validateState(this.state);
    if (validationResult.valid === false) {
      return this.setState({ isValid: false, errors: validationResult.errors });
    } else {
      return this.setState({ isOpen: true });
    }
  };
  render() {
    return (
      <div
        class="container"
        style={{
          "background-image": "radial-gradient(#296ed6 15%, #23233F 80%)",
        }}
      >
        <Loader loading={this.state.isLoader} error={false}>
          {" "}
        </Loader>
        <ToastsContainer position="top_center" store={ToastsStore} />
        <Row>
          <Col xs={12} md={8}>
            <h3 className="imp-header" style={{ color: "white" }}>
              New Customer
            </h3>
          </Col>
        </Row>
        <hr className="heading-divider" />

        <Row>
          <Col sm="12">
            <Card style={{ margin: "1% 15%", backgroundColor: "transparent" }}>
              <CardBody style={{ backgroundColor: "transparent" }}>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>First Name</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="first_name"
                      name="first_name"
                      onChange={this.onChange}
                      value={this.state.first_name}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("first_name")}
                  </Col>

                  <Col  xs="12" md={6}>
                    <Label style={{ color: "white" }}>Last Name</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="last_name"
                      name="last_name"
                      onChange={this.onChange}
                      value={this.state.last_name}
                    />
                    <span className="highlight"></span>
                    {this.renderErrors("last_name")}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Email</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("email")}
                  </Col>

                  <Col  xs="12" md={6}>
                    <Label style={{ color: "white" }}>DOB</Label>
                    <DatePicker
                      value={this.state.date_of_birth}
                      style={{ border: "none", backgroundColor: "transparent" }}
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}

                      // showDisabledMonthNavigation
                      // dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      name="date_of_birth"
                      onChange={(newDOB) =>
                        this.setState({
                          date_of_birth: moment(newDOB).format("YYYY-MM-DD"),
                        })
                      }
                      placeholderText="YYYY-MM-DD"
                      filterDate={(date) => {
                        return moment() > date;
                      }}
                    ></DatePicker>
                    <span className="highlight"></span>
                    {this.renderErrors("date_of_birth")}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Address 1</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="address_one"
                      name="address_one"
                      onChange={this.onChange}
                      value={this.state.address_one}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("address_one")}
                  </Col>

                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Address 2</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="address_two"
                      name="address_two"
                      onChange={this.onChange}
                      value={this.state.address_two}
                    />
                    <span className="highlight"></span>
                    {this.renderErrors("address_two")}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>City</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="city"
                      name="city"
                      onChange={this.onChange}
                      value={this.state.city}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("city")}
                  </Col>

                  <Col  xs="12" md={6}>
                    <Label style={{ color: "white" }}>State</Label>
                    <Input
                      type="select"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="state"
                      name="state"
                      onChange={this.onChange}
                      value={this.state.state}
                    >
                      <option value="" selected>
                        Select State
                      </option>
                      {this.renderOptionsState()}
                    </Input>
                    <span className="highlight"></span>
                    {this.renderErrors("state")}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Zip</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="zip"
                      name="zip"
                      onChange={this.onChange}
                      value={this.state.zip}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("zip")}
                  </Col>

                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Country</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="country"
                      name="country"
                      // onChange={this.onChange}
                      value={this.state.country}
                      disabled={true}
                    />
                    <span className="highlight"></span>
                    {this.renderErrors("country")}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Id Number Type</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
                      id="id_number_type"
                      name="id_number_type"
                      onChange={this.onChange}
                      value={this.state.id_number_type}
                      disabled={true}
                    />
                    <span className="highlight"></span>

                    {this.renderErrors("id_number_type")}
                  </Col>

                  <Col xs="12" md={6}>
                    <Label style={{ color: "white" }}>Id Number</Label>
                    <Input
                      type="text"
                      placeholder=" "
                      id="id_number"
                      name="id_number"
                      onChange={this.onChange}
                      value={this.state.id_number}
                      disabled={true}
                    />
                    <span className="highlight"></span>
                    {this.renderErrors("id_number")}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col xs={12} md={12} style={{ marginTop: "2%", textAlign: "center" }}>
            <Button
              className="site-button"
              id="submitButton"
              onClick={this.onConfirm}
            >
              Confirm
            </Button>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.isOpen}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={() => {
            this.setState({ isOpen: false });
          }}
        >
          <ModalHeader
            toggle={() => {
              this.setState({ isOpen: false });
            }}
          >
            Review and Accept your Discover Crypto agreements.{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={10}>
                Click to enable access to crypto products on Discover.
              </Col>
              <Col md={2}>
                <ReactSwitch
                  style={{ textAlign: "right" }}
                  onChange={this.handleChange}
                  checked={this.state.enableAccess}
                  id="enableAccess"
                  name="enableAccess"
                  onColor="009dff"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                ></ReactSwitch>
              </Col>
            </Row>
            <br />
            <div>
              Cryptocurrency services are provided through Zero Hash LLC and
              Zero Hash Liquidity Services. To read the Zero Hash LLC and Zero
              Hash Liquidity Services LLC Services Agreement, please{" "}
              <a
                target="_blank"
                href="https://seedcx.zendesk.com/hc/en-us/articles/360009900654-Terms-of-Service"
              >
                Click Here
              </a>
              .
            </div>{" "}
            <br />
            <br />
            <Row>
              <Col md={10}>
                I have read and understand the Zero Hash LLC and Zero Hash
                Liquidity Services LLC Services Agreement and I agree to the
                terms contained therein.
              </Col>
              <Col md={2}>
                <ReactSwitch
                  onChange={this.handleChange}
                  checked={this.state.agreeTC}
                  id="agreeTC"
                  name="agreeTC"
                  onColor="009dff"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                ></ReactSwitch>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={
                (this.state.enableAccess && this.state.agreeTC) === false
                  ? true
                  : false
              }
              onClick={this.SubmitForm}
            >
              Continue
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                this.setState({ isOpen: false });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DiscoverCrypto;
