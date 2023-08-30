import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./Service/firebase.config";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
export const GoogleAuth = async () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("email");
  try {
    const res = await signInWithPopup(auth, googleProvider);
    //   console.log("res ==>>",res);
    const docRef = doc(db, "users", res.user.uid);
    const data = {
      name: res.user.displayName,
      email: res.user.email,
      phone: res.user.phoneNumber,
      photoUrl: res.user.photoURL,
      followers: [],
      followings: [],
      notificationIndexCount: 0,
      createdAt: Date.now().toString(),
    };
    const result = await setDoc(docRef, data);
    // console.log("result ", result);

    return console.log("user registered");
  } catch (e) {
    console.log(e);
    return console.log(e.message);
  }
};
