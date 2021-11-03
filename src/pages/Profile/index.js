import React, { Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import store from "../../store/store";
import Body from "../../elements/Body";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import api from "../../services/api";
import pwaConfig from "../../pwaConfig.json";
import { getUserProfileData } from "../../services/dataServices/userProfileService";
import Roles from "../../roles.json";
import {
  showSuccessMessage,
  showNoInternetAlert,
  showWarningMessage,
} from "../../services/utility";
import Grid from "@material-ui/core/Grid";

function Profile(props) {
  const [usersData, setUsersData] = useState([]);
  const [verifySpinner, setverifySpinner] = useState(false);
  const reduxStates = store.getState();

  const { first_name, last_name, email, deleted, role } = reduxStates.user;

  useEffect(() => {
    if (role === Roles.admin) getAllUsers();
  }, []);

  const getAllUsers = () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {};
      api
        .getApi(`${pwaConfig.apiEndPoint}/${pwaConfig.getUsers}`, payload, {
          headers: headers,
        })
        .then((data) => {
          if (data) {
            if (data.length !== 0) {
              setverifySpinner(false);
              setUsersData(data);
            } else {
              showWarningMessage("No Blogs are there");
              setverifySpinner(false);
              setUsersData(data);
            }
          } else {
            showWarningMessage("No Response from API, Try again");
            console.log("No Response from API");
            setverifySpinner(false);
            props.history.push("/login");
          }
        });
    } catch (error) {
      console.log("Error Response from API", error);
    }
  };

  const deleteUser = (payload) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      api
        .delete(`${pwaConfig.apiEndPoint}/${pwaConfig.deleteUser}`, payload, {
          headers: headers,
        })
        .then((data) => {
          if (data) {
            if (data.length !== 0) {
              setverifySpinner(false);
              setUsersData(data);
            } else {
              showWarningMessage("No Blogs are there");
              setverifySpinner(false);
              setUsersData(data);
            }
          } else {
            showWarningMessage("No Response from API, Try again");
            console.log("No Response from API");
            setverifySpinner(false);
            props.history.push("/login");
          }
        });
    } catch (error) {
      console.log("Error Response from API", error);
    }
  }


  return (
    <Body
      component={
        <Fragment key={"FeedRails"}>
          <div className={"overflow-class"}>
            <Grid container>
              <Grid item xs={12}>
                <div className="row no-gutters my-auto">
                  <div className="cardtitle text-center text-white">
                    {role === Roles.admin ? "Users Data" : "Your Profile Data"}
                  </div>
                </div>
                <div className="row my-2 ">
                  <div className="col-sm-7 mx-auto">
                    <div className="width-100 ">
                      <div className="m-auto loginCard ">
                        <Fragment>
                          {" "}
                          {role === Roles.admin ? (
                            usersData.map((user, index) => {
                              return (
                                <div key={index} className="card-blog">
                                  <div className="row">
                                    <div className="col-9 ">
                                      <div className="row">
                                        <div className="col-4 ">
                                          <h4>First Name: </h4>
                                        </div>
                                        <div className="col-8">
                                          <h4>{user.first_name}</h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-4 ">
                                          <h4>Last Name: </h4>
                                        </div>
                                        <div className="col-8">
                                          <h4>{user.last_name}</h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-4 ">
                                          <h4>Email: </h4>
                                        </div>
                                        <div className="col-8">
                                          <h4>{user.email}</h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-4 ">
                                          <h4>Role: </h4>
                                        </div>
                                        <div className="col-8">
                                          <h4>{user.role}</h4>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-3">
                                      <button
                                        className="btn-edit-install"
                                        id="button"
                                        style={{ height: 40 }}
                                        disabled={!(user.deleted)}
                                        onClick={() => deleteUser({
                                          _id: user._id,
                                          deleted: false
                                        })}
                                      >
                                        <i className="icon-edit "></i>
                                      </button>
                                      <button
                                        className="btn-delete-install"
                                        id="button"
                                        style={{ height: 40 }}
                                        disabled={user.deleted}
                                        onClick={() => deleteUser({
                                          _id: user._id,
                                          deleted: true
                                        })}
                                      >
                                        <i className="icon-delete "></i>
                                      </button>
                                      {/* <span className="nav-Text">Delete</span> */}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="card-blog">
                              <div className="row">
                                <div className="col-9 ">
                                  <div className="row">
                                    <div className="col-4 ">
                                      <h4>First Name: </h4>
                                    </div>
                                    <div className="col-8">
                                      <h4>{first_name}</h4>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4 ">
                                      <h4>Last Name: </h4>
                                    </div>
                                    <div className="col-8">
                                      <h4>{last_name}</h4>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4 ">
                                      <h4>Email: </h4>
                                    </div>
                                    <div className="col-8">
                                      <h4>{email}</h4>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4 ">
                                      <h4>Role: </h4>
                                    </div>
                                    <div className="col-8">
                                      <h4>{role}</h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-3">
                                  <button
                                    className="btn-delete-install"
                                    id="button"
                                    style={{ height: 40 }}
                                    disabled={true}
                                    // onClick={() => deleteUser(user._id)}
                                  >
                                    <i className="icon-delete "></i>
                                  </button>
                                  {/* <span className="nav-Text">Delete</span> */}
                                </div>
                              </div>
                            </div>
                          )}
                        </Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      }
    />
  );
}

export default connect(null)(withRouter(Profile));
