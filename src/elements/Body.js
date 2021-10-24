import React, { Suspense } from "react";
import PropTypes from "prop-types";

import AppLoader from "./AppLoader";

function Body({ loading, component }) {
  if (loading) return <AppLoader />;

  return <Suspense fallback={() => <AppLoader />}>{component}</Suspense>;
}

Body.propTypes = {
  component: PropTypes.node,
  loading: PropTypes.bool,
};

Body.defaultProps = {
  error: "",
  loading: false,
};

export default Body;
