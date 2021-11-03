import React, { Fragment, useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import store from "../../store/store";
import Body from "../../elements/Body";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import Roles from "../../roles.json";
import pwaConfig from "../../pwaConfig.json";
import {
  showSuccessMessage,
  showNoInternetAlert,
  showWarningMessage,
} from "../../services/utility";
import moment from "moment"

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
  const [showEditModule, setShowEditModule] = useState(false);
  const [newBlog, setNewBlog] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const userStates = store.getState();
  const [editBlogState, setEditBlog] = useState({
    blog_name: "",
    blog_subtitle: "",
    blog_content: "",
    blog_owner_name: "",
    blog_owner_id: "",
    blog_read_time: "5 minutes",
    blog_comments: "none"
  })

  useEffect(() => {
    getAllBlogs();
  }, [])

  const editBlogSet = (blog) => {
    let updatedBlog = { ...editBlogState, ...blog }
    setEditBlog(updatedBlog);
  }

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
              setBlogsData(data);
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

  const maxLengthValidation = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      showWarningMessage("Max length reached");
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const editBlog = () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = editBlogState;
      api
        .put(`${pwaConfig.apiEndPoint}/${pwaConfig.updateBlog}`, payload, {
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
              setBlogsData(data);
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
    setNewBlog(false);
    setEditBlog({
      blog_name: "",
      blog_subtitle: "",
      blog_content: "",
      blog_owner_name: "",
      blog_owner_id: "",
      blog_read_time: "5 minutes",
      blog_comments: "none"
    });
  }

  const addBlog = () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let ownerDetails = {
        blog_owner_id: userStates.user._id,
        blog_owner_name: userStates.user.first_name
      }
      const payload = {
        ...editBlogState,
        ...ownerDetails
      };

      api
        .post(`${pwaConfig.apiEndPoint}/${pwaConfig.addBlog}`, payload, {
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
              setBlogsData(data);
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
    setNewBlog(false);
    setEditBlog({
      blog_name: "",
      blog_subtitle: "",
      blog_content: "",
      blog_owner_name: "",
      blog_owner_id: "",
      blog_read_time: "5 minutes",
      blog_comments: "none"
    });
  }

  const publishBlog = (id, approved) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {
        _id: id,
        blog_approved: !approved
      };
      api
        .put(`${pwaConfig.apiEndPoint}/${pwaConfig.approveBlog}`, payload, {
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
              setBlogsData(data);
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

  const deleteBlog = (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const payload = {
        _id: id
      };
      api
        .delete(`${pwaConfig.apiEndPoint}/${pwaConfig.deleteBlog}`, payload, {
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
              setBlogsData(data);
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

  const updateEditBlocks = (e) => {

    switch (e.target.id) {
      case "title":
        setEditBlog({ ...editBlogState, blog_name: e.target.value })
        break;
      case "subtitle":
        setEditBlog({ ...editBlogState, blog_subtitle: e.target.value })
        break;
      case "contents":
        setEditBlog({ ...editBlogState, blog_content: e.target.value })
        break;
      case "read_time":
        setEditBlog({ ...editBlogState, blog_read_time: e.target.value })
        break;

      default:
        break;
    }
  }

  const EditModal = () => {
    return (
      <Modal
        isOpen={showEditModule}
        hidefunction={() => {
          setShowEditModule(!showEditModule);
        }}
      >
        <ModalHeader closeButton>{"Edit Blog"}</ModalHeader>
        <ModalBody>
          <div className="row input-group-1 form-group">
            <div className="col-3 span-text">
              <span>Title</span>
            </div>
            <div className="col-9">
              <input
                id="title"
                type="text"
                // inputMode="numeric"
                maxLength={50}
                value={editBlogState.blog_name}
                onInput={maxLengthValidation}
                className="input-group-text"
                placeholder="Please enter Title"
                onChange={updateEditBlocks}
              />{" "}
            </div>

          </div>
          <div className="row input-group-1 form-group ">
            <div className="col-3 span-text">
              <span>Sub Title</span>
            </div>
            <div className="col-9">
              <input
                id="subtitle"
                type="text"
                maxLength={50}
                value={editBlogState.blog_subtitle}
                onInput={maxLengthValidation}
                className="input-group-text"
                placeholder="Please enter Subtitle"
                onChange={updateEditBlocks}
              />{" "}
            </div>

          </div>
          <div className="row input-group-1 form-group">
            <div className="col-3 span-text">
              <span>Contents</span>
            </div>
            <div className="col-9">
              <textarea
                id="contents"
                type="text"
                // inputMode="numeric"
                // maxLength={10}
                // onInput={maxLengthValidation}
                value={editBlogState.blog_content}
                className="input-text-area"
                placeholder="Contents......"
                onChange={updateEditBlocks}
              />{" "}
            </div>

          </div>
          <div className="row input-group-1 form-group">
            <div className="col-3 span-text">
              <span>Read Time</span>
            </div>
            <div className="col-9">
              <input
                id="read_time"
                type="text"
                // inputMode="numeric"
                // maxLength={10}
                // onInput={maxLengthValidation}
                value={editBlogState.blog_read_time}
                className="input-group-text"
                placeholder="Read time"
                onChange={updateEditBlocks}
              />{" "}
            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowEditModule(false);
            }}
            className="modal-button btn btn-outline"
          >
            {" "}
            {"Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              newBlog ? addBlog() : editBlog();
              setShowEditModule(false);
            }}
            className="modal-button  btn btn-primary"
          >
            {" "}
            {newBlog ? "Add" : "Update"}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

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
                      onClick={() => {
                        setNewBlog(true);
                        setShowEditModule(!showEditModule);
                      }}
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
                            <button
                              className="btn-edit-install"
                              id="button"
                              onClick={() => {
                                setShowEditModule(!showEditModule);
                                editBlogSet(blog);
                              }}
                            >
                              <i className="icon-edit "></i>
                            </button>
                            {/* <span className="nav-Text">Edit</span> */}
                          </div>
                          <div className="col-8">
                            <h2>{blog.blog_name}</h2>
                          </div>
                          <div className="col-2">
                            <button
                              className="btn-delete-install"
                              id="button"
                              disabled={blog.deleted}
                              onClick={() => deleteBlog(blog._id)}
                            >
                              <i className="icon-delete "></i>
                            </button>
                            {/* <span className="nav-Text">Delete</span> */}
                          </div>

                        </div>

                        <h5>{blog.blog_subtitle}, {moment(blog.blog_created_timestamp).format("MMM Do, YYYY")}</h5>
                        <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                        <p>{blog.blog_content}</p>
                        <div className="form-group">
                          <button
                            type="button"
                            className="card-button"
                            id
                            onClick={() => publishBlog(blog._id, blog.blog_approved)}
                            disabled={!(userStates.user.role === Roles.admin)}
                          >
                            {blog.blog_approved ? "Published" : "Publish"}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Grid>
            </Grid>
          </div>
          {EditModal()}
        </Fragment>
      }
    />
  );
}

export default connect(null)(withRouter(MyBlog));
