import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import classnames from "classnames";
import { connect } from "react-redux";
import store from "../../store/store";
import { clearUiStates } from "../../reducers/ui-states/actions";
import { setActiveTab } from "../../actions/layout";

//Import Images
import logo from "../../assets/images/logo/logo-Icon-light.svg";
import { Fragment } from "react";
import Emitter from "../../services/EventEmitter";
import { isSafari } from "react-device-detect";

function LeftSidebarMenu(props) {
  const state = store.getState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  //const [user, setUser] = useGlobal("user");
  const [user, setUser] = useState(state.user);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [channelActive, setChannelActive] = useState(false);
  // const setToken = useGlobal("token")[1];
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggleMobile = () => setDropdownOpenMobile(!dropdownOpenMobile);
  // Install button related flags handled here
  const [isInstalled, isInstalledState] = useState(
    localStorage.getItem("pwanotinstalled") === "true" ? false : true
  );

  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  // localStorage.setItem("activeTab", "");

  const toggleTab = (tab) => {
    props.setActiveTab(tab);
    props.history.push("/" + tab);
  };
  var bc;
  if (!isSafari) {
    bc = new BroadcastChannel("LOGOUT_MESSAGE");
  }

  useEffect(() => {
    if (!isSafari) {
      bc.onmessage = function (ev) {
        // console.log("message onlogout ------------->", ev);
        if (
          ev.target.name == "LOGOUT_MESSAGE" &&
          ev.data == "LOGOUT CALL FROM OTHER TAB" &&
          ev.origin == window.location.origin
        ) {
          onLogoutClick();
        }
      };
    }

    return () => {
      if (!isSafari) {
        bc.close();
      }
    };
  }, []);

  const onLogoutClick = async () => {
    if (!isSafari) {
      bc.postMessage("LOGOUT CALL FROM OTHER TAB");
    }
    const username = user.username;
    const userType = user.user_type;
    console.log("UserType: ", userType);
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    await store.dispatch(clearUiStates());
    await localStorage.removeItem("reduxstate");
    await localStorage.removeItem("token");
    await localStorage.clear();
    await localStorage.clear();
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
    });
    if (props.history) props.history.push("/login");
    else props.history.push("/login");
    // await setToken(null);
    await setUser({});
    await localStorage.clear();
  };
  let tabs = props.location.pathname.split("/");
  let activeTab = "/" + tabs[1];

  useEffect(() => {
    if (localStorage.getItem("activeTab") == "/home") {
      setChannelActive(true);
    } else {
      setChannelActive(false);
    }
    if (activeTab == "/home") {
      localStorage.setItem("activeTab", activeTab);
    }
  }, []);
  const getNav = () => {
    return (
      <React.Fragment>
        <NavItem id="past">
          <NavLink
            id="pills-user-tab"
            className={classnames({ active: activeTab === "/past" })}
            onClick={() => {
              toggleTab("past");
            }}
          >
            <i className="icon-learn "></i>
            <span className="nav-Text">Past Data</span>
          </NavLink>
        </NavItem>
        <UncontrolledTooltip target="past" placement="top">
          Past Data
        </UncontrolledTooltip>

        <NavItem id="profile">
          <NavLink
            id="pills-user-tab"
            className={classnames({ active: activeTab === "/profile" })}
            onClick={() => {
              toggleTab("profile");
            }}
          >
            <i className="icon-profile-2 "></i>
            <span className="nav-Text">Profile</span>
          </NavLink>
        </NavItem>
        <UncontrolledTooltip target="profile" placement="top">
          Profile
        </UncontrolledTooltip>
      </React.Fragment>
    );
  };

  const Picture = () => {
    if (user?.first_name) {
      return (
        <div className="btn-group dropup profile-user-dropdown dropdown nav-item nav-circle">
          {user.first_name?.substr(0, 1)}
          {user.last_name?.substr(0, 1)}
        </div>
      );
    } else {
      return <icon class="icon-profile-2"></icon>;
    }

    // }
  };

  const handleClose = () => {
    setShowLogoutConfirmModal(false);
  };

  const handelOpen = () => {
    setShowLogoutConfirmModal(true);
  };

  const changeTheme = (e) => {
    if (!isDarkTheme) {
      localStorage.setItem("theme", "dark");
      Emitter.emit("THEME_NAME", "dark");
    } else {
      localStorage.setItem("theme", "light");
      Emitter.emit("THEME_NAME", "light");
    }
    setIsDarkTheme(!isDarkTheme);
    // console.log("change theme after----->", isDarkTheme);
  };

  /* changes language according to clicked language menu item */

  return (
    <React.Fragment>
      {/* Please no not change or remove this id 'leftSidebar'  */}
      <div className="side-menu flex-lg-column" id="leftSidebar">
        {" "}
        {/* LOGO */}
        <div className="navbar-brand-box">
          <Link
            to={user.user_type === "student" ? "/concepts" : "/"}
            className="logo logo-dark"
          ></Link>
        </div>
        <div className="flex-lg-column my-auto mid-sidenav-content">
          <Nav
            pills
            className="side-menu-nav justify-content-center"
            role="tablist"
          >
            <React.Fragment>
              <NavItem id="logoInMobile">
                <div
                  className="d-block d-lg-none text-center"
                  style={{ paddingTop: "3px" }}
                >
                  <Link
                    to={user.user_type === "student" ? "/concepts" : "/"}
                    className="logo logo-dark"
                  >
                    <span className="logo-sm">
                      <img src={logo} alt="logo" height="40" width="40" />
                    </span>
                  </Link>
                </div>
              </NavItem>

              {getNav()}
            </React.Fragment>

            <Dropdown
              nav
              isOpen={dropdownOpenMobile}
              toggle={toggleMobile}
              className="profile-user-dropdown d-inline-block d-lg-none"
            >
              <DropdownToggle nav>
                <Picture />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    changeTheme();
                  }}
                >
                  Theme <i className="icon-bright float-right text-muted"></i>
                </DropdownItem>
                <DropdownItem divider />

                <DropdownItem
                  onClick={() => {
                    handelOpen();
                  }}
                >
                  Log out{" "}
                  <i className="icon-logout-1 float-right text-muted"></i>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </div>
        {/* end side-menu nav */}
        <div className="navbar-profile-box flex-lg-column d-none d-lg-block">
          <Nav className="side-menu-nav justify-content-center">
            <Dropdown
              nav
              isOpen={dropdownOpen}
              className="btn-group dropup profile-user-dropdown"
              toggle={toggle}
            >
              <DropdownToggle nav>
                <Picture />
              </DropdownToggle>
              <DropdownMenu>
                <Fragment>
                  <DropdownItem
                    onClick={() => {
                      changeTheme();
                    }}
                    style={{ border: "1px solid transparent" }}
                  >
                    Theme <i className="icon-bright float-right text-muted"></i>
                  </DropdownItem>
                  <DropdownItem divider />
                </Fragment>

                <DropdownItem
                  onClick={() => {
                    handelOpen();
                  }}
                >
                  Log out{" "}
                  <i className="icon-logout-1 float-right text-muted"></i>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </div>
        {/* Side menu user */}
        <Modal
          isOpen={showLogoutConfirmModal}
          hidefunction={() => {
            handleClose();
          }}
        >
          <ModalHeader closeButton>{"Blog"}</ModalHeader>
          <ModalBody>{"Do you want to Logout?"}</ModalBody>
          <ModalFooter>
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleClose();
              }}
              className="modal-button btn btn-outline"
            >
              {" "}
              {"No"}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onLogoutClick();
              }}
              className="modal-button  btn btn-primary"
            >
              {" "}
              {"Yes"}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};

export default React.memo(
  connect(mapStatetoProps, {
    setActiveTab,
  })(LeftSidebarMenu)
);
