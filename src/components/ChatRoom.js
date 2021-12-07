import React, { useState, useEffect, useContext } from "react";
import "./ChatRoom.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { v4 as uuidv4 } from "uuid";
import { database } from "../firebase";
import firebase from "firebase";
import { LoginContext } from "../LoginContext";

function ChatRoom(props) {
  const [currMessage, setCurrMessage] = useState("");
  const recipentID = props.match.params.userID;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useContext(LoginContext);
  const [recipentName, setRecipentName] = useState("");

  useEffect(() => {
    if (recipentID) {
      const UID = user.user.uid;

      database
        .ref(`/chats/${recipentID}/${UID}`)
        .orderByChild("createdAt")
        .on("value", function (snapshot) {
          let msg = [];
          snapshot.forEach((childSnapshot) => {
            msg.push(childSnapshot.val());
          });
          setMessages(msg);
        });

      database
        .ref(`/chats/${UID}/${recipentID}`)
        .on("value", function (snapshot) {
          snapshot.forEach((child) => {
            if (child.val().messageInfo != 2) {
              database
                .ref(`chats/${UID}/${recipentID}/${child.key}`)
                .update({ messageInfo: 2 });
            }
          });
        });

      database.ref(`/users/${recipentID}`).on("value", function (snapshot) {
        setRecipentName(snapshot.val().name);
      });
    }
  }, [recipentID]);

  const SendMessage = () => {
    const messageID = uuidv4();

    if (currMessage) {
      const { uid, displayName } = user.user;
      database
        .ref(`/chats/${uid}/${recipentID}/${messageID}`)
        .set({
          text: currMessage,
          senderID: uid,
          senderName: displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        })
        .catch(alert);
      database
        .ref(`/chats/${recipentID}/${uid}/${messageID}`)
        .set({
          text: currMessage,
          messageInfo: 0,
          senderID: uid,
          senderName: displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        })
        .catch(alert);

      setCurrMessage("");
    } else {
      alert("Enter a message");
      return;
    }
  };

  const CheckMessageInfo = (msgState) => {
    switch (msgState) {
      case 0:
        return "https://img.icons8.com/material-outlined/24/000000/checkmark--v1.png";
      case 1:
        return "https://img.icons8.com/fluency-systems-regular/48/000000/double-tick.png";
      case 2:
        return "https://img.icons8.com/color-glass/48/000000/double-tick.png";
    }
  };

  return (
    <div className="chatroom">
      <div className="chatroom__header">
        <Avatar />
        <div className="chatroom__headerinfoleft">
          <h3>{recipentName}</h3>
        </div>
        <div className="chatroom__header__inforight">
          <SearchIcon />
          <AttachFileIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="chatroom__body">
        {messages.map((message) => (
          <p
            className={`chatroom__message ${
              message.senderID === user.user.uid && `chatroom__messagerecierver`
            }`}
          >
            <span className="chatroom__username">{message.senderName}</span>
            {message.text}
            {message.senderID === user.user.uid && (
              <img
                className="message-state"
                src={CheckMessageInfo(message.messageInfo)}
              />
            )}
          </p>
        ))}
      </div>
      <div className="chatroom__footer">
        <SentimentVerySatisfiedIcon />
        <input
          value={currMessage}
          onChange={(event) => setCurrMessage(event.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={SendMessage} type="submit">
          <SendIcon />
        </button>
        <MicIcon />
      </div>
    </div>
  );
}

export default ChatRoom;
