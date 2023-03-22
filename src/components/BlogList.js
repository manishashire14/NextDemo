import { React, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import CustomCard from "./card";
import CustomAccordian from "./CustomAccordian";
import { useRouter } from "next/router";
import { configurations, constants } from "../config/index";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState();
  const [categoriesData, setCategoriesData] = useState([]);
  const [chipTagsData, setChipTagsData] = useState([]);
  const [search, setSearch] = useState("");
  const [chipColor, setChipColor] = useState("");


 
  const allBlogs = () => {
    let url;
    let params;

    const response = axios
      .get(`${configurations.apiUrl}/blog-post`)
      .then((res) => {
        setCards(res?.data?.data);
      })
      .catch((error) => {
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
        //   Authorization: accessToken,
      },
      mode: constants.mode,
    })
      .then(function (response) {
        setCategoriesData(response?.data?.data?.categoriesSet);
        setChipTagsData(response?.data?.data?.tagsSet);
      })
      .catch(function (error) {
        if (error?.response?.data?.statusCode === 401) {
          localStorage.setItem("accessToken", "");
        }
        console.log(error);
      });
  };

  const router = useRouter();
  useEffect(() => {
    allBlogs();
  }, []);

  const handleCardChange = (blogId) => {
    router.push(`/blog-details/${blogId}`);
  };

  const handleTitleContentSearch = () => {
    if (search.length !== 0) {
      axios({
        method: "get",
        url: `${configurations.apiUrl}/blog-post/search/categories-tags/`,
        params: {
          title: search,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        mode: constants.mode,
      })
        .then(function (response) {
          console.log("🚀 ~ file: index.js:104 ~ response:", response);
          setCards(response.data.data);
        })
        .catch(function (error) {
          if (error?.response?.data?.statusCode === 401) {
            localStorage.setItem("accessToken", "");
          }
          console.log(error);
        });
    }
    
  };
  const handleChipFilter = (selectedChip, filter) => {
    let filters = JSON.parse(localStorage.getItem("blogFilter"));
    let categories = [];
    let tags = [];

    if (!filters) {
      filters = { [filter]: selectedChip };
      console.log(
        "🚀 ~ file: BlogList.js:106 ~ handleChipFilter ~ filters:",
        filters
      );

      localStorage.setItem("blogFilter", JSON.stringify(filters));
    } else {
      filters = { ...filters, [filter]: selectedChip };
      console.log(
        "🚀 ~ file: BlogList.js:111 ~ handleChipFilter ~ filters:",
        filters
      );
    }
    console.log("filter", filters);

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

  const clearFilter = () => {
    localStorage.removeItem("blogFilter");
    console.log(
      "🚀 ~ file: BlogList.js:149 ~ clearFilter ~ localStorage:",
      localStorage
    );
    allBlogs();
    setChipColor("clearFilter")
  };

  return (
    <div className="col-sm-12 row">
      <div className="col-sm-1 text-center mt-5">
        <h1> </h1>
      </div>
      <div className="col-sm-3 bg-light mt-5 ">
        <div className="d-flex justify-content-between">
          <p className="display-6 fw-bolder mt-5 mx-5"> Search </p>

          <div
            className="text-success justify-content-end p-3"
            onClick={() => {
              clearFilter()
            }}
          >
            Clear filters x
          </div>
        </div>

        <div className="input-group mx-5" style={{ width: "auto" }}>
          <input
            type="text"
            className="form-control "
            placeholder="Search this blog"
            onChange={(event) => setSearch(event.target.value)}
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleTitleContentSearch}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <p className="display-6 fw-bolder mt-5 mx-5"> categories </p>
        <div className="d-flex justify-content-between">
          <p className="text-success mx-5">Topics {categoriesData.length}</p>
          {/* <button className="text-success justify-content-end" onClick={()=>{clearFilter()}}>Clear filters  x</button> */}
        </div>
        <CustomAccordian
          chipData={categoriesData}
          title={"categories"}
          clearFilter= {chipColor}
          handleChipFilter={handleChipFilter}
        />
        <p className="display-6 fw-bolder mt-5 mx-5"> Tags </p>
        <CustomAccordian
          chipData={chipTagsData}
          title={"tags"}
          clearFilter= {chipColor}
          handleChipFilter={handleChipFilter}
        />
      </div>
      <div className="col-sm-7 mt-5 px-5">
        <div className="">
          <h2 className={`${styles.p1} display-2`}>Latest Blogs</h2>

          <div className="d-flex flex-row flex-wrap">
            {cards?.map((card) => {
              return (
                <>
                  <ul>
                    <li
                      // className="m-2"
                      key={card.blogId}
                      style={{
                        listStyle: "none",
                      }}
                    >
                      {/* <h1>{card.title}</h1>
                  <h1>{card.author}</h1> */}
                      <BlogCard
                        card={card}
                        handleCardChange={() => handleCardChange(card.blogId)}
                      />

                      {/* <CustomCard
                    card={card}
                  handleCardChange={() => handleCardChange(card.blogId)}
                  /> */}
                    </li>
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-sm-1 text-center mt-5">
        <h1> </h1>
      </div>
    </div>
  );
};

export default BlogList;
