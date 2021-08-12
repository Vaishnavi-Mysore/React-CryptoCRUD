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
      accountInfo: "",
      crypto: "",
      ethAsset: [],
      btcAsset: [],
      usd: [],
      chartData: [],
      btcBalance: 0,
      usdBalance: 0,
      ethBalance: 0,
    };
    this.onChange = this.onChange.bind(this);
    const validationRules = {
      crypto: "nonEmptyLength",
    };
    this.validator = new Validator(validationRules);
  }
  componentDidMount() {
    let account_owner = sessionStorage.getItem("account_owner");
    this.setState({ account_owner , isLoader:true});
    _GET(`/accounts?account_owner=${account_owner}`).then((response) => {
      if (response.data) {
        this.setState({
          accountInfo: response.data.message[0],
          isLoader:false
          
        });
        response.data.message.map((item) => {
          if (item.asset === "USD" && item.account_type === "available") {
            let usdAsset = [];
            let chartData = this.state.chartData;
            chartData[0] = parseFloat(item.balance);
            usdAsset.push(item);
            this.setState({
              usdAsset,
              chartData,
              usdBalance: parseFloat(item.balance),
              isLoader:false
            });
          }
          if (item.asset === "BTC") {
            let btcAsset = [];
            let chartData = this.state.chartData;
            let account_owner = sessionStorage.getItem("account_owner");
            chartData[1] = parseFloat(item.balance);
            btcAsset.push(item);
            this.setState({
              isLoader:true
            })
            _GET(
              `/index?underlying=BTC&quoted_currency=USD`
            ).then((response) => {
              let price =
                response.data &&
                response.data.value
              this.setState({
                btcAsset,
                chartData,
                btcBalance: parseFloat(item.balance) * parseFloat(price),
                isLoader:false
              });
            });
          }
          if (item.asset === "ETH") {
            let ethAsset = [];
            let chartData = this.state.chartData;
            chartData[2] = parseFloat(item.balance);
            ethAsset.push(item);
            this.setState({
              isLoader:true
            })
            _GET(
              `/index?underlying=ETH&quoted_currency=USD`
            ).then((response) => {
              let price =
                response.data &&
                response.data.value

              this.setState({
                ethAsset,
                chartData,
                ethBalance: parseFloat(item.balance) * parseFloat(price),
                isLoader:false
              });
            });
          }
        });
      }
    });
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

  render() {
    let totalAmount = parseFloat(this.state.usdBalance +
      this.state.btcBalance +
      this.state.ethBalance).toFixed(2)
    let chartData = [
      this.state.usdBalance,
      this.state.btcBalance,
      this.state.ethBalance,
    ];
    let data = {
      labels: ["USD", "Bitcoin", "Ethereum"],
      datasets: [
        {
          data: chartData,
          backgroundColor: ["red", "yellow", "green"],

          borderWidth: 1,
        },
      ],
    };
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
        {/* <Row> */}
        <Col xs={12} md={12} style={{ textAlign: "center" }}>
          <h3
            className="imp-header"
            style={{ color: "white", fontWeight: "normal" }}
          >
            Discover Crypto Balance
          </h3>
        </Col>
        <Col xs={12} md={12} style={{ textAlign: "center" }}>
          <h3
            className="imp-header"
            style={{ color: "white", fontWeight: "normal", fontSize: "25px" }}
          >
            $
            {totalAmount}
          </h3>
        </Col>
        {/* </Row> */}

        <hr className="heading-divider" />
        <Row>
          <Col style={{textAlign:'center'}}>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                labels: {
                  fontColor: "white",
                  fontSize: 18,
                },
              },
            }}
            width={"30%"}
          />
          </Col>
        </Row>
        <br />
        <hr className="heading-divider" />
        <Row>
          <Col
            xs={{size: 10, offset: 1}}
            md={{ size: 6, offset: 3 }}
            style={{ textAlign: "center" }}
          >
            <Card style={{ backgroundColor: "transparent" }}>
              <CardBody
                style={{ backgroundColor: "transparent", color: "white" }}
              >
               
                <Row>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                    {/* <Input type="radio" id="btc" name="crypto" value="BTC" /> */}
                  <i class="fas fa-square" style={{color: 'red', paddingRight:'5%'}}></i>
                    <label > USD</label>
                    
                  </Col>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                    <p style={{ textAlign: "right" }}>
                      ${" "}
                      {this.state.usdAsset && this.state.usdAsset[0]
                        ? this.state.usdAsset[0].balance
                        : "0"}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                  <i class="fas fa-square" style={{color: 'yellow', paddingRight:'5%'}}></i>
                    <label for="btc">Bitcoin</label>
                  </Col>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                    <p style={{ textAlign: "right" }}>
                      {this.state.btcAsset && this.state.btcAsset[0]
                        ? this.state.btcAsset[0].balance
                        : "0"} BTC
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                  <i class="fas fa-square" style={{color: 'green', paddingRight:'5%'}}></i>
                    <label for="eth">Ethereum</label>
                    
                  </Col>
                  <Col style={{ textAlign: "left" }}xs={6} md={6}>
                    <p style={{ textAlign: "right" }}>
                      {this.state.ethAsset && this.state.ethAsset[0]
                        ? this.state.ethAsset[0].balance
                        : "0"} ETH
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr className="heading-divider" />
        <Row>
          <Col xs={6} md={6} style={{ textAlign: "right", color:'white' }}>
            <Input
              type="radio"
              id="btc"
              name="crypto"
              value="BTC"
              onChange={this.onChange}
            />
            <label for="btc">Bitcoin</label>
          </Col>
          <Col xs={6} md={6} style={{ textAlign: "left",color:'white' }}>
            <Input
              type="radio"
              id="eth"
              name="crypto"
              value="ETH"
              onChange={this.onChange}
            />{" "}
            
            <label for="eth">Ethereum</label>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={6} md={6} style={{ textAlign: "right" }}>
            <Button
              className="site-button"
              id="submitButton"
              disabled={this.state.crypto === ""}
              onClick={() => {
                this.props.history.push({
                  pathname: `/buy`,
                  state: {
                    account_owner: this.state.account_owner,
                    underlying: this.state.crypto,
                  },
                });
              }}
            >
              Buy
            </Button>
          </Col>
          <Col xs={6} md={6} style={{ textAlign: "left" }}>
            <Button
              className="site-button"
              id="submitButton"
              onClick={this.SaveForm}
              disabled={true}
            >
              Sell
            </Button>
          </Col>
        </Row>
        <br />
        <br />
      </div>
    );
  }
}

export default SignInNewCrypto;
