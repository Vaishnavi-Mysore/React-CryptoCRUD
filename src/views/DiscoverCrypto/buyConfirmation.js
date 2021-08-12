import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  Button,
  Modal,
  ModalBody,
  Col,
  ModalFooter,
  ModalHeader,
  Label,
  Row,
} from "reactstrap";
import Loader from "../../Common/components/loader/loaderComponent";
import { MESSAGE } from "../../Common/constant/index";
import Validator from "../../Common/Utilities/stateValidator";

import { _GET, _POST } from "../../Services/HttpMethodHandler";

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
class BuyConfirmation extends Component {
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
      total: "nonEmptyLength",
    };
    this.validator = new Validator(validationRules);
  }
  componentDidMount() {
    // let buyInfo= this.props.location.state ? this.props.location.state.message :null
    // let payload ={
    //   quote_id: buyInfo.quote_id
    // }
    // setTimeout(() => {
    //   _POST('/liquidity/execute', payload).then(response => {
    //     console.log(response)
    //    })
    // },4)
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
    this.setState({
      isOpen: true,
    });
  };

  renderErrors(key) {
    return key && this.state.errors && this.state.errors[key]
      ? this.state.errors[key].map((errorMessage) => (
          <div className="errorMsg">{errorMessage}</div>
        ))
      : null;
  }

  buy = () => {
    let account_owner =
      this.props.location.state && this.props.location.state.account_owner;
    let total = this.props.location.state && this.props.location.state.total;
    let underlying =
      this.props.location.state && this.props.location.state.underlying;
    _GET(
      `/liquidity/rfq?underlying=${underlying}&quoted_currency=USD&side=buy&total=${total}&participant_code=${account_owner}`
    )
      .then((response) => {
        let payload = {
          quote_id:
            response &&
            response.data &&
            response.data.message &&
            response.data.message.quote_id,
        };
        _POST("/liquidity/execute", payload).then((res) => {
          console.log(res);
          this.props.history.push("/account-signin");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let buyInfo = this.props.location.state
      ? this.props.location.state.message
      : null;
    let total = this.props.location.state
      ? this.props.location.state.total
      : null;
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
        {/* <Row> */}
        <Col xs={12} md={12} style={{ textAlign: "center" }}>
          <h3
            className="imp-header"
            style={{ color: "white", fontWeight: "normal" }}
          >{underlying === 'BTC' ? 'Buy Bitcoin' :'Buy Ethereum'}
            
          </h3>
        </Col>
        <Col
          xs={{size: 6, offset: 3}}
          sm={{size: 6, offset: 4}}
          md={{ size: 6, offset: 5 }}
          style={{ textAlign: "left", color: "white" }}
        >
          <table>
            <tr>
              <td>Quantity :</td> <td>{buyInfo.quantity}</td>
            </tr>
            <tr>
              <td>Exchange Rate :</td>{" "}
              <td>{parseFloat(buyInfo.price).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Symbol :</td> <td>{underlying}</td>
            </tr>
            <tr>
              <td>Total :</td> <td>$ {total}</td>
            </tr>

          
          </table>
        </Col>
        {/* </Row> */}

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
              Confirm
            </Button>
            <Button
              className="site-button"
              id="submitButton"
              onClick={()=>{
                this.props.history.push('/account-signin')
              }}
            >
              Cancel
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
            Alert!
          </ModalHeader>
          <ModalBody>
            Due to fluctuations in the spot market price, the amount ultimately
            received might slightly differ.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.buy}>
              OK
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

export default BuyConfirmation;
