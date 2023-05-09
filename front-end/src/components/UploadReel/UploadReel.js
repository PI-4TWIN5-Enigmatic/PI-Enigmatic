import React, { useState } from "react";
import axios from "axios";

import { useGetUserID } from "../../hooks/useGetUserID";
import { ImVideoCamera } from "react-icons/im";
import { Modal } from "react-bootstrap";



function UploadReel() {
  const id = useGetUserID();

  const [videoFile, setVideoFile] = useState("");

  const [showModal, setShow] = useState(false);


  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

   

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", videoFile);
    data.append("upload_preset", "enigmatic");
    data.append("cloud_name", "dtisuumvj");
    data.append("resource_type", "video");
    axios
      .post("https://api.cloudinary.com/v1_1/dtisuumvj/video/upload", data, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((response) => {
        console.log(response.data.secure_url);
        axios.post(
          `http://localhost:8000/reels/${id}`,
          response.data.secure_url
        );
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className="modelheader" closeButton></Modal.Header>
        <Modal.Body className="modelcontent">
          <label type="file" htmlFor="file" id="ember1142" class="input">
            Select Reel here
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setVideoFile(e.target.files[0])}
              multiple
            />
          </label>
        </Modal.Body>
        <Modal.Footer className="modelfooterr">
          <button className="buttonfooter" onClick={handleClose}>
            Close
          </button>
          <button className="buttonfooter" onClick={handleSubmit}>
            Upload
          </button>
        </Modal.Footer>
      </Modal>

      <button className="icon-wrapper" onClick={handleShow}>
        <ImVideoCamera className="icon-red" />
        <span className="label" style={{ marginLeft: "8px" }}>
          <strong>Reel </strong>
        </span>
        <input
          style={{ display: "none" }}
          type="file"
          id="reel"
          accept=".mp4, .avi, .mov, .wmv"
          onChange={(event) => setVideoFile(event.target.files[0])}
        />
      </button>
    </>
  );
}
export default UploadReel;
