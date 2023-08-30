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
import "../css/Signin.css";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Service/firebase.config";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SigninGoggleAuth from "../SigninGoggleauth";
import signinwithFacebok from "../SigninFacebook";
import SigninFacebook from "../SigninFacebook";
import { InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { sendPasswordResetEmail } from "firebase/auth";
import "../../src/css/Signin.css";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
    }
  };
  const validateEmail = () => {
    if (!email) {
      return false;
    } else {
      return true;
    }


  };

  const validatePassword = () => {
    if (!password) {
      return false;
    } else {
      return true;

    }

  };

  const handleSignIn = () => {
    if (validatePassword && validateEmail()) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("Signed in:", user);
          toast.success("Sign up successful!,");
          navigate("/mainpage");
        })
        .catch((error) => {
          // console.error("Sign-in error:", error);
          toast.error(`sign-in error: ${error} `);
        });
    }
  };
  function handlenavigate() {
    navigate("/");
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    alert("open your Email to Reset Password")

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };
  return (
    <div className="container">
      <div className="container-main">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "500px",
                padding: "30px",
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  variant="filled"
                  autoComplete="current-password"
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
                <Grid container>
                  <Grid item xs>
                    <Link
                      style={{
                        color: "rgba(125, 121, 121, 1)",
                        textDecoration: "none",
                      }}
                      className="link-reset"
                      variant="body2"
                      onClick={handleResetPassword}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      className="Link-signup"
                      variant="body2"
                      onClick={handlenavigate}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignIn}
                  style={{
                    background:
                      "linear-gradient(90deg, #E17353 0%, #FDBB4F 100%)",
                  }}
                >
                  Sign In
                </Button>
                <Grid item xs={12}>
                  <h6 className="span-or">or</h6>
                </Grid>

                <Grid>
                  <SigninGoggleAuth />
                  <SigninFacebook />
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
