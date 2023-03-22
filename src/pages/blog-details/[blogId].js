import { React, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { useRouter } from "next/router";
import { configurations, constants } from "../../config/index";
// import CustomList from '../../components/customList/index'
// import Comment from '../../components/comment/index';

const BlogDetails = (props) => {
    console.log('🚀 ~ file: [blogId].js:11 ~ BlogDetails ~ props:', props);
  //   const [blogData, setBlogData] = useState([]);
  // console.log("🚀 ~ file: [blogId].js:13 ~ BlogDetails ~ blogData:", blogData);
  <h1>{props.blogData}</h1>;
  //   const [addComment, setAddComment] = useState([]);
  //   const [listComment, setListComment] = useState([]);
  //   const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const router = useRouter();
  //   const query = router.query;
  // // useEffect(()=> {
  // //   if(router.isReady) {
  // //   axios({
  // //     method: 'get',
  // //     url: `${configurations.apiUrl}/blog-post/${query.blogId}`,
  // //     headers: {
  // //       'Content-Type': 'application/json',
  // //       Authorization: localStorage.getItem('accessToken'),
  // //     },
  // //     mode: constants.mode,
  // //   })
  // //       .then(function (response) {
  // //         console.log("🚀 ~ file: [blogId].js:26 ~ response:", response)
  // //         setBlogData(response?.data?.data[0]);
  // //         setListComment(response?.data?.data[0].comments)
  // //       })
  // //       .catch(function (error) {
  // //         console.log(error);
  // //       });

  // //       axios({
  // //         method: "get",
  // //         url: `${configurations.apiUrl}/blog-post/search/categories-tags/`,
  // //         params: {categories: blogData.categories},
  // //         headers: {
  // //           "Content-Type": "application/json",
  // //           Authorization: localStorage.getItem("accessToken"),
  // //         },
  // //         mode: constants.mode,
  // //       })
  // //         .then(function (response) {
  // //           console.log("🚀 ~ file: [blogId].js:46 ~ response:", response)
  // //           setFeaturedBlogs(response.data.data);
  // //         })
  // //         .catch(function (error) {
  // //           if (error?.response?.data?.statusCode === 401) {
  // //             localStorage.setItem("accessToken", "");
  // //           }
  // //           console.log(error);
  // //         });
  // //       }
  // //   }, [router.isReady]);

  // //   const handleAddComment = () => {
  // //     axios({
  // //       method: 'patch',
  // //       url: `${configurations.apiUrl}/comment/${query.blogId}`,
  // //       data: {
  // //         comment: {
  // //           coommentedUserName: blogData?.author,
  // //           comment: addComment
  // //         }
  // //       },
  // //         headers: {
  // //           'Content-Type': 'application/json',
  // //           Authorization: localStorage.getItem('accessToken'),
  // //         },
  // //         mode: constants.mode,
  // //       })
  // //       .then(function (response) {
  // //         setListComment(response?.data?.data?.comments);
  // //         setAddComment('')
  // //       })
  // //       .catch(function (error) {
  // //         console.log(error);
  // //       });
  // //   }
  // //   const categoriesName = blogData?.categories?.map((categories) => categories);

    return (
      <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
      }}
    >
      <Grid
        item
        container
        // spacing={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '30px',
          m: '10px',
        }}
      >
        <Grid
          container
          spacing={6}
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
            padding: '30px',
            m: '10px',
          }}
        >
          <Grid>
            <Button
              variant="text"
              // startIcon={<ArrowBackIcon />}
              sx={{ textTransform: 'lowercase' }}
              onClick={() => router.push('/blog-list')}
            >
              Back to blogs
            </Button>
            <Typography variant="body1" sx={{ padding: '5px' }}>
              {props.blogData[0]?.createdAt?.substr(0, 10)}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ paddingBottom: '15px' }}
            >
              {props.blogData[0].title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                width: '90%',
                padding: '5px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {props.blogData[0].author}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                // opacity: '0.5',
                ml: '30px',
                mr: '30px',
                paddingBottom: '30px',
                paddingTop: '30px',
                borderBottom: '1px solid gray',
              }}
              dangerouslySetInnerHTML={{ __html: props.blogData[0].description }}
            >
              {/* {blogData.description} */}
            </Typography>
          </Grid>
          <Stack sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ mt: '20px', mb: '20px' }}>
              Comments
            </Typography>
            <TextField
              id="outlined-basic"
              label="Leave your comment"
              variant="outlined"
              multiline
              rows={2}
              maxRows={4}
              // onChange={(event) => setAddComment(event.target.value)}
              sx={{ mb: '20px' }}
              // value={addComment}
            />
          </Stack>
          <Button variant="contained" sx={{ textTransform: 'capitalize' }}
          // onClick={handleAddComment}
          >
            {' '}
            Submit comment
          </Button>
          {/* <Comment blogComments={listComment}/> */}
        </Grid>
        <Grid
          container
          sx={{
            padding: '30px',
            m: '10px',
          }}
        >
          <Grid sx={{ width: '100%' }}>
            <Typography
              variant="h4"
              sx={{ mb: '20px', display: 'flex', justifyContent: 'center' }}
            >
              {`More related to`}
            </Typography>
            <Stack sx={{ ml: { lg: 30, md: 4, sm: 2, xs: 1 } }}>
              {/* <CustomList featuredBlogs={featuredBlogs}/> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    );
};

// // export async function getStaticProps(context) {
// //   const response = await axios.get(`${configurations.apiUrl}/blog-post`);
// //   const data = response?.data?.data;
// //   console.log("🚀 ~ file: index.js:167 ~ getStaticProps ~ data:", data);

// //   if (response.status !== 200) {
// //     return {
// //       redirect: {
// //         destination: "/",
// //         permanent: false,
// //         // statusCode: 301
// //       },
// //     };
// //   }

// //   return {
// //     props: { data }, // will be passed to the page component as props
// //     // revalidate: 10,
// //   };
// // }

export async function getStaticPaths() {
  // const books: Book[] = await getBooksAsync();
  const response = await axios.get(`${configurations.apiUrl}/blog-post`);
  console.log(
    "🚀 ~ file: [blogId].js:235 ~ getStaticPaths ~ response:",
    response.data
  );
  const paths = response?.data?.data?.map((blog) => {
    console.log("🚀 ~ file: [blogId].js:236 ~ paths ~ blog:", blog);

    return { params: { blogId: blog.blogId } };
  });
  console.log("🚀 ~ file: [blogId].js:237 ~ paths ~ paths:", paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const params = context.params;
  const query = context.query;

  console.log(
    "🚀 ~ file: [blogId].js:251 ~ getStaticProps ~ context:",
    context
  );
  const bookId = params.blogId;
  // const blog =  await axios.get(`${configurations.apiUrl}/blog-post/${query.blogId}`)
  // const blogById = await axios({
  //   method: "get",
  //   url: `${configurations.apiUrl}/blog-post/${context.params.blogId}`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Authorization: localStorage.getItem('accessToken'),
  //   },
  //   mode: constants.mode,
  // });
  const response = await axios.get(`${configurations.apiUrl}/blog-post/${context.params.blogId}`);

   console.log('🚀 ~ file: [blogId].js:258 ~ getStaticProps ~ blogById:', response);

  return {
    props: {
      blogData: response.data.data,
    },
  };
}

export default BlogDetails;
