import React, { useEffect, useState, useRef } from "react";
import { app, auth, firebase } from "../../../Service/firebase.config";
import "../../../css/chat.css";
const Message = ({ message }) => {
  const [data, setData] = useState();
  const [filetype, setFileType] = useState();

  // console.log(message, "messageProps");
  const user = auth.currentUser;
  // console.log(user.uid, "usercurrentuser");
  const createdAtTimestamp = message.createdAt / 1000;
  const date = new Date(createdAtTimestamp * 1000);
  const userefuse = useRef();
  useEffect(
    () => userefuse.current.scrollIntoView({ behavior: "smooth" }),
    [message]
  );
  return (
    <div
      className={`chat-display ${message.uid === user.uid ? "right" : "left"}`}
    >
      <div>
        <img className="img-avtar" src={message.avatar} alt="user avatar" />
      </div>
      <div>
        <div className="message-information">
          <div className="message-information-personal">
            <span className="message-name"> {message.name}</span>{" "}
            <span className="date">{date.toLocaleTimeString()}</span>
          </div>

          <div>
            <p className="user-message">
              {message.text}
              {message.emojis?.map((emojis) => {
                return <p>{emojis}</p>;
              })}
            </p>
            <div ref={userefuse}></div>

            {/* {console.log(message, "messages")} */}
            {message.images?.map((imageUrl, i) => (
              <p>
                <img
                  className="img-message"
                  key={i}
                  src={imageUrl}
                  alt={`Image ${i}`}
                />
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
