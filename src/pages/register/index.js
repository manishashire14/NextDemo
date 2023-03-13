import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { configurations, constants } from "../../config/index";

const theme = createTheme();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     router.push("/blog-list");
  //   }
  // });
  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${configurations.apiUrl}/user-profile`,
      data: {
        firstName,
        lastName,
        email,
        password,
      },
      headers: constants.headers,
      mode: constants.mode,
    })
      .then(function (response) {
        console.log("🚀 ~ file: index.js:49 ~ response:", response);

        localStorage.setItem(
          "userDetails",
          JSON.stringify(response?.data?.data?.data)
        );
        // response?.data?.data?.token
        //   ? router.push("/blog-list")
        //   : 
          router.push("/login");
      })
      .catch(function (error) {
        console.log("🚀 ~ file: index.js:51 ~ handleOnSubmit ~ error:", error);
        alert(error?.response?.data?.message[0]);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 30,
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => handleOnSubmit(event)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="off"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOnSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item sx={{ display: "flex" }}>
                <Typography sx={{ mr: "10px" }}>
                  Already have an account?
                </Typography>
                <Typography sx={{ color: "#0d6efd" }}>
                  <Link href="/login">Sign In</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
