import React, { useEffect, useState, Suspense } from "react";
import "./App.sass";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./assets/scss/themes.scss";
import Config from "./pwaConfig";
import { authProtectedRoutes, publicRoutes } from "./routes";
import NonAuthLayout from "./layouts/NonAuth";
import AuthLayout from "./layouts/AuthLayout/";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import AppLoader from "./elements/AppLoader";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import api from "./services/api";
import pwaConfig from "./pwaConfig.json";
import S3FileUpload from "react-s3";
import imageCompression from 'browser-image-compression';

var NewshowExitModal = false;
const App = () => {
  if (!["dark", "light"].includes(Config.theme)) Config.theme = "light";

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
        <Suspense fallback={<AppLoader />}>
          <Switch>
            {/* public routes */}
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                meta={route.meta}
              />
            ))}

            {/* private/auth protected routes */}
            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={AuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                theme={Config.theme}
                meta={route.meta}
              />
            ))}
          </Switch>
        </Suspense>
      </React.Fragment>
      {/* </GuardProvider> */}
    </BrowserRouter>
  );

}

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  theme: theme,
  meta: meta,
  ...rest
}) => {
  return (
    <Route
      meta={meta}
      {...rest}
      render={(props) => {
        if (!isAuthProtected) {
          return (
            <Layout theme={theme} meta={meta}>
              <Component {...props} />
            </Layout>
            /*  <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> */
          );
        }
        // authorised so return component
        return (
            <Layout theme={theme} meta={meta}>
              <Component {...props} />
            </Layout>
        );
      }}
    />
  );
};


export default App;
