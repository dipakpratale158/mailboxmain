import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../Store/MailSlice";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
 import "./mailList.scss";
// import Subtopsection from "../../topmailbox/Subtopsection";
import TopSection from "../../topsection/TopSection";
// import Rightbar from "../../Rightbar/Rightbar";

const Inbox = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const inbox = useSelector((store) => {
    return store.mail.inbox;
  });
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const newEmail = email.replace("@", "").replace(".", "");
  const getMailData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${newEmail}/inbox.json`
      );
      console.log(res);
      if (res.data) {
        dispatch(mailAction.inbox(res.data));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  const handleDelete = async (id) => {
    dispatch(mailAction.delete(id));
    try {
      let res = await axios.delete(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${newEmail}/inbox/${id}.json`
      );
      console.log(res);
      toast.success("Mail-Deleted", {
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
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getMailData();
  }, []);

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

  let unread = 0;
  Object.keys(inbox).forEach((items) => {
    if (inbox[items].read === false) {
      unread++;
    }
  });

  const filteredInbox = Object.keys(inbox)
  .filter((key) => {
    const email = inbox[key];
    const from = email.from.toLowerCase();
    const body = email.body.toLowerCase();
    const search = searchQuery.toLowerCase();
    return from.includes(search) || body.includes(search);
  })
  .reduce((obj, key) => {
    obj[key] = inbox[key];
    return obj;
  }, {});

  
  return (
    <div>
            <TopSection />

            
      <h1>
        Your Inbox has {unread} Unread Email's {unread > 0 ? "😍" : "😥"}
      </h1>
      <div>
        {Object.keys(inbox).length === 0 ? <p>Your Inbox Is Empty 😢</p> : ""}
      </div>
      <div className="inbox">
        {Object.keys(inbox).map((items) => {
          return (
            <div style={{margin:"3rem",cursor:"pointer",fontSize:"25px"}} key={items} >
              <AiFillDelete
                color="red"
                className="delete"
                onClick={() => handleDelete(items)}
              />
                  <div className="mailListContainer">

                             <div className="mailListOptions">   
                               <CheckBoxOutlineBlankIcon className="mailListIcon" />
                     <GradeOutlinedIcon className="mailListIcon" />
                     {unread}
                 </div>
              
                    
                
              <h4 style={{ display: "flex", gap: "10px" }}>
                <p>{!inbox[items].read && <>💎</>}</p>
                <p> From : {inbox[items].from}</p>
              </h4>
              <div  style={{ display: "flex", gap: "10px" ,margin:"1rem"}}>
                <p>Message : </p>
                <p dangerouslySetInnerHTML={{ __html: inbox[items].body }}></p>
              </div>
              <Link style={{fontSize:"1.5rem"}}className="read" to={`/inbox/${items}`}>
                Read Mail
              </Link>
             
            </div>  
             </div>
          );
        })}
    
      </div>
      <ToastContainer />
    
    </div>

  );
};

export default Inbox;
