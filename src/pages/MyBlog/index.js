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

const configS3 = {
  bucketName: "reactjs-blog",
  region: "ap-south-1",
  accessKeyId: "****R",
  secretAccessKey: "HXiO3NfsCABZkUoCe8VST5N4Aych7nhZRe0rIh6Q",
};

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

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

function Home() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [textContent, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [showImage, setShowImage] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [textLoader, setTextLoader] = useState(false);
  const [summaryLoader, setSummaryLoader] = useState(false);

  const showTextClick = () => {
    setShowImage(false);
    setShowText(true);
    setShowSummary(false);
  };

  const showSummaryClick = () => {
    setShowImage(false);
    setShowText(false);
    setShowSummary(true);
  };

  const showImageClick = () => {
    setShowImage(true);
    setShowText(false);
    setShowSummary(false);
  };

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        try {
          setTextLoader(true);
          const compressedFile = await imageCompression(file, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          const newUrl = URL.createObjectURL(compressedFile);
          const sample =
            "The API server automatically generates an interactive Swagger documentation page. Go to http://localhost:5000 to load it. From there you can explore the API and also create test requests.";
          setSource(newUrl);

          const img = "https://tesseract.projectnaptha.com/img/eng_bw.png";
          S3FileUpload.uploadFile(compressedFile, configS3)
            .then((data) => {
              console.log("S3 return data ", data);
              try {
                const headers = {
                  "Content-Type": "application/json",
                };
                const url = data.location;
                api
                  .get(
                    `https://api.ocr.space/parse/imageurl?apikey=3720e3a4fc88957&url=${url}`
                  )
                  .then((data) => {
                    if (data.data) {
                      let response = data.data;
                      console.log(
                        "NEW OCR API",
                        response.ParsedResults[0].ParsedText
                      );
                      setText(response.ParsedResults[0].ParsedText);
                      // setShowText(true)
                      setTextLoader(false);
                      setSummaryLoader(true);
                      let payload = {
                        ParsedResults: response.ParsedResults[0].ParsedText,
                      };

                      try {
                        const headers = {
                          "Content-Type": "application/json",
                        };
                        // const payload = {
                        //   text: response.ParsedResults[0].ParsedText,
                        // };
                        api
                          .post(
                            `${pwaConfig.apiEndPoint}/${pwaConfig.predict}`,
                            payload,
                            {
                              headers: headers,
                            }
                          )
                          // .get(
                          //   `${pwaConfig.apiEndPoint}/${pwaConfig.predict}?name=${response.ParsedResults}`
                          // )
                          .then((data) => {
                            let validationResponse = data;
                            if (validationResponse) {
                              console.log(
                                "Response from API",
                                validationResponse
                              );
                              setSummary(validationResponse);
                              // setShowSummary(true);
                              setSummaryLoader(false);
                            } else {
                              console.log("No Response from API");
                            }
                          });
                      } catch (error) {
                        console.log("Error Response from API", error);
                        setSummary(error.toString());

                        setSummaryLoader(false);
                      }
                    } else {
                      console.log("No Response from API");
                    }
                  });
              } catch (error) {
                console.log("Error Response from API", error);
                setText(error.toString());

                setTextLoader(false);
              }
            })
            .catch((error) => {
              console.log("S3 error ", error);
            });
        } catch (error) {
          console.log("Image compression error " + error);
        }
      }
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
                      onClick={showTextClick}
                      disabled={false}
                    >
                        Add Blog
                    </button>
                  </div>
                  <div className="card-blog">
                    <div className="row">
                        <div className="col-10">
                        <h2>TITLE HEADING</h2>
                        </div>
                        <div className="col-2">
                        <i className="icon-delete "></i>
                    <span className="nav-Text">Delete</span>
                        </div>
                        
                    </div>
                    
                    
                    <h5>Title description, Dec 7, 2017</h5>
                    <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                    <p>Some text..</p>
                  </div>
                  <div className="card-blog">
                    <h2>TITLE HEADING</h2>
                    <h5>Title description, Sep 2, 2017</h5>
                    <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                    <p>Some text..</p>
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

export default connect(null)(withRouter(Home));
