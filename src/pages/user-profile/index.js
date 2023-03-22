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

export default function UserProfile() {

  return (<h1>hi Blog APP</h1>);
}
