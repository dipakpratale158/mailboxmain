import React from 'react';
import "./subtopsection.scss";
import InboxIcon from '@mui/icons-material/Inbox';
import GroupIcon from '@mui/icons-material/Group';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Subtopsection = () => {
    return (
        <div className="subtopContainer">
            
                <div className="subtopWrapper">
                    <InboxIcon className="subtopIcon active" />
                    <span className="subtopText active">Primary</span>
                    <div className="bottomLine"></div>
                </div>    
                <div className="subtopWrapper">
                    <GroupIcon className="subtopIcon" />
                    <span className="subtopText">Social</span>
                </div>    
                <div className="subtopWrapper">
                    <LocalOfferIcon className="subtopIcon" />
                    <span className="subtopText">Promotions</span>
                </div>    
          
        </div>
    )
}

export default Subtopsection