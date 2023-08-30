import React from "react";
import { app } from "./Service/firebase.config";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const SigninGoggleAuth = () => {
  const navigate=useNavigate()
  const auth = getAuth(app);
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
      navigate("/mainpage");
      console.log("Signed in with Google");
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };
 

  return (
    <div className="input-container">
      <i className=" icon">
        {" "}
        <GoogleIcon />
      </i>
      <Button
        className="input-field"
        placeholder="Log in with Goggle"
        onClick={handleGoogleSignIn}
        style={{background:"rgba(244, 66, 53, 1)",color:"white"
        }}
      >
        Log in with Goggle
      </Button>
    </div>
  );
};

export default SigninGoggleAuth;
