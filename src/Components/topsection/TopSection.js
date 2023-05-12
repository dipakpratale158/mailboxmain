import React from 'react';
import "./topsection.scss";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardIcon from '@mui/icons-material/Keyboard';


const TopSection = ({ numVal }) => {
    return (
        <div className="topSectionContainer">
            <div className="topSectionLeft">
                <div className="sectionIconbox">
                    <CheckBoxOutlineBlankIcon className='sectionIcon' />
                    <ArrowDropDownIcon className='sectionIcon' />
                </div>
                <div className="sectionIconbox">
                    <RefreshIcon className='sectionIcon' />
                </div>
                <div className="sectionIconbox">
                    <MoreVertIcon className='sectionIcon' />
                </div>
            </div>
            <div className="topSectionRight">
                <span className="sectionRange">
                    1-{numVal} of {numVal}
                </span>
                <div className="sectionIconbox">
                    <KeyboardArrowLeftIcon className='sectionIcon' />
                </div>
                <div className="sectionIconbox">
                    <ChevronRightIcon className='sectionIcon' />
                </div>
                <div className="sectionIconbox">
                    <KeyboardIcon className='sectionIcon' />
                </div>
            </div>
        </div>
    )
}

export default TopSection