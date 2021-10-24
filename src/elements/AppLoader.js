import React from "react";

function AppLoader({ show = true, loaderType }) {
  if (!show) return null;

  ///////////// code for adding loaders according to pages //////////////////////

  return (
    <div className="d-f-c">
      {/* <img
        className="text-center"
        src={SpinnerGif}
        width="200px"
        height="200px"
        alt="Blog logo"
      /> */}
      <section className="m-auto text-center loader-position"  >
        <div className="row width-100">
          <div className="col-md-12 my-4 m-auto text-center">
            <div width="100px" height="30px" className="loader-logo" >&nbsp;</div>
          </div>
          <div className="col-md-12 text-center m-auto" >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="60px"
              height="60px"
              viewBox="0 0 80 30"
              style={{ textAlign: "center", margin: "auto" }}
              className="m-auto text-center"
            >
              <circle cx={10} cy={10} r={10} fill="#f16b24">
                <animate
                  attributeName="cx"
                  from={10}
                  to={40}
                  dur="0.5s"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={10} cy={10} r={0} fill="#e4ac13">
                <animate
                  attributeName="r"
                  from={0}
                  to={10}
                  dur="0.5s"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={40} cy={10} r={10} fill="#f16b24">
                <animate
                  attributeName="cx"
                  from={40}
                  to={70}
                  dur="0.5s"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={70} cy={10} r={10} fill="#f16b24">
                <animate
                  attributeName="r"
                  from={10}
                  to={0}
                  dur="0.5s"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppLoader;
