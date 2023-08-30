import React from "react";
import { auth } from "../Service/firebase.config";

const Chatperson = ({ message }) => {
  console.log(message, "msgprops");
  const user = auth.currentUser;

  return (
    <div className="chat-div">
      <p>
        {user.displayName}

      </p>
    </div>
  );
};

export default Chatperson;
