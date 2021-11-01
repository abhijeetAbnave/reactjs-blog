import React, { Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import store from "../../store/store";
import Body from "../../elements/Body";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";

import pwaConfig from "../../pwaConfig.json";
import {
  showSuccessMessage,
  showNoInternetAlert,
  showWarningMessage,
} from "../../services/utility";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
}));

function MyBlog(props) {
  const classes = useStyles();
  const [verifySpinner, setverifySpinner] = useState(true);
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    getAllBlogs();
  }, [])

  const getAllBlogs = () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {};
      api
        .getApi(`${pwaConfig.apiEndPoint}/${pwaConfig.getMyBlogs}`, payload, {
          headers: headers,
        })
        .then((data) => {
          if (data) {
            if (data.length !== 0) {
              setverifySpinner(false);
              setBlogsData(data);
            } else {
              showWarningMessage("No Blogs are there");
              setverifySpinner(false);
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

  return (
    <Body
      component={
        <Fragment key={"FeedRails"}>
          <div className={classes.root + " overflow-class"}>
            <Grid container>
              <Grid item xs={12}>
                <div className="m-auto loginCard ">
                  <div className="form-group">
                    <button
                      type="button"
                      className="card-button"
                      id
                      // onClick={showTextClick}
                      disabled={false}
                    >
                      Add Blog
                    </button>
                  </div>
                  {blogsData.map((blog, index) => {
                    return (
                      <div key={index} className="card-blog">
                        <div className="row">
                          <div className="col-2">
                            <i className="icon-edit "></i>
                            <span className="nav-Text">Edit</span>
                          </div>
                          <div className="col-8">
                            <h2>{blog.blog_name}</h2>
                          </div>
                          <div className="col-2">
                            <i className="icon-delete "></i>
                            <span className="nav-Text">Delete</span>
                          </div>

                        </div>

                        <h5>{blog.blog_subtitle}, {blog.blog_created_timestamp}</h5>
                        <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                        <p>{blog.blog_content}</p>
                      </div>
                    )
                  })}
                </div>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      }
    />
  );
}

export default connect(null)(withRouter(MyBlog));
