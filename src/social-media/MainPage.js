import React, { useEffect } from "react";
import { Button, ThemeProvider, colors } from "@mui/material";
import main from "../images/main.png";
import logo from "../images/logo.jpg";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import "../../src/css/Main.css";
import Home from "../Components/Home";
import Menu from "./Menu";
import "../../src/css/Menu.css";
import { useNavigate } from "react-router";
import { ButtonGroup, Modal } from "react-bootstrap";
import { useState } from "react";
import { app, firebase } from "../Service/firebase.config";
import { getAuth } from "firebase/auth";
import CreatePost from "../Components/Home";
import { IoReorderThreeOutline } from 'react-icons/io5';
import { theme } from "antd";

export default function MainPage() {
  const auth = getAuth(app);
  // console.log(auth, "authentication");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  // const handleNewPost = () => {
  //   navigate("/home");
  // };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const userLogin = auth.currentUser;
    setUser(userLogin)
  }, []);
  console.log(user, "userauthenticationChecking");

  return (

    <div className="mainPage">
      <div className="main">
        <nav>
          <div className="main-page-nav">
            <div className="logo">
              <span className="img-span">
                <img src={logo}></img>
              </span>
            </div>
            <div className="flex-nav">
              {/* {console.log(user, "useremail1233")} */}
              {user ? (
                <Button className="login-button">
                  {user.displayName || user.email}
                </Button>
              ) : (
                <Button className="login-button">LOG IN</Button>
              )}

              <Button
                className="logout-button"
                style={{
                  backgroundColor: "rgba(46, 125, 50, 1)",
                  color: "white",
                }}
                onClick={() => handleLogout()}
              >
                {user ? "LOG OUT" : "SIGN UP"}
              </Button>
            </div>
          </div>
        </nav>
        <div>
          <div>
            <div className="section-div">
              <div className="section-left-div">
                <img src={main} />
              </div>
              <div className="section-right-div">
                <h1 className="growth">Growth</h1>
                <h5>Swap tips for finding users and customers</h5>
              </div>
            </div>
            <div className="section-post">
              <div className="div-post">
                <ButtonGroup
                  className="new-postbutton"
                  style={{
                    background: "rgba(46, 125, 50, 1)",
                    color: "white",
                  }}
                  onClick={handleShow}
                >
                  New Post
                </ButtonGroup>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="modal-title"><b>Create Post</b></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreatePost />
                  </Modal.Body>

                </Modal>

              </div>

              <div className="div-menu">
                <Menu />
              </div>
              <div>
                <IoReorderThreeOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
