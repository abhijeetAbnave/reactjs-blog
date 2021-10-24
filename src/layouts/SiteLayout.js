import React, { useEffect, useState } from 'react';
import { useGlobal, getGlobal, setGlobal } from "reactn";
import {useToasts} from "react-toast-notifications";
import { Route, Switch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Div100vh from 'react-div-100vh';
import Nav from "features/Nav/Nav";
import Logo from '../img/Logo.svg'
import Concept from '../img/Concepts.svg'
// import "./Home.sass";



const SiteLayout = ({ children }) => {


    const onLogoutClick= async()=>{
        const username = user.username;
        localStorage.removeItem('token');
        await setToken(null);
        await setUser({});
        addToast(`User ${username} logged out!`, {
            appearance: 'success',
            autoDismiss: true,
        })
        history.push("/login");
    }
    
    
    const { addToast } = useToasts();
    const location = useLocation();
    const [user, setUser] = useGlobal('user');
    const setToken = useGlobal('token')[1];
    const setPanel = useGlobal('panel')[1];
    const history = useHistory();

    const [navClick, setNavClick] = useState(false);


    const onClick = () => {
        // console.log("test")
        setNavClick(true)
    }

    const onChange =(val) =>{
        // console.log(val)
        setNavClick(val)
    }


    return (
        <Div100vh>
             <nav className="uk-navbar-container " uk-navbar="mode: click" style={{ backgroundColor: '#43c6ac' }}>
                <div className="uk-navbar-left">

                    <ul className="uk-navbar-nav">
                        <li className="uk-active mob_menu_li">
                            <a  onClick={onClick}>
                                <div className="mob_menu">
                                    <span></span>
                                </div>
                            </a>
                        </li>
                        <li className="uk-active" >
                            <a href="#">
                            <div className="logo1" style={{ paddingRight: 18 }}>
                                <img src={Concept} />
                            </div>
                            </a>
                        </li>
                        <li className="uk-active">
                        <a href="#">
                            <div className="col-md-6" style={{ paddingRight: 70 }}>
                                <img src={Logo} />
                            </div>
                        </a>    
                        </li>
                        <li className="uk-active">
                        <a href="#"> 
                             {/* <input className="uk-input uk-form-width-large" type="text" placeholder="Search here..." /> */}
                        </a> 
                        </li>
                    </ul>

                </div>
                <div className="uk-navbar-right" >
                    <ul className="uk-navbar-nav">
                        <li>
                            <a href="#"><img src={'https://randomuser.me/api/portraits/men/64.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /></a>
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li className="uk-active"><a href="#" onClick={onLogoutClick}>Logout</a></li>
                                    {/* <li><a href="#">Item</a></li>
                                    <li><a href="#">Item</a></li> */}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="app" >
                <Nav NavClick={navClick} onChange={onChange} />
                <div className={`main`}>               
                    {children}
                </div>
            </div>
        </Div100vh>
    );
}

export default SiteLayout;
