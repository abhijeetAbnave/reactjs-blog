import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { secureStorage } from "services/utility";
import "./Nav.sass";
//import {useDispatch, useSelector} from "react-redux";
import whiteDoubts from "../../img/whiteDoubts.svg";
import whiteChannels from "../../img/whiteChannels.svg";
import CreateQuizM from "../../img/CreateQuizM.svg";

// import Views from "../../variables/Views";
// import View from "../../variables/actions/View";
// import combine from 'classnames';
// import Actions from "../../variables/actions/Actions";
import Config from "../../config";

import Logo from "../../img/Logo.svg";
import Concept from "../../img/Concepts.svg";
import { useGlobal, getGlobal, setGlobal } from "reactn";
import { useToasts } from "react-toast-notifications";
import { Fragment } from "react";
import installImage from "../../img/install-button.png";
const Nav = (props) => {
  const [isInstalled, isInstalledState] = useState(
    secureStorage.getItem("pwanotinstalled") === "true" ? false : true
  );
  const [isLaunchedInBrowser, isLaunchedInBrowserState] = useState(
    secureStorage.getItem("launchmode") === "browser-tab" ? true : false
  );
  const [isDeferred, isDeferredState] = useState(
    window.deferredPrompt === null ||
      typeof window.deferredPrompt == "undefined"
      ? false
      : true
  );
  const toggleIsInstalled = () => isInstalledState(!isInstalled);

  // const installPWA = () => {
  //   console.log("inside installPWA function");
  //   if (window.deferredPrompt) {
  //     console.log("inside window.deferredPromp if condition");
  //     window.deferredPrompt.prompt();
  //     window.deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === "accepted") {
  //         isInstalledState(true);
  //         isLaunchedInBrowserState(
  //           secureStorage.getItem("launchmode") === "browser-tab" ? true : false
  //         );
  //         isDeferredState(
  //           window.deferredPrompt === null ||
  //             typeof window.deferredPrompt == "undefined"
  //             ? false
  //             : true
  //         );
  //         console.log("User accepted the install prompt");
  //       } else {
  //         isInstalledState(false);
  //         console.log("User dismissed the install prompt");
  //       }
  //     });
  //   }
  // };

  // const dispatch = useDispatch();

  // const view = useSelector(state => state.view.nav);
  // const mobileView = useSelector(state => state.view.mobile);
  // const user_D = useSelector(state => state.user);
  //console.log("here inside nav user: ", user_D);
  // const peerConnection = useSelector(state => state.rtc.peerConnection);
  // const rtcStatus = useSelector(state => state.rtc.status);
  // const status = useSelector(state => state.status);

  // const navigate = view => dispatch({ type: View.NAVIGATE, nav: view, panel: view });
  // const showHome = view => dispatch({ type: Actions.SHOW_HOME });

  const Picture = () => {
    if (user.picture)
      return (
        <img
          src={`${Config.url || ""}/api/images/${user.picture.shieldedID}/256`}
          alt="Picture"
          className="picture"
        />
      );
    else
      return (
        <div className="img img-avatar">
          {user.first_name.substr(0, 1)}
          {user.last_name.substr(0, 1)}
        </div>
      );
  };

  // const getClass = () => {
  //     if (status.online.includes(user.id)) return 'online';
  //     if (status.away.includes(user.id)) return 'away';
  //     if (status.busy.includes(user.id)) return 'busy';
  //     return 'offline';
  // };

  const [urlvalue, setUrlValue] = useState("");
  const history = useHistory();
  const [user, setUser] = useGlobal("user");
  const { addToast } = useToasts();
  const setToken = useGlobal("token")[1];
  const changeRoute = (val) => {
    // props.onChange(false)
    setUrlValue(val);
    props.history.push(val);
  };

  // console.log("here nav User: ", user);

  const onLogoutClick = async () => {
    const username = user.username;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await setToken(null);
    await setUser({});
    addToast(`User ${username} logged out!`, {
      appearance: "success",
      autoDismiss: true,
    });
    if (props.history) props.history.push("/login");
    else history.push("/login");
    // console.log("here logout");
  };

  // useEffect(() => {
  //     setUrlValue('/')
  //   }, [])
  // console.log(urlvalue);
  // console.log(urlvalue === '/create-quiz');
  // console.log(typeof(urlvalue));
  // console.log(history.location.pathname);
  let location = history.location.pathname;
  // console.log(props);
  // console.log(props.NavClick);

  const onClick = () => {
    props.onChange(false);
  };

  // const getNav = () => {
  //   if (user.user_type === "blogger") {
  //     return (
  //       <React.Fragment>
  //         {!isInstalled && isLaunchedInBrowser && isDeferred && (
  //           <div className={`button`} onClick={() => installPWA()}>
  //             <span className="">
  //               <img src={installImage} className="sidenavimg" />
  //             </span>
  //           </div>
  //         )}
  //         <div
  //           className={`button + ${
  //             location === "/concepts" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/concepts")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Learn</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/assessment" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/assessment")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Practice</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/home" ? " active grn_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Chat</span>
  //         </div>

  //         {/* <div className={`button + ${location==='/doubts'?'active lght_blue_clr':''}`}  onClick={() => changeRoute('/doubts')}>
  //                       <img src={whiteDoubts} className="sidenavimg"/>
  //                       <span className="btnlbl">Ask Doubts</span>
  //                   </div> */}
  //         <div
  //           className={`button + ${
  //             location === "/bookmarks" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/bookmarks")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Bookmarks</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/leaderboard" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/leaderboard")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Leaderboard</span>
  //         </div>
  //       </React.Fragment>
  //     );
  //   } else if (user.user_type === "admin") {
  //     return (
  //       <React.Fragment>
  //         <div
  //           className={` button + ${
  //             location === "/create-quiz" ||
  //             location === "/quiz-detail" ||
  //             location === "/quiz-listing"
  //               ? "active orng_clr"
  //               : ""
  //           }`}
  //           onClick={() => changeRoute("/create-quiz")}
  //         >
  //           <img
  //             src={CreateQuizM}
  //             className="sidenavimg"
  //             onClick={() => changeRoute("/create-quiz")}
  //           />
  //           {/* <span className="btnlbl"  >Create Quiz</span> */}
  //           <span className="btnlbl">Assessment</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/home" ? " active grn_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Chat</span>
  //         </div>

  //         <div
  //           className={`button + ${
  //             location === "/doubts" ? "active lght_blue_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/doubts")}
  //         >
  //           <img src={whiteDoubts} className="sidenavimg" />
  //           <span className="btnlbl">Doubts</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/class-rooms" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/class-rooms")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Class Rooms</span>
  //         </div>
  //         <div
  //           className={`button + ${
  //             location === "/reports" ? "active dark_pink_clr" : ""
  //           }`}
  //           onClick={() => changeRoute("/reports")}
  //         >
  //           <span className="">
  //             <img src={whiteChannels} className="sidenavimg" />
  //           </span>
  //           <span className="btnlbl">Reports</span>
  //         </div>
  //       </React.Fragment>
  //     );
  //   }
  // };

  return (
    <div className="side-menu flex-lg-column mr-lg-1">
      {/* LOGO */}
      <div className="navbar-brand-box">
        <Link to="/" className="logo logo-dark">
          <span className="logo-sm">
            <img src={Logo} alt="logo" height="30" />
          </span>
        </Link>

        <Link to="/" className="logo logo-light">
          <span className="logo-sm">
            <img src={Logo} alt="logo" height="30" />
          </span>
        </Link>
      </div>
      {/* end navbar-brand-box  */}
    </div>
    /* <div className={ props.NavClick  === true  ?"leftnav":"leftnav"}>
            <div className="logo-box">
                <img src={Concept} />
            </div>
            <div className="nav-box">
                {getNav()}
            </div>
            <div className="">
                <nav className="uk-navbar-container " uk-navbar="mode: click">
                    <ul className="uk-navbar-nav">
                        <li>
               s             {user.user_type?Picture():""}
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li className="uk-active"><div onClick={e => onLogoutClick()}>Logout</div></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div> */
  );
};

export default Nav;
