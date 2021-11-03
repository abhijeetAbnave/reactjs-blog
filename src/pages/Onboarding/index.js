import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import logo_light from "../../assets/images/logo/svg.svg";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import pwaConfig from "../../pwaConfig.json";
import { connect } from "react-redux";
import { login } from "../../reducers/auth/actions";
import store from "../../store/store";
import setAuthToken from "../../actions/setAuthToken";

import {
  getEncodedJWTToken,
  showSuccessMessage,
  showNoInternetAlert,
  showWarningMessage,
} from "../../services/utility";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { saveUserDataToLocalStorage } from "../../services/dataServices/userProfileService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isOTPGenerated: false,
      otpHash: "",
      spinner: false,
      varifySpinner: false,
      spinnerForFeed: false,
      country_code: "91",
      validationLength: 10,
      rawPhone: "",
      timer_refresh: null,
      showResend: false,
      enteredCode: "",
      isJoinedClicked: false,
      register: false,
      registerEmail: "",
      registerFirstname: "",
      registerLastname: "",
      registerPassword: "",
      registerLoader: false,
    };
    window.UserName = this.state.rawPhone;
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleCodeChange = (event) => {
    this.setState({
      enteredCode: event.target.value,
    });
  };

  handleRegisterEmail = (event) => {
    this.setState({
      registerEmail: event.target.value,
    });
  };

  handleRegisterPassword = (event) => {
    this.setState({
      registerPassword: event.target.value,
    });
  };

  handleRegisterFirstname = (event) => {
    this.setState({
      registerFirstname: event.target.value,
    });
  };

  handleRegisterLastname = (event) => {
    this.setState({
      registerLastname: event.target.value,
    });
  };

  registerClicked = (event) => {
    if (this.validateEmail(this.state.registerEmail)) {
      this.setState({
        registerLoader: true,
      });
      this.isRegistered();
    } else {
      showWarningMessage("Enter Valid Email");
    }
    if (event) event.preventDefault();
  };

  isRegistered = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {
        first_name: this.state.registerFirstname,
        last_name: this.state.registerLastname,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        role: "blogger"
      };
      api
        .post(`${pwaConfig.apiEndPoint}/${pwaConfig.register}`, payload, {
          headers: headers,
        })
        .then((data) => {
          let validationResponse = data;
          if (validationResponse) {
            if (validationResponse.token) {
              showSuccessMessage("Registration Successful, Login Again");
              this.getUserProfile(validationResponse);
              this.setState({
                registerPassword: "",
                registerLoader: false,
                registerFirstname: "",
                registerLastname: "",
                registerEmail: "",
                register: false,
                enteredCode: "",
                password: ""
              });
            } else {
              showWarningMessage(validationResponse.message + ", Try again");
              this.setState({
                registerPassword: "",
                registerLoader: false,
                registerFirstname: "",
                registerLastname: "",
                registerEmail: "",
                register: true,
              });
            }
          } else {
            showWarningMessage("No Response from API, Try again");
            console.log("No Response from API");
            this.setState({
              registerPassword: "",
              registerLoader: false,
              registerFirstname: "",
              registerLastname: "",
              registerEmail: "",
              register: true,
            });
          }
        });
    } catch (error) {
      console.log("Error Response from API", error);
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (event) => {
    this.setState({
      varifySpinner: true,
    });
    this.isValidPassword();
    if (event) event.preventDefault();
  };

  isValidPassword = () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {
        email: this.state.enteredCode,
        password: this.state.password,
      };
      api
        .post(`${pwaConfig.apiEndPoint}/${pwaConfig.authenticate}`, payload, {
          headers: headers,
        })
        .then((data) => {
          let validationResponse = data;
          if (validationResponse) {
            if (validationResponse.token) {
              this.getUserProfile(validationResponse);
              this.setState({
                varifySpinner: false,
              });
            } else {
              showWarningMessage(validationResponse.message + ", Try again");
              this.setState({
                varifySpinner: false,
                enteredCode: "",
                password: "",
                isJoinedClicked: false,
              });
            }
          } else {
            showWarningMessage("No Response from API, Try again");
            console.log("No Response from API");
            this.setState({
              varifySpinner: false,
              enteredCode: "",
              password: "",
              isJoinedClicked: false,
            });
          }
        });
    } catch (error) {
      console.log("Error Response from API", error);
    }
  };

  getUserProfile = async (userProfileData) => {
    await saveUserDataToLocalStorage(userProfileData);
    // this.props.setAuthToken({ token: userProfileData.token });
    await this.props.login({ user: userProfileData });
    this.props.history.replace("/home");
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  joinClicked = async () => {
    if (this.validateEmail(this.state.enteredCode)) {
      this.setState({
        isJoinedClicked: true,
      });
    } else {
      showWarningMessage("Enter Valid Email");
    }
  };

  maxLengthValidation = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      showWarningMessage("Max length reached");
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  onRegisterClick = () => {
    this.setState({
      register: true,
    });
  };

  componentDidMount() {
    // localStorage.setItem("user_type", "blogger");
    // this.getUserProfile();
  }

  render() {
    return (
      <div>
        <section className="login">
          <div className="container-fluid login-container">
            <div id="content">
              <div
                className="col-md-12 no-gutters"
              // id="onboarding-content-card "
              >
                <div className="width-100">
                  <div className="m-auto loginCard ">
                    {!this.state.register ? (
                      <Fragment>
                        <div className="row no-gutters my-auto">
                          {/* <div className="col-xs-12 col-sm-12 col-md-12 my-auto text-center">
                            <img
                              src={logo_light}
                              width="200px"
                              height="auto"
                              className="img-fluid"
                            />
                          </div> */}
                          <div className="cardtitle text-center text-white">
                            Sign In With Email and Password
                          </div>
                        </div>
                        <div className="row my-2 ">
                          <div className="col-sm-7 mx-auto">
                            <div className="width-100 ">
                              <Fragment>
                                {" "}
                                <div>
                                  <div>
                                    <input
                                      id="code"
                                      type="email"
                                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                                      // inputMode="numeric"
                                      maxLength={50}
                                      onInput={this.maxLengthValidation}
                                      className="input-with-button"
                                      placeholder="please enter email"
                                      onChange={this.handleCodeChange}
                                      disabled={this.state.isJoinedClicked}
                                    />{" "}
                                    <button
                                      type="button"
                                      className="card-button-join"
                                      onClick={this.joinClicked}
                                      disabled={this.state.isJoinedClicked}
                                    >
                                      Join
                                    </button>
                                    {/* <input type="submit" className="card-button-join" placeholder="Join"> */}
                                  </div>
                                  {!this.state.isJoinedClicked && <div
                                    className="cardtitle text-center text-white uk-link"
                                    onClick={this.onRegisterClick}
                                  >
                                    Register
                                  </div>}
                                </div>
                              </Fragment>
                            </div>

                            {this.state.isJoinedClicked && (
                              <div>
                                <div className="input-group form-group margin-temp">
                                  <input
                                    type="password"
                                    // pattern="[0-9]*"
                                    // inputmode="numeric"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    className="form-control border-radius-pill text-center"
                                    placeholder={
                                      this.state.isJoinedClicked
                                        ? "password"
                                        : "OTP"
                                    }
                                    autoComplete="off"
                                    maxLength={20}
                                    onInput={this.maxLengthValidation}
                                    required
                                  />
                                </div>
                                {!this.state.varifySpinner ? (
                                  <div className="form-group">
                                    <button
                                      type="button"
                                      className="card-button"
                                      id
                                      onClick={this.handleSubmit}
                                    >
                                      Proceed
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center card-button">
                                    <Spinner
                                      className=" "
                                      animation="border"
                                      style={{ color: "#fff" }}
                                      size="lg"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="row no-gutters my-auto">
                          <div className="cardtitle text-center text-white">
                            Please Register Yourself
                          </div>
                        </div>
                        <div className="row my-2 ">
                          <div className="col-sm-7 mx-auto">
                            <div className="width-100 ">
                              {!this.state.registerLoader ? (
                                <Fragment>
                                  {" "}
                                  <div>
                                    <div className="input-group-1 form-group ">
                                      <input
                                        id="re-email"
                                        type="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                                        // inputMode="numeric"
                                        maxLength={50}
                                        onInput={this.maxLengthValidation}
                                        className="input-with-button"
                                        placeholder="please enter email"
                                        onChange={this.handleRegisterEmail}
                                      />{" "}
                                    </div>
                                    <div className="input-group-1 form-group ">
                                      <input
                                        id="re-firstname"
                                        type="text"
                                        maxLength={50}
                                        onInput={this.maxLengthValidation}
                                        className="input-with-button"
                                        placeholder="Please enter First name"
                                        onChange={this.handleRegisterFirstname}
                                      />{" "}
                                    </div>
                                    <div className="input-group-1 form-group ">
                                      <input
                                        id="re-lastname"
                                        type="text"
                                        maxLength={50}
                                        onInput={this.maxLengthValidation}
                                        className="input-with-button"
                                        placeholder="Please enter Last name"
                                        onChange={this.handleRegisterLastname}
                                      />{" "}
                                    </div>
                                    <div className="input-group-1 form-group">
                                      <input
                                        id="re-passoword"
                                        type="password"
                                        // inputMode="numeric"
                                        maxLength={10}
                                        onInput={this.maxLengthValidation}
                                        className="input-with-button"
                                        placeholder="Password"
                                        onChange={this.handleRegisterPassword}
                                      />{" "}
                                      {/* <input type="submit" className="card-button-join" placeholder="Join"> */}
                                    </div>
                                    <div
                                      className="cardtitle text-center text-white uk-link"
                                      onClick={this.registerClicked}
                                    >
                                      Register
                                    </div>
                                  </div>
                                </Fragment>
                              ) : (
                                <div className="text-center card-button">
                                  <Spinner
                                    className=" "
                                    animation="border"
                                    style={{ color: "#fff" }}
                                    size="lg"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
              <div
                id="copyright"
                className="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index"
              >
                <div className="col-sm-12 mx-auto my-auto ">
                  <div className=" text-center my-auto footer-text ">
                    {" "}
                    {new Date().getFullYear()} |{process.env.REACT_APP_VERSION}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login,
  setAuthToken
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
