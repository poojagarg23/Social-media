import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";
import { useState } from "react";
import { app } from "../Service/firebase.config";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuth } from "../Goggleauth";
import { InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";

import ".././css/Main.css";
import GoogleIcon from "@mui/icons-material/Google";
import SigninFacebook from "../SigninFacebook";

const defaultTheme = createTheme();

export default function SignUp() {
  const auth = getAuth(app);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const handleSignUp = () => {
    if (
      (validateUsername(),
        validateEmail(),
        validateNumber(),
        validatePassword())
    ) {
      createUserWithEmailAndPassword(
        auth,
        email,
        password,
        username,
        confirmPassword,
        phonenumber
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("Signed up:", user);
          toast.success("sign-up successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        })
        .catch((error) => {
          // console.error("Sign-up error:", error);
          toast.error(`sign-up error: ${error}`);
        });
    } else {
      alert("enter your credentails");
    }
  };

  const validateUsername = () => {
    if (username === "") {
      return alert("please enter your username");
    }

    return true;
  };
  const validateEmail = () => {
    if (email === "") {
      return "please enter your email";
    }

    return true;
  };
  const validateNumber = () => {
    if (phonenumber === "") {
      return "please enter your number";
    }

    return true;
  };

  const validatePassword = () => {
    if (!password) {
      return "please enter your password";
    }

    return true;
  };
  const validateconfirmPassword = () => {
    if (password !== confirmPassword) {
      alert("please enter your correct password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setTimeout(() => {

    // }, timeout);
    setusername("");
    setconfirmPassword("");
    setphonenumber("");
    setEmail("");
    setPassword("");
  };
  const navigate = useNavigate();
  function handlenavigate() {
    navigate("/signin");
  }
  const handleGoogleSignIn = () => {
    GoogleAuth()
      .then((user) => {
        console.log(user, "user");
        navigate("/mainpage");
      })
      .catch((error) => {
        // console.error("Sign-in error:", error);
        toast.error(`Sign-in error: ${error.message}`);
      });
  };
  return (
    <div className="container">
      <div className="container-main">


        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              className="box-flex"
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                padding: "30px",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className="textfield"
                      fullWidth
                      id="username"
                      label="Enter Name"
                      name="username"
                      autoComplete="username"
                      variant="filled"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="textfield"
                      fullWidth
                      id="email"
                      label="Enter Email "
                      name="email"
                      autoComplete="email"
                      variant="filled"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <p>{validateEmail}</p>
                  {/* <Grid item xs={12}>
                    <TextField
                      className="textfield"
                      fullWidth
                      id="phonenumber"
                      label="Phone number"
                      name="phonenumber"
                      autoComplete="phonenumber"
                      variant="filled"
                      value={phonenumber}
                      onChange={(e) => setphonenumber(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      className="textfield"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      variant="filled"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className="textfield"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      variant="filled"
                      autoComplete="new-confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignUp}
                  className="btn-signup"
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link variant="body2" onClick={handlenavigate}>
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <h6 className="span-or">or</h6>
                </Grid>

                <Grid>
                  <Grid item xs={12}>
                    {/* <GoogleAuth /> */}
                    <div className="input-container">
                      <i className=" icon">
                        {" "}
                        <GoogleIcon />
                      </i>
                      <button
                        class="input-field"
                        onClick={(e) => handleGoogleSignIn(e)}
                      >
                        Sign in with google
                      </button>
                    </div>
                    <SigninFacebook />
                  </Grid>
                </Grid>

                <ToastContainer />
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
