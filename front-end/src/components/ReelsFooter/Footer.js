import React from "react";

import { Button } from "@material-ui/core";

import { Favorite, Comment, Send } from "@material-ui/icons";

import "./Footer.css";

export default function Footer({ likes, comment, shares }) {
  return (
    <div className="video-footer">
      <div className="video-text">
      </div>
      {/*  */}
      <div className="footer-buttons">
        <div className="flex-box">
          <Favorite />
          {likes}
        </div>
        {/*  */}
        <div className="flex-box">
          <Comment />
          {comment}
        </div>
        {/*  */}
        <div className="flex-box">
          <Send />
          {shares}
        </div>
      </div>
    </div>
  );
}
