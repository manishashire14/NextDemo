import { React, useEffect, useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  Container,
  CssBaseline,
  Box,
  Avatar,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { configurations, constants } from '../../config/index';
import dynamic from 'next/dynamic';
import BlogForm from '../../components/BlogForm'
const theme = createTheme();

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

const CreateBlogPage = () => {

  const router = useRouter();

  const handleOnClose = () => {
    router.back();
  };

  return (
    <>
      <BlogForm />
    </>
  );
};

export default CreateBlogPage;
