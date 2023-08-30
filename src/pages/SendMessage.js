import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Chat from "./Chat";
import Message from "../social-media/menu/homepage/Message";
import { firebase } from "../Service/firebase.config";
import Aboutus from "../social-media/menu/Aboutus";
import Chatperson from "./Chatperson";
const Sendbox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(firebase, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      console.log(QuerySnapshot.data, "QuerySnapshot");
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data() });
      });

      setMessages(fetchedMessages);
    });
    // console.log(messages, "fetchedMessages");
    return () => unsubscribe;
  }, []);

  return (
    <div className="div-main">
      <div className="chat-box">
        {/* <Chatperson /> */}
        <div className="chat-main-box">

          <div className="chat-information">
            {console.log(messages, "Sendbox-messages")}
            {messages.map((message) => {
              return <Message message={message} />;
            })}
          </div>
        </div>
        <span ref={scroll}></span>
        <Chat scroll={scroll} />
      </div>
    </div>
  );
};

export default Sendbox;
