import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { ImVideoCamera } from "react-icons/im";
import { Modal } from "react-bootstrap";

function UploadReel() {
  const id = useGetUserID();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 const handleSubmit = (event) => {
   event.preventDefault();

   const data = new FormData();
   data.append("file", selectedFile);
   data.append("upload_preset", "enigmatic");
   data.append("cloud_name", "dtisuumvj");
   data.append("resource_type", "video");

   setIsLoading(true); // set isLoading to true before making the axios post request

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
       console.log("CONSOOOOLELELELELELEL" + response.data.secure_url);
       const data = {
         reelUrl: response.data.secure_url,
       };
       axios
         .post(`http://localhost:8000/reels/${id}`, data)
         .then(() => {
           setIsLoading(false); // set isLoading to false after successful response
           handleCloseModal();
         })
         .catch((error) => {
           console.error(error);
           setIsLoading(false); // set isLoading to false after catching an error
         });
     })
     .catch((error) => {
       console.error(error);
       setIsLoading(false); // set isLoading to false after catching an error
     });
 };


  return (
    <>
      <button className="icon-wrapper" onClick={handleOpenModal}>
        <ImVideoCamera className="icon-red" />
        <span className="label" style={{ marginLeft: "8px" }}>
          <strong>Reel </strong>
        </span>
      </button>

      {isOpen && (
        <Modal show={isOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Uploader un fichier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="file" onChange={handleFileChange} />
              </div>
              <button type="submit" className="btn btn-primary">
                {isLoading ? "Loading..." : "Upload"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default UploadReel;
