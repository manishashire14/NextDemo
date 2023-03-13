import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import {configurations, constants} from '../../config/index';
const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect(()=> {
  //   const accessToken = localStorage.getItem('accessToken');    
  //   if(accessToken) {
  //     router.push('/blog-list')
  //   }
  // })
  const handleOnSumit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${configurations.apiUrl}/user-profile/login`,
      data: {
        email,
        password,
      },
      headers: constants.headers,
      mode: constants.mode,
    })
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.data.token);
        localStorage.setItem('userDetails', JSON.stringify(response?.data?.data?.user));
        response?.data?.data?.token ?  router.push('/blog-app') : router.push('/login');

      })
      .catch(function (error) {
        console.log(error);
        alert('Wrong credentials');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleOnSumit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Typography sx={{color:"primary.main"}}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
              <Typography sx={{mr:"10px"}} >
                    Already have an account?
                  </Typography>
                  <Typography sx={{color:"primary.main"}}>
                  <Link href="/register">Sign Up</Link>
                  </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
