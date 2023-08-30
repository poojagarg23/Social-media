import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import SignUp from "./social-media/Signup";
import Signin from "./social-media/Signin";

import SignIn from "./social-media/Signin";
import Error from "./social-media/Error";
import MainPage from "./social-media/MainPage";
import Homepage from "./social-media/menu/Homepage";
import Profile from "./social-media/Profile";
import CreatePost from "./Components/Home";
import Untitled from "./social-media/Untitled-1";
import JoinGroup from "./pages/JoinGroup";
import Create from "./social-media/menu/Communties";



export default function Routing() {
  return (
    <div className="Routing">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="*" element={<Error />}></Route>

          <Route path="/mainpage/Home" element={<Homepage />}></Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notificationsdata" element={<Untitled />} />
          <Route path="/join" element={<JoinGroup />} />
          <Route path="/crud" element={<Create />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
