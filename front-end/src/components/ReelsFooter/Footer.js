import React from "react";

import { Button } from "@material-ui/core";

import { Favorite, Comment } from "@material-ui/icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Footer.css";

export default function Footer({ likes, comment, shares , onLike, isLiked}) {
  return (
    <div className="video-footer">
      <div className="video-text">
      </div>
      {/*  */}
      <div className="footer-buttons">
      <div className="flex-box" onClick={onLike}>
          {isLiked ? <Favorite /> : <FavoriteBorderIcon />}
          {likes}
        </div>
        {/*  */}
        <div className="flex-box">
          <Comment />
          {comment}
        </div>
        {/*  */}
        <div className="flex-box">
          <VisibilityIcon />
          {shares}
        </div>
      </div>
    </div>
  );
}
