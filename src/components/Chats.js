import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { database } from "../firebase";
import { Link } from "react-router-dom";

function Chats({ id, name, status }) {
  const [avatars, setavatars] = useState("");

  useEffect(() => {
    setavatars(Math.floor(Math.random() * 5000));
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     database
  //       .collection("rooms")
  //       .doc(id)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setmessages(snapshot.docs.map((doc) => doc.data()))
  //       );
  //   }
  // }, [id]);

  return (
    <div className="chats">
      <Avatar src={`https://avatars.dicebear.com/api/human/${avatars}.svg`} />
      <div className="chats__info">
        <h3>{name}</h3>
        <div className={status ? "online" : "offline"}></div>
      </div>
    </div>
  );
}

export default Chats;
