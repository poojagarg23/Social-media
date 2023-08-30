import React, { useEffect, useState } from "react";
import Routing from "./Routing";
import { onMessageListener, requestToken } from "./Service/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import Notification from "./social-media/menu/Notification";
const App = () => {
  return (
    <>
      <div className="App">
        <Routing />
        <Notification />
        {/* <Notification /> */}
      </div>
    </>
  );
};

export default App;
