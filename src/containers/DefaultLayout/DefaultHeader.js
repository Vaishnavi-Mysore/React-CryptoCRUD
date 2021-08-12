import React, { Component } from "react";
import { DropdownItem, Nav, Input } from "reactstrap";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/currency-pay-logo.svg";
import CPMinLogo from "../../assets/img/brand/CPMinLogo.png";
import { Button } from "react-bootstrap";
import { _GET } from "../../Services/HttpMethodHandler";
import { Link } from "react-router-dom";

export class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAccounts: [],
      accountSelected: "",
    };
  }

  componentDidMount() {
    let account_owner = sessionStorage.getItem("account_owner");
    if (account_owner) {
      this.setState({
        accountSelected: account_owner,
      });
    }
    _GET("/participants?relationship_type=submits_platform_transfers_for").then((response) => {
      if (response.data) {
        this.setState({
          allAccounts: response.data.message,
        });
      }
    });
  }
  renderAllAccounts = () => {
    return this.state.allAccounts.map((item, key) => {
      return (
        <option key={key} value={item.participant_code}>
          {" "}
          {item.participant_name}
        </option>
      );
    });
  };

  onChange = (event) => {
    sessionStorage.setItem("account_owner", event.target.value);
    let pathname = sessionStorage.getItem("pathname");
    // localStorage.setItem("account_owner",  event.target.value);
    this.setState({
      accountSelected: event.target.value,
    });
    //     const linkTarget = {
    //       pathname: "/account-signin",
    //       key: new Date().toString(), // we could use Math.random, but that's not guaranteed unique.
    //       state: {
    //         account_owner: event.target.value
    //       }
    //     };
    // return(<Link to={linkTarget}></Link>)
    //     let id=new Date().toString()
    // this.props.history.push({
    //       pathname: `/account-signin`,
    //       state: { account_owner: event.target.value },
    //       id:new Date().toString(),
    //     });
    let currentPath = "/account-signin";
    this.props.history.replace(`${currentPath}/replace`);
    setTimeout(() => {
      this.props.history.replace(currentPath);
    }, 0);
    // if (pathname === undefined || pathname === false || pathname === null) {
    //   this.props.history.push({
    //     pathname: `/account-signin`,
    //     state: { account_owner: event.target.value },
    //   });
    //   sessionStorage.setItem("pathname", true);
    // } else {
    //   window.location.reload();
    // }
  };
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
        // full={{ src: logo, width: 148, height: 25, alt: 'Currency Pay' }}
        // minimized={{ src: CPMinLogo, width: 30, height: 30, alt: 'Currency Pay' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Button
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "none",
            zIndex: "99",
          }}
          onClick={() => {
            this.props.history.push("/add-new-customer");
          }}
        >
          Add Customer
        </Button>
        <Nav className="ml-auto" navbar>
          <div className="dropdown">
            {/* <button type="button" className="fa fa-angle-down angle-down"> */}
            {/* <div
                className="dropdown-content"
                style={{ marginLeft: "-140px" }}
              > */}
            <Input
              style={{ color: "black", border: "none" }}
              type="select"
              placeholder=" "
              // className={this.state.errors && this.state.errors.userName ? 'floating-input-error removeArrow' : 'floating-input removeArrow'}
              id="accountSelected"
              name="accountSelected"
              onChange={this.onChange}
              value={this.state.accountSelected}
            >
              <option value="" selected>
                Accounts
              </option>
              {this.renderAllAccounts()}
            </Input>
            {/* </div> */}
            {/* </button>{" "} */}
          </div>
        </Nav>
        <Nav className="ml-auto" navbar>
          <label>Admin</label>
          <div className="dropdown">
            <button type="button" className="fa fa-angle-down angle-down" />
            <div className="dropdown-content" style={{ marginLeft: "-140px" }}>
              <DropdownItem id="Logout" onClick={(e) => this.props.onLogout(e)}>
                <i className="fa fa-lock" />
                Logout
              </DropdownItem>
            </div>
          </div>
        </Nav>{" "}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = {};
DefaultHeader.defaultProps = {};

export default DefaultHeader;
