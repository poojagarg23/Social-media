import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TagIcon from "@mui/icons-material/Tag";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Navigate, useNavigate } from "react-router";
import Home from "./menu/Homepage";
import { Box, Switch } from "@mui/material";
import Aboutus from "./menu/Aboutus";
import Homepage from "./menu/Homepage";
import Search from "./menu/Search";
import Chat from "../pages/Chat";
import Notification from "./menu/Notification";
import Communties from "./menu/Communties";

import Sendbox from "../pages/SendMessage";
import Untitled from "./Untitled-1";
import Profile from "./Profile";
import Trending from "./menu/Trending";
import SearchPost from "../pages/SearchPost";

export default function Menu() {
  const [theme, setTheme] = useState("light")
  const componentMap = {
    home: (
      <div>
        <Homepage />
      </div>
    ),
    search: (
      <div>
        <SearchPost />
      </div>
    ),
    chat: (
      <div>
        <Sendbox />
      </div>
    ),
    notifications: (
      <div>
        <Notification />
      </div>
    ),
    communities: (
      <div>
        <Communties />
      </div>
    ),

    profile: (
      <div>
        <Profile />
      </div>
    ),
  };
  const [activeComponent, setActiveComponent] = useState("searchpost");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);
  const handleToggleTheme = () => {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
    // alert("selected ThemeToggle")
  }
  console.log(theme, "themeProvider")
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <div className="main-div-aside">
      <div className="div">
        <div className="h1-menu">
          <h1 style={{ borderBottom: "2px solid #464242" }}>Menu</h1>
        </div>
        <button className="home-icon" onClick={() => handleButtonClick("home")}>
          <div>
            <HomeIcon />
          </div>
          <div>
            <span className="span-icon">Home</span>
          </div>
        </button>
        <button
          className="search-icon"
          onClick={() => handleButtonClick("search")}
        >
          <div>
            <SearchIcon />
          </div>
          <div>
            <span className="span-icon">Search</span>
          </div>
        </button>
        <button className="chat-icon" onClick={() => handleButtonClick("chat")}>
          <div>
            <ChatIcon />
          </div>
          <div>
            <span className="span-icon">Chat</span>
          </div>
        </button>
        <button
          className="notification-icon"
          onClick={() => handleButtonClick("notifications")}
        >
          <div>
            <NotificationsIcon />
          </div>
          <div>
            <span className="span-icon">Notification</span>
          </div>
        </button>
        <button
          className="tag-icon"
          onClick={() => handleButtonClick("trending")}
        >
          <div>
            <TagIcon />
          </div>



          <div>
            <span className="span-icon">Communities</span>
          </div>
        </button>
        <button
          className="theme-icon"
        // onClick={() => handleButtonClick("theme")}

        >
          <div>
            <Switch onClick={() => handleToggleTheme()} {...label} color="default" />
          </div>

          <div className="theme-light">
            <span className="span-icon">Turn off light</span>
          </div>
        </button>
        <button
          onClick={() => handleButtonClick("profile")}
          className="profile-icon"
        >
          <div>
            <AccountBoxIcon />
          </div>

          <div>
            <span className="span-icon">Profile</span>
          </div>
        </button>
      </div>
      <div className="middle-page">
        {/* <Untitled /> */}
        {componentMap[activeComponent] || <Homepage />}
        {/* <Aboutus /> */}
      </div>
      <div className="about-us">
        <Aboutus />
      </div>
    </div>
  );
}
