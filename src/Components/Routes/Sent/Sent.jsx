import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import TopSection from "../../topsection/TopSection";

const Sent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const newEmail = email.replace("@", "").replace(".", "");
  console.log("newEmail:", newEmail);

  const getSentData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${newEmail}/sent.json`
      );
      console.log(res);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getSentData();
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let res = await axios.delete(
        `https://l-5d8b9-default-rtdb.firebaseio.com/${newEmail}/sent/${id}.json`
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
      getSentData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  let items = [];
  for (let key in data) {
    items.push({ id: key, ...data[key] });
  }

  return (
    <div>
      <TopSection />
      <h1>Total Mails Sent: {items.length}</h1>
      {items.map((sentMails) => {
    //  const date = new Date(sentMails.date);

    //  if (isNaN(date.getTime())) {
    //    return null; // or some other error handling
    //  }
     
    //  const dateString = new Intl.DateTimeFormat('en-US', {
    //    year: 'numeric',
    //    month: '2-digit',
    //    day: '2-digit',
    //    hour: '2-digit',
    //    minute: '2-digit',
    //    second: '2-digit'
    //  }).format(date);
     
    
     
        return (
          <div key={sentMails.id} className="inbox-items">
              <AiFillDelete
              color="red"
              className="delete"
              onClick={() => handleDelete(sentMails.id)}
            />
            <p>To: {sentMails.to}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <p>Message: </p>
              <p dangerouslySetInnerHTML={{ __html: sentMails.body }}></p>
            </div>
            {/* <div>{dateString}</div> */}
            <Link className="read" to={`/sent/${sentMails.id}`}>
              Read Mail
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sent;