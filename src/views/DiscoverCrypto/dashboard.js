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
} from "reactstrap";
import Loader from "../../Common/components/loader/loaderComponent";
import { MESSAGE } from "../../Common/constant/index";
import Validator from "../../Common/Utilities/stateValidator";

import { Doughnut } from "react-chartjs-2";
import { _GET } from "../../Services/HttpMethodHandler";

const data = {
  labels: ["USD", "Bitcoin", "Ethereum"],
  datasets: [
    {
      data: [2000, 1500, 1908],
      backgroundColor: ["red", "green", "yellow"],

      borderWidth: 1,
    },
  ],
};
class SignInNewCrypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GroupName: "",
      GroupDesc: "",
      IsActive: true,
      isShow: false,
      isOpen: false,
      isLoader: false,
      accountInfo:''
    };
    this.onChange = this.onChange.bind(this);
    const validationRules = {
      GroupName: "nonEmptyLength",
    };
    this.validator = new Validator(validationRules);
  }
  // componentDidMount() {
  //   let account_owner= this.props.location.account_owner
  //   _GET(`/accounts?account_owner=${account_owner}`).then((response) => {
  //     if (response.data) {
  //       this.setState({
  //         accountInfo: response.data.message[0],
  //       });
  //     }
  //   });
  // }
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

  onCancelClick = () => {
    this.props.history.push("/group");
  };

  renderErrors(key) {
    return key && this.state.errors && this.state.errors[key]
      ? this.state.errors[key].map((errorMessage) => (
          <div className="errorMsg">{errorMessage}</div>
        ))
      : null;
  }

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
              Discover Crypto
            </h3>
          </Col>
        </Row>
        <hr className="heading-divider" />
       <div style={{color:'white'}}>
         Select an account to view the information
       </div>
       
      </div>
    );
  }
}

export default SignInNewCrypto;
