import store from "../../store/store";

// import routesNotAllowed from "./student-not-allowed-routes-iitpace";

const routeGuard = async (props) => {
  let next = {
    isAllowed: true,
    newLocation: "/",
  };
  
  const state = store.getState();
  // console.log("state in route guard ------->", state.config);


  const isLoggedIn = state.user && state.user?.id ? true : false;

  // console.log("props.meta", props.meta.public);
  if (props.meta.public) return next;

  // If user is not loggedin and access private route
  if (props.meta.auth && !isLoggedIn) {
    next.isAllowed = false;
    next.newLocation = "/login";
    return next;
  }

  // If user is loggedin and access the public route
  if (props.meta.guest && isLoggedIn) {
    next.isAllowed = false;
    next.newLocation = "/home";
    return next;
  }

  return next;
};

export default routeGuard;
