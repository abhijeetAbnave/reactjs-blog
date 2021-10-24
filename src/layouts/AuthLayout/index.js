import React, { PureComponent, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import routeGuard from "../../services/guards/route-guard.js";
import Body from "../../elements/Body";

//Import Components
import LeftSidebarMenu from "./LeftSidebarMenu";
import Emitter from "../../services/EventEmitter";

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      themeName: "",
      isInstalled:
        localStorage.getItem("pwanotinstalled") === "true" ? false : true,
      isLaunchedInBrowser:
        localStorage.getItem("launchmode") === "browser-tab" ? true : false,
      isDeferred:
        window.deferredPrompt === null ||
        typeof window.deferredPrompt == "undefined"
          ? false
          : true,
      showClosebutton: false,
      showChildren: false,
    };

    this.capitalizeFirstLetter.bind(this);
    // Emitter.on("THEME_NAME", (newValue) => {
    //   console.log("Emitter fired -------->", newValue);
    //   this.setState({ themeName: newValue });
    // });
  }

  //function for capital first letter of current page pathname
  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {
    Emitter.on("THEME_NAME", (newValue) => {
      // console.log("Emitter fired -------->", newValue);
      this.setState({ themeName: newValue });
    });
  }
  componentWillMount = async () => {
    await routeGuard(this.props).then((result) => {
      if (result.isAllowed) {
        const theme = localStorage.getItem("theme");
        if (theme == null) {
          this.setState({ themeName: "dark" });
        } else {
          this.setState({ themeName: theme });
        }
        if (localStorage.getItem("showClosebutton") != null) {
          this.setState({
            showClosebutton: localStorage.getItem("showClosebutton"),
          });
        }


        this.setState({ showChildren: true });
      } else {
        window.location.replace(result.newLocation);
      }
    });
  };

  componentWillUnmount = () => {
    Emitter.off("THEME_NAME"); // remove THEME_NAME after component unmount
  };

  ///////////////////install PWA code
  installPWA = () => {
    // console.log("inside installPWA function");
    if (window.deferredPrompt) {
      // console.log("inside window.deferredPromp if condition");
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          // When user accepts install popup
          this.setState({ isInstalled: true });
          this.setState({
            isLaunchedInBrowser:
              localStorage.getItem("launchmode") === "browser-tab"
                ? true
                : false,
          });
          this.setState({
            isDeferred:
              window.deferredPrompt === null ||
              typeof window.deferredPrompt == "undefined"
                ? false
                : true,
          });
          // console.log("User accepted the install prompt");
        } else {
          // When user denies install popup
          this.setState({ isInstalled: false });
          this.setState({
            isLaunchedInBrowser:
              localStorage.getItem("launchmode") === "browser-tab"
                ? true
                : false,
          });
          this.setState({
            isDeferred:
              window.deferredPrompt === null ||
              typeof window.deferredPrompt == "undefined"
                ? false
                : true,
          });
          // console.log("User dismissed the install prompt");
        }
      });
    }
  };

  hideCloseButton = () => {
    this.setState({ showClosebutton: true });
    localStorage.setItem("showClosebutton", true);
  };

  render() {
    const classNames = "layout-wrapper d-lg-flex unified-theme-light";
    let splitArray = this.props.match.path.split("/");
    const pageName = this.props.match.path
      ? splitArray[splitArray.length - 1]
      : null;
    return (
      <Body
        loading={!this.state.showChildren}
        component={
          <React.Fragment>
            <div
              id="unified-theme"
              className={
                "layout-wrapper d-lg-flex unified-theme-" + this.state.themeName
              }
            >
              {/* Navigation menu */}
              <LeftSidebarMenu {...this.props} />
              {/*  <Nav onChange={onChange} {...this.props} /> */}

              {/* render page content */}
              {!this.state.showClosebutton &&
                !this.state.isInstalled &&
                this.state.isLaunchedInBrowser &&
                this.state.isDeferred && (
                  <div className="install-overlay shadow-lg">
                    <div class="section-flex">
                      <button
                        class="btn-close-install"
                        id="button"
                        onClick={() => this.hideCloseButton()}
                      >
                        <i className="icon-plus rotate-45"></i>
                      </button>
                      <button
                        class="btn-rounded-install"
                        id="button"
                        onClick={() => this.installPWA()}
                      >
                        <icon class="icon-install"></icon> Install App{" "}
                      </button>
                    </div>
                  </div>
                )}
              <div
                className="layout-full mx-auto my-0"
                key={this.props.children}
              >
                {/* <div className="page-header"> Rank subject selection goes here </div> */}
                {this.props.children}
              </div>
            </div>
          </React.Fragment>
        }
      />
    );
  }
}

export default withRouter(Index);
