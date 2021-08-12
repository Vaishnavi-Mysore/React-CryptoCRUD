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
class BuyBitcoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GroupName: "",
      GroupDesc: "",
      IsActive: true,
      isShow: false,
      isOpen: false,
      isLoader: false,
    };
    this.onChange = this.onChange.bind(this);
    const validationRules = {
      total: "positiveNumber",
    };
    this.validator = new Validator(validationRules);
  }

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
  SaveForm = () => {
    
    let validationResult = this.validator.validateState(this.state);
    if (validationResult.valid === false) {
      return this.setState({ isValid: false, errors: validationResult.errors });
    } else {
      this.setState({
        isLoader: true
      })
    let account_owner =
      this.props.location.state && this.props.location.state.account_owner;
    let underlying =
      this.props.location.state && this.props.location.state.underlying;
    _GET(
      `/liquidity/rfq?underlying=${underlying}&quoted_currency=USD&side=buy&total=${this.state.total}&participant_code=${account_owner}`
    )
      .then((response) => {
        this.setState({
          isLoader: false
        })
        this.props.history.push({
          pathname: `/buy-confirm`,
          state: {
            ...response.data,
            total: this.state.total,
            account_owner: account_owner,
            underlying: underlying,
          },
        });
      })
      .catch((error) => {
        this.setState({
          isLoader: false
        })
        let errorMessage = error.response && error.response.data && error.response.data.error
        ToastsStore.error(errorMessage, 5000);
      });
    }
  };

  renderErrors(key) {
    return key && this.state.errors && this.state.errors[key]
      ? this.state.errors[key].map((errorMessage) => (
          <div className="errorMsg">{errorMessage}</div>
        ))
      : null;
  }

  render() {
    let underlying =
      this.props.location.state && this.props.location.state.underlying;
    return (
      <div
        class="container"
        style={{
          backgroundImage: "radial-gradient(#296ed6 15%, #23233F 80%)",
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
        <Row>
          <Col xs={12} md={12} style={{ textAlign: "center" }}>
            <h3
              className="imp-header"
              style={{ color: "white", fontWeight: "normal" }}
            >
              {underlying === "BTC" ? "Buy Bitcoin" : "Buy Ethereum"}
            </h3>
          </Col>
          <Col
            style={{
              textAlign: "right",
              color: "white",
              paddingTop: "6px",
              paddingRight: "0px",
            }}
            xs={2}
            md={4}
          >
            $
          </Col>
          <Col xs={8} md={4} style={{ textAlign: "center" }}>
            <Input
              type="number"
              placeholder="Amount"
              // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
              id="total"
              name="total"
              onChange={this.onChange}
              value={this.state.total}
            />
            <span className="highlight"></span>
            {this.renderErrors("total")}
            {/* <h3
              className="imp-header"
              style={{ color: "white", fontWeight: "normal", fontSize: "25px" }}
            >
              $5408.00
            </h3> */}
          </Col>
        </Row>

        <hr className="heading-divider" />
        <br />
        <Row>
          <Col
            xs={12}
            md={{ size: 6, offset: 3 }}
            style={{ textAlign: "center" }}
          >
            <Button
              className="site-button"
              id="submitButton"
              onClick={this.SaveForm}
            >
              Buy
            </Button>
            <Button
              className="site-button"
              id="submitButton"
              onClick={() => {
                this.props.history.push("/account-signin");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BuyBitcoin;
