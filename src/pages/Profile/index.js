import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import store from "../../store/store";
import Body from "../../elements/Body";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import api from "../../services/api";
import pwaConfig from "../../pwaConfig.json";
import S3FileUpload from "react-s3";
import imageCompression from "browser-image-compression";
import camera from "../../assets/images/camera.png";
import { getUserProfileData } from "../../services/dataServices/userProfileService"


function Profile() {
    const [id, setId] = useState("")
  const [username, setUserName] = useState("");
  const [email, setemail] = useState("")

  getUserProfileData().then(data => {
    setId(data._id)
    setUserName(data.first_name + " " + data.last_name);
    setemail(data.email)
})
  return (
    <Body
      component={
        <Fragment key={"FeedRails"}>
          <div className="row no-gutters my-auto">
            <div className="cardtitle text-center text-white">
              Your Profile Data
            </div>
          </div>
          <div className="row my-2 ">
            <div className="col-sm-7 mx-auto">
              <div className="width-100 ">
              <div className="m-auto loginCard ">
                <Fragment>
                  {" "}
                  <div>
                  <div className="input-group-1 form-group ">
                      <h6>
                          {username}
                      </h6>
                    </div>
                    <div className="input-group-1 form-group ">
                      <h6>
                          {id}
                      </h6>
                    </div>
                    <div className="input-group-1 form-group ">
                    <h6>
                          {email}
                      </h6>
                    </div>
                    
                  </div>
                </Fragment>
              </div>
              </div>
            </div>
          </div>
        </Fragment>
      }
    />
  );
}

export default connect(null)(withRouter(Profile));
