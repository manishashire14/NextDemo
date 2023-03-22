import React from "react";
import styles from "../../styles/Home.module.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  Typography,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import Image from "next/image";
import clapping from "./../../asset/clapping.png";

import { useRouter } from "next/router";
// import { Style } from "@mui/icons-material";
const BlogCard = ({ card, handleCardChange, isEditable = false }) => {
  let { _id } = card;
  const router = useRouter();
  const handleProfileRedirect = () => {
    router.push(`/edit-blog?id=${_id}`);
  };
  return (
    <div className={`${styles.p1} mt-4`}>
      {/* <div className="mt-4">  */}
      <div className=" d-flex justify-content-between">
        <em className=" fw-normal text-secondary h4"> by {card.author}</em>
        <em className=" d-flex justify-content-end  fw-normal text-secondary h4 ml-auto">
          {" "}
          Latest updated:{" "}
          {card.createdAt?.substr(0, 10) || card.updatedAt?.substr(0, 10)}
        </em>
      </div>
      <h1 className="fw-bolder mt-3 display-6 text-uppercase">{card.title}</h1>
      <h1 className={`${styles.description} text-secondary fw-normal mt-5 h4 `}>
        {card.description}
      </h1>

      <div className=" d-flex justify-content-between mt-5">
        <button
          className="btn btn-success justify-content-centre px-3"
          style={{ height: "80%" }}
          onClick={() => {
            router.push(`/blog-details/${card.blogId}`);
          }}
        >
          {" "}
          READ MORE{" "}
        </button>

        <div className="d-flex justify-content-end">
          <h3 className="mt-3 mx-2">{card?.voteCount?.length}</h3>
          <Image
            className="d-flex justify-content-end  ml-auto"
            src={clapping}
            width={50}
            height={50}
            alt="clapping"
          />
        </div>
      </div>
      <hr class="style15 mt-2" />

      {isEditable ? (
        // <Link >
        <Button onClick={handleProfileRedirect} startIcon={<EditIcon />} />
      ) : // </Link>
      null}
    </div>
  );
};

export default BlogCard;
