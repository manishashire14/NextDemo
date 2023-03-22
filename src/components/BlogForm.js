import { React, useEffect, useState } from "react";
import axios from "axios";
import { configurations, constants } from "../config/index";

const BlogForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();

  const handleOnCreateChange = (event) => {
   
    event.preventDefault();
    // title, description;
    const tagData = tags.split(",");
    const categoryData = categories.split(",");
    const userName = JSON.parse(localStorage.getItem("userDetails")).userName;

    axios({
      method: "post",
      url: `${configurations.apiUrl}/blog-post`,
      data: {
        title,
        description,
        categories: categoryData,
        tags: tagData,
        author: userName,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      mode: constants.mode,
    })
      .then(function (response) {
        router.push("/blog-list");
        setCards([response.data.data, ...cards]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-90 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-10 col-xl-9">
                <div className="">
                  {/* style="border-radius: 15px;" */}
                  <div className="card-body w-100 p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Post your thoughts
                    </h2>

                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1cg">
                          BLOG TITLE
                        </label>
                        <input
                          type="title"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <label className="form-label" for="form3Example3cg">
                        BLOG description
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="description"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          style={{ height: "400px" }}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>
                      <label className="form-label" for="form3Example3cg">
                        categories
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="categories"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(event) =>
                            setCategories(event.target.value)
                          }
                        />
                      </div>
                      <label className="form-label" for="form3Example3cg">
                        Tags
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="Tags"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(event) => setTags(event.target.value)}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          // onClick={handleOnCreateChange}
                          onClick={(event) => handleOnCreateChange(event)}
                        >
                          Post My Blog
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogForm;
