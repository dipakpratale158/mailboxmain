import React from 'react';
import "./Rightbar.scss";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Rightbar = () => {
    return (
        <div className="rightbarContainer">
            <div className="rightbarTop">
                <div className="rightIconbox">
                    <CalendarMonthIcon className="rightIcon" />
                </div>
                <div className="rightIconbox">
                    <TextSnippetIcon className="rightIcon" />
                </div>
                <div className="rightIconbox">
                    <CheckCircleOutlinedIcon className="rightIcon" />
                </div>
                <div className="rightIconbox">
                    <AccountCircleRoundedIcon className="rightIcon" />
                </div>
            </div>
            <div className="rightbarBottom">
                <div className="rightIconbox">
                    <AddIcon className="rightIcon" />
                </div>
                <div className="rightIconbox">
                    <ChevronRightIcon className="rightIcon" />
                </div>
            </div>
        </div>
    )
}

export default Rightbar