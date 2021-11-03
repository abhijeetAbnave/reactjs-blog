import React, { Component } from "react";
import { withRouter, useHistory } from "react-router-dom";
import routeGuard from "../services/guards/route-guard.js";
import Body from "../elements/Body";
import { PureComponent } from "react";

class NonAuth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: false,
    };
    this.capitalizeFirstLetter.bind(this);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount = async () => {
    // const entryPath = getGlobal().entryPath;
    // if(getGlobal().token){
    //     this.props.history.replace(["/login", "/"].includes(entryPath) ? "/" : entryPath);
    // }
    await routeGuard(this.props).then((result) => {
      if (result.isAllowed) {
        let currentage = this.capitalizeFirstLetter(
          this.props.location.pathname
        );
        document.title = currentage + " | Blog - Abhijeet";
        this.setState({ showChildren: true });
      } else {
        window.location.replace(result.newLocation);
      }
    });
  };
  render() {
    return <Body
      loading={!this.state.showChildren}
      component={<React.Fragment>{this.props.children}</React.Fragment>}
    />;
  }
}

export default withRouter(NonAuth);
