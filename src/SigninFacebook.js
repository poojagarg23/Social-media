import React from "react";
import { app } from "./Service/firebase.config";
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import FacebookIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

const SigninFacebook = () => {
  const auth = getAuth(app);
  const handlefaceboklogin = async () => {
    try {
      const provider = new FacebookAuthProvider();

      await signInWithPopup(auth, provider);

      console.log("Signed in with facebook");
    } catch (error) {
      console.error("facebook Sign-in error:", error);
    }
  };

  return (
    <div className="input-container">
      <i className=" icon" style={{background: "rgba(36, 59, 104, 1)"}}>
      
        {" "}

        <FacebookIcon />
      </i>
      <Button
        className="input-field"
        placeholder="Log in with facebook"
        onClick={handlefaceboklogin}
        style={{background: "rgba(58, 89, 152, 1)",color:"white"
      }}
      >
        Log in with Facebook
      </Button>
    </div>
  );
};

export default SigninFacebook;
