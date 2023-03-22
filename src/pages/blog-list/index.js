import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BlogCard from "../../components/BlogCard";
import axios from "axios";
// import "react-quill/dist/quill.snow.css";
import { configurations, constants } from "../../config/index";
// import CustomAccordian from "@/components/customAccordian";
import CustomCard from "../../components/card/index";
import { useRouter } from "next/router";
import Link from "next/link";
import { Listing } from "../../components/listing";

const BlogList = (props) => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState();
  console.log('🚀 ~ file: index.js:24 ~ BlogList ~ cards:', cards);
  const [categoriesData, setCategoriesData] = useState([]);
  const [errorAPI, setErrorAPI] = useState();

  
  const router = useRouter();
  // useEffect(() => setCards(props.data), [])

  // setCards(props.data);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    let url;
    let params;
    const userName = JSON.parse(localStorage.getItem("userDetails")).userName;
    console.log("🚀 ~ file: index.js:39 ~ useEffect ~ userName:", userName);

    const response = axios
      .get(`${configurations.apiUrl}/blog-post/author/${userName}`)
      .then((res) => {
        console.log(
          "🚀 ~ file: [blogId].js:235 ~ getStaticPaths ~ response:",
          res.data
        );
        setCards(res?.data?.data);
        
      })
      .catch((error) => {
        if (error?.response?.data?.statusCode === 401) {
          localStorage.setItem("accessToken", "");
        }
        console.log(error);
      });

    //   axios({
    //     method: "get",
    //     url: `${configurations.apiUrl}/blog-post/categories-tags`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: accessToken,
    //     },
    //     mode: constants.mode,
    //   })
    //     .then(function (response) {
    //       setCategoriesData(response?.data?.data?.categories);
    //       setChipTagsData(response?.data?.data?.tags);
    //     })
    //     .catch(function (error) {
    //       if (error?.response?.data?.statusCode === 401) {
    //         localStorage.setItem("accessToken", "");
    //       }
    //       console.log(error);
    //     });
  }, []);

  const theme = createTheme();

  const handleCardChange = (blogId) => {
    router.push(`/blog-details/${blogId}`);
  };

  // const handleChipFilter = (selectedChip, filter) => {
  //   let filters = JSON.parse(localStorage.getItem("blogFilter"));
  //   let categories = [];
  //   let tags = [];

  //   if (!filters) {
  //     filters = { [filter]: selectedChip };

  //     localStorage.setItem("blogFilter", JSON.stringify(filters));
  //   } else {
  //     filters = { ...filters, [filter]: selectedChip };
  //     localStorage.setItem("blogFilter", JSON.stringify(filters));
  //   }
  //   axios({
  //     method: "get",
  //     url: `${configurations.apiUrl}/blog-post/search/categories-tags/`,
  //     params: filters,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("accessToken"),
  //     },
  //     mode: constants.mode,
  //   })
  //     .then(function (response) {
  //       setCards(response.data.data);
  //     })
  //     .catch(function (error) {
  //       if (error?.response?.data?.statusCode === 401) {
  //         localStorage.setItem("accessToken", "");
  //       }
  //       console.log(error);
  //     });
  // };

  return (
    <>
      {cards  ? (
        <div className="d-flex flex-row flex-wrap">
          {cards?.map((card) => {
            console.log("card.blogId : ", card.blogId);
            return (
              <>
                <div className="col-sm-12 row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-8">
                    <ul>
                      <li
                        key={card.blogId}
                        style={{
                          listStyle: "none",
                        }}
                      >
                        <BlogCard
                          card={card}
                          handleCardChange={() => handleCardChange(card.blogId)}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-2"></div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <p className="d-flex justify-content-center p-5">No Blogs to show</p>
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
//   const response = await axios.get(`${configurations.apiUrl}/blog-post`);
//   const data = response?.data?.data;
//   console.log("🚀 ~ file: index.js:167 ~ getStaticProps ~ data:", data);

//   if (response.status !== 200) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//         // statusCode: 301
//       },
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//     // revalidate: 10,
//   };
// }

export default BlogList;
