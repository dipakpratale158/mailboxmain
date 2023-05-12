import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { mailAction } from "../../Store/MailSlice";
 import AddIcon from '@mui/icons-material/Add';
 import InboxIcon from '@mui/icons-material/Inbox';
 import SentIcon from '@mui/icons-material/Send';
 import "./sidebar.scss";
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import DraftsIcon from '@mui/icons-material/Drafts';

const MailBox = () => {
  const toEMail = useRef();
  const areaRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((store) => {
    return store.auth.email;
  });


  const handleSend = async () => {
    const to = toEMail.current.value;
    const body = areaRef.current.value;
    const fromMail = email.replace("@", "").replace(".", "");
    console.log("fromMail:", fromMail);
    const toMail = to.replace("@", "").replace(".", "");
    console.log("toMail:", toMail);
    const obj = {
      to: to,
      body: body,
    };
    try {
      setLoading(true);
      let res = await axios.post(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${fromMail}/sent.json`,
        obj
      );
      dispatch(
        mailAction.mailSent({
          id: res.data.name,
          mail: { to: to, body: body },
        })
      );
      toast.success("Mail-Sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }

    const obj2 = {
      from: email,
      body: body,
      read: false,
    };

    try {
      setLoading(true);
      let res = await axios.post(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${toMail}/inbox.json`,
        obj2
      );
      dispatch(mailAction.sent({}));
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  const handleCOmpose = () => {
    setShow(!show);
  };

  if (loading) {
    return (
      <img
        style={{ display: "block", margin: "17% auto" }}
        width={"10%"}
        src="https://cdn.dribbble.com/users/919882/screenshots/2362441/loader-2.gif"
        alt="loading"
      />
    );
  }
  
  return (
        <div className="sidebarContainer">
<div style={{ padding: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={handleCOmpose}
            className="btn"
            style={{ float: "left", width: "10%" }}
          >
            <AddIcon className="topIcon" />

            Compose

          </button>
          <Link to={"/inbox"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>
             <InboxIcon className="bottomIcon" />
              Your Inbox
            </button>
          </Link>
          <Link to={"/sent"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>
            <SentIcon />
              Sent Inbox
            </button>
          </Link>
          <Link to={"/sent"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>    
            <ExpandMoreIcon className="bottomIcon" />
           <DraftsIcon className="bottomIcon" />

              Drafft
            </button>
          </Link>
          <Link to={"/sent"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>    
            <ExpandMoreIcon className="bottomIcon" />
              More
            </button>
          </Link>
          
          
        </div>
        {!show && <h1>Click On Compose To Send Email's 💌</h1>}
        {show && (
          <div>
            <h1 style={{ color: "grey" }}>
              Connect With Your Friends And Family 👪
            </h1>
            <div className="mail">
              <div>
                <input type="text" placeholder="To" ref={toEMail} />
              </div>
              <JoditEditor ref={areaRef} />
            </div>
            <button className="btn" onClick={handleSend}>
              Send
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MailBox;

// import React from 'react';
// import "./sidebar.scss";
// import AddIcon from '@mui/icons-material/Add';
// import InboxIcon from '@mui/icons-material/Inbox';
// import ReportIcon from '@mui/icons-material/Report';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import KeyboardIcon from '@mui/icons-material/Keyboard';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Sidebar = () => {
//     const totalInbox = useSelector((state)=>
//         state.items.filter((item)=>item.tag==="inbox")
//     );
    

//     return (
//         <div className="sidebarContainer">
//             <div className="sidebarWrapper">
//                 <div className="sidebarTop">
//                     <div className="sidebarTopBox">
//                         <AddIcon className="topIcon" />
//                         <span className="topText">Compose</span>
//                     </div>
//                 </div>
//                 <div className="sidebarBottom">
//                     <NavLink 
//                         to="/mail/inbox"
//                         className={({isActive})=>
//                             isActive?"active":" "
//                         }
//                     >
//                         <div className="sidebarRow">
//                             <InboxIcon className="bottomIcon" />
//                             <span className="bottomText">Inbox</span>
//                             <span className="totalCount">{totalInbox.length}</span>
//                         </div>
//                     </NavLink>
//                     <NavLink 
//                         to="/mail/draft"
//                         className={({isActive})=>
//                             isActive?"active":" "
//                         }
//                     >
//                         <div className="sidebarRow">
//                             <DraftsIcon className="bottomIcon" />
//                             <span className="bottomText">Draft</span>
//                         </div>
//                     </NavLink>
//                     <NavLink 
//                         to="/mail/spam"
//                         className={({isActive})=>
//                             isActive?"active":" "
//                         }
//                     >
//                         <div className="sidebarRow">
//                             <ReportIcon className="bottomIcon" />
//                             <span className="bottomText">Spam</span>
//                         </div>
//                     </NavLink>
//                     <NavLink 
//                         to="/mail/trash"
//                         className={({isActive})=>
//                             isActive?"active":" "
//                         }
//                     >
//                         <div className="sidebarRow">
//                             <DeleteIcon className="bottomIcon" />
//                             <span className="bottomText">Trash</span>
//                         </div>
//                     </NavLink>
//                     <div className="sidebarRow">
//                         <ExpandMoreIcon className="bottomIcon" />
//                         <span className="bottomText">More</span>
//                     </div>
//                 </div>
//                 <div className="sidebarExtra">
//                     <span className="extraText">Meet</span>
//                     <div className="sidebarRow">
//                         <VideocamIcon className="bottomIcon" />
//                         <span className="bottomText">New meeting</span>
//                     </div>
//                     <div className="sidebarRow">
//                         <KeyboardIcon className="bottomIcon" />
//                         <span className="bottomText">Join a meeting</span>
//                     </div>
//                 </div>
//                 <div className="sidebarExtra2">
//                     <span className="extraText">Hangouts</span>
//                     <div className="bottomExtraRow">
//                         <AccountCircleIcon className="bottomExtraIcon2" />
//                         <span className="bottomExtraText">Shahreyar</span>
//                         <ArrowDropDownIcon className="bottomSmall" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar
