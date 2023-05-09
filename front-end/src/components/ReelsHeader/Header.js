import React from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Add from "@material-ui/icons/Add";
import { useNavigate } from "react-router-dom";




import "./Header.css";
import { Button } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  function handleBack() {
     navigate(`/HomePage/${localStorage.getItem('id')}`);
  }
  return (
    <div className="video-header">
      <ArrowBackIosIcon style={{ fontSize: 55 }} />
      <Add style={{ fontSize: 55 }} />
    </div>
  );
}
