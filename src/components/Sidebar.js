import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chats from "./Chats";
import { database } from "../firebase";
import { LoginContext } from "../LoginContext";

function Sidebar() {
  const [allContacts, setAllContacts] = useState([]);
  const [user, setUser] = useContext(LoginContext);

  useEffect(() => {
    const unsubscribe = database.ref("users").on("value", function (snapshot) {
      let contacts = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key !== user.user.uid) {
          contacts.push({
            contactID: childSnapshot.key,
            contactDetails: childSnapshot.val(),
          });
        }
      });
      setAllContacts(contacts);
    });

    database
      .ref(`users/${user.user.uid}`)
      .onDisconnect()
      .set({ name: user.user.displayName, onlineStatus: false });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.user.photoURL} />
        <div className="sidebar__headerright">
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="siebar__search">
        <div className="sidebar__searchcontainer">
          <SearchIcon />
          <input placeholder="chats" type="text" />
        </div>
      </div>

      <div className="sidebar__chhatsGroups">
        {allContacts.map((con) => (
          <Chats
            key={con.contactID}
            id={con.contactID}
            name={con.contactDetails.name}
            status={con.contactDetails.onlineStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
