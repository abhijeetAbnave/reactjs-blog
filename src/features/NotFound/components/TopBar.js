import React from 'react';
import "./TopBar.sass";
import placeholder from "../../../assets/placeholder.jpg";
import {FiMoreVertical, FiArrowLeft, FiMoreHorizontal, FiExternalLink} from 'react-icons/fi';
import {useGlobal} from "reactn";

const TopBar = ({back}) => {
    const blog = () => window.open("https://blog.ai", "_blank");
    

    return (
            <div className="top-bar uk-flex uk-flex-between uk-flex-middle">
                <div className="nav">
                    <div className="button mobile" onClick={back}>
                        <FiArrowLeft/>
                    </div>
                </div>
                <div className="nav">
                    <div className="uk-inline">
                        <div className="button" type="button">
                            <FiMoreHorizontal/>
                        </div>
                        <div data-uk-dropdown="mode: click; offset: 5; boundary: .top-bar; pos: bottom-right">
                            <div className="link" onClick={blog}>Blog <div className="icon"><FiExternalLink/></div></div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TopBar;
