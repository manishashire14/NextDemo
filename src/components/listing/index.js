import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
// import "react-quill/dist/quill.snow.css";
import { configurations, constants } from "../../config/index";
// import CustomAccordian from "@/components/customAccordian";
import Listing from "../../components/listing/index";
import { useRouter } from "next/router";
import Link from "next/link";

const BlogList = (blogsData) => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState(blogsData.data);
  const [categoriesData, setCategoriesData] = useState([]);
  const [chipTagsData, setChipTagsData] = useState([]);
  const router = useRouter();


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    let url;
    let params;
    if (!accessToken) {
      router.push("/");
    }
    const filterValue = JSON.parse(localStorage.getItem("blogFilter"));
    if (filterValue) {
      url = `${configurations.apiUrl}/blog-post/search/categories-tags/`;
      params = filterValue;
    } else {
      url = `${configurations.apiUrl}/blog-post`;
      params = {};
    }
    axios({
      method: "get",
      url,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      mode: constants.mode,
    })
      .then(function (response) {
        setCards(response?.data?.data);
      })
      .catch(function (error) {
        if (error?.response?.data?.statusCode === 401) {
          localStorage.setItem("accessToken", "");
        }
        console.log(error);
      });

    axios({
      method: "get",
      url: `${configurations.apiUrl}/blog-post/categories-tags`,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      mode: constants.mode,
    })
      .then(function (response) {
        setCategoriesData(response?.data?.data?.categories);
        setChipTagsData(response?.data?.data?.tags);
      })
      .catch(function (error) {
        if (error?.response?.data?.statusCode === 401) {
          localStorage.setItem("accessToken", "");
        }
        console.log(error);
      });
  }, []);

  const theme = createTheme();

  const handleCardChange = (blogId) => {
    router.push(`/blog-details/${blogId}`);
  };

  const handleChipFilter = (selectedChip, filter) => {
    let filters = JSON.parse(localStorage.getItem("blogFilter"));
    let categories =[];
    let tags = [];

    if (!filters) {
       filters = {[filter]: selectedChip};

      localStorage.setItem(
        "blogFilter",
        JSON.stringify(filters)
      );
    } else {
      filters = { ...filters, [filter]: selectedChip };
      localStorage.setItem("blogFilter", JSON.stringify(filters));
    }
    axios({
      method: "get",
      url: `${configurations.apiUrl}/blog-post/search/categories-tags/`,
      params: filters,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      mode: constants.mode,
    })
      .then(function (response) {
        setCards(response.data.data);
      })
      .catch(function (error) {
        if (error?.response?.data?.statusCode === 401) {
          localStorage.setItem("accessToken", "");
        }
        console.log(error);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              background: "#edecec",
              pt: 8,
              pb: 6,
            }}
          >
            <Container>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Stay curious
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                You can buy attention (advertising). You can beg for attention
                from the media (PR). You can bug people one at a time to get
                attention (sales). Or you can earn attention by creating
                something interesting and valuable and then publishing it online
                for free.
              </Typography>
              <Typography
                variant="h4"
                align="center"
                color="text.secondary"
                paragraph
              >
                Get the thoughts, stories, and expertise of writers on any area.
                Start Reading
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Link href="/create-blog-page">
                  <Button variant="contained">
                    Post your Blog
                  </Button>
                </Link>
              </Stack>
            </Container>
          </Box>
          <Grid
            sx={{
              py: 8,
              display: { md: "flex", lg: "flex" },
              justifyContent: "space-around",
              // ml:5
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "0px 15px 15px 15px",
              }}
            >
              {/* <CustomAccordian
                chipData={categoriesData}
                title={"categories"}
                handleChipFilter={handleChipFilter}
              />
              <CustomAccordian
                chipData={chipTagsData}
                title={"tags"}
                handleChipFilter={handleChipFilter}
              /> */}
            </Grid>
            <Grid
              container
              spacing={4}
              sx={{
                marginLeft: { md: "5px", lg: "5px" },
                marginRight: { md: "5px", lg: "5px" },
              }}
            >
              {cards?.map((card) => (
                <Grid item key={card.blogId} xs={12} sm={6} md={4} lg={3}>
                  <Listing
                    data={card}
                    handleCardChange={() => handleCardChange(card.blogId)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </main>
      </ThemeProvider>
    </>
  );
};

// export async function getStaticProps(context) {
//   const response = await axios.get(`${configurations.apiUrl}/blog-post`);
//   const data = response?.data?.data;

//   if (response.status !== 200) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//         // statusCode: 301
//       },
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//     revalidate: 10,
//   };
// }

export default BlogList;