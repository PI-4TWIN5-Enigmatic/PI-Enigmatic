import React, { useRef } from "react";
import { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { Link, json, useParams } from "react-router-dom";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { Picker } from "emoji-mart";
import LeafletGeoCoder from "../Events/LeafletGeoCoder";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Divider } from "@mui/material";
import { BeatLoader } from "react-spinners";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {
  FaPhotoVideo,
  FaCalendarAlt,
  FaNewspaper,
  FaVideo,
} from "react-icons/fa";
import {
  ImStatsBars,
  ImPlay,
  ImLink,
  ImImage,
  ImLocation,
} from "react-icons/im";

import { Modal } from "react-bootstrap";
import "./share.css";
import { toast } from "react-toastify";
import axios from "axios";
import { common } from "@mui/material/colors";

import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
const Share = () => {
  const [change, setChange] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;

    transform: rotate(90deg); // Rotate the spinner by 90 degrees
  `;
  const componentRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isupdated, setisupdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isupdatedd, setisupdatedd] = useState(false);

  //show more/less 
  const [showFullMessage, setShowFullMessage] = useState(false);

const toggleShowFullMessage = () => {
  setShowFullMessage(!showFullMessage);
};
  
  const postid = useParams();
  const idCurrentUser = window.localStorage.getItem("id");

  const [comment, setcomments] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [showModal, setShow] = useState(false);
  const [showModall, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [img, setimage] = useState("");

  const [message, setmessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = (e) => {
    setIsVisible(e === isVisible ? null : e);
  };
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  

  const [file, setfile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const messagee = useRef('');
  const text = useRef();

  const [posts, setData] = useState("");
  const [textt, settext] = useState("");
  const [fileUrl, setFileUrl] = useState(null);


  const [videourl, setvideourl] = useState(null);

  const [updatedText, setUpdatedText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const { idd } = useParams();
  const [image, setimg] = useState("");
  const [posterId, setposterid] = useState("");
  const [iddd, setid] = useState(null);
  const [location, setLocationEvent] = useState("");

  const [showModalme, setShowme] = useState(false);
  const handleCloseme = () => setShowme(false);
  const handleshowme = () => setShowme(true);

  //code localisation
  const [showMap, setShowMap] = useState(false);

  const handleButtonClick = () => {
    setShowMap(!showMap); // toggle the value of showMap
  };
  function handleDataFromChild(data) {
    setLocationEvent(data);
  }

  const [isUploading, setIsUploading] = useState(false);


  //localisation
  const position = [36.8065, 10.1815];

  let DefaultIcon = L.icon({
    iconUrl: "../assets/images/marker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  //disabled button handle imagechange/video change
  function handleImageClick(e) {
    setFileUrl(null);
    setLoading(true);
    setIsImageUploading(true);
  
    const file = e.target.files[0];
  
    if (file) {
      setIsSubmitting(true);
      setIsDisabled(false);
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "siwarse");
      axios
        .post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
        .then((result) => {
          setFileUrl(result.data.secure_url);
          setIsImageUploading(false);
          setIsVideoUploading(false); // Set isVideoUploading to false after the request is successful
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsImageUploading(false);
          setIsVideoUploading(false); // Set isVideoUploading to false after the request is successful
        });
    } else {
      setIsSubmitting(false);
      setIsDisabled(true);
    }
  }
  
  

    const handleVideoChange = (event) => {
      setLoading(true);
      setIsSubmitting(true);
  
    const selectedVideo = event.target.files[0];
    setVideoFile(selectedVideo);
    setIsDisabled(!file && !selectedVideo && !message);
    setIsVideoUploading(true); // Set isVideoUploading to true before sending the request

    const form = new FormData();
    form.append("file", selectedVideo);
    form.append("upload_preset", "siwarse");
    axios
      .post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
      .then((result) => {
        setvideourl(result.data.secure_url);       

        setIsImageUploading(false);
        setIsVideoUploading(false); // Set isVideoUploading to false after the request is successful
         setLoading(false);

      })
      .catch((error) => {
        console.error(error);
        setIsImageUploading(false);
        setIsVideoUploading(false); // Set isVideoUploading to false after the request failed

      });
  }
    
  //input change with disabled button
  function handleInputChange(event) {
    setLoading(false);
    setIsSubmitting(false);
  
    setInputValue(event.target.value);
    setIsDisabled(!videoFile && !file && !event.target.value );
  }

  //show close modal
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  function handleCloseModal() {
    
    if (isSubmitting) {
      setIsClosing(true);
      

    } else {
      setShoww(false);
      setIsClosing(false);
      

   

      
    }
  }
  
  function handleDeletePost() {
    setIsDisabled(true);

    setFileUrl(null);
    setLoading(false);
    setLocationEvent(null);

    setmessage('');
    setVideoFile('');
    setIsClosing(false);
    setIsSubmitting(false);
    // TODO: Implement logic to delete post
    setShoww(false);
  }



  useEffect(() => {
    setIsDisabled(!fileUrl || (!messagee || !messagee.current?.value) && isImageUploading);
  }, [fileUrl, messagee, isImageUploading]);
  


  const getpostbyid = async () => {
    const response = await fetch(`http://localhost:8000/api/post/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    getpostbyid();
    setChange(false);
  }, [change]);

  const get = async () => {
    const response = await fetch("http://localhost:8000/api/post/getpost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };
  useEffect(() => {
    get();
    setChange(true);

  }, []);

  const handleupdate = (id) => {
    const form = new FormData();

    // Get the message from the text area or use the message from the post
    let msg;
    if (message == null) {
      msg = posts[0].message;
    } else {
      msg = message;
    }

    const data = {
      message: msg,
    };

    // Update the post on the server
    axios
      .put(`http://localhost:8000/api/post/updatepost/${id}`, data)
      .then((response) => {
        console.log(response);
        toast.info("Post has been updated");
        setChange(true);

        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  const handleupdatecomment = (e, commentId) => {
    const data = {
      commentId: commentId,
      text: textt,
    };

    axios
      .put(`http://localhost:8000/api/post/edit-comment-post/${e}`, data)
      .then((response) => {
        console.log(response);
        toast.info("comment has been updated");
        setChange(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletecomment = (e, commentId) => {
    const data = {
      commentId: commentId,
    };

    axios
      .put(`http://localhost:8000/api/post/delete-comment-post/${e}`, data)
      .then((response) => {
        console.log(response);
        toast.info("comment has been deleted");
        setChange(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "siwarse");
    axios
      .post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
      .then((result) => {
        const data = {
          posterId: user?._id,
          message: messagee.current?.value,

          img: result.data.secure_url,
          likers: [],
          comments: [],
        };

        // Send a POST request to the backend API
        axios
          .put(`http://localhost:8000/api/post/${id}`, data)
          .then((response) => {
            console.log(response);
            toast.info("Event have been updated");
            setChange(true);
            // Handle success response

            // Handle success response
          })
          .catch((error) => {
            console.error(error);
            // Handle error response
          });
      });
  };

  const handlecomment = (text, e) => {
    // Send a POST request to the backend API
    fetch(`http://localhost:8000/api/post/comment-post/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        commenterid: idCurrentUser,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        console.log(response);
        settext(text);

        setChange(true);
        // Handle success response

        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const getUser = async () => {
    const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const { profilePicture, firstName, lastName } = user;

  // if (!posts) return null;

  // const {
  // img,message
  // } = posts;

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/post/${id}`)
      .then((response) => {
        console.log("Post deleted successfully");
        toast.info("Post have been deleted");
        setChange(true);
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  const isButtonDisabled = inputValue === "";

  

  const submitHandeler = (e) => {
    setIsClosing(false);
    setIsDisabled(true);
    e.preventDefault();
  
    
    const newPost = {
      posterId: user?._id,
      message: messagee.current?.value,
      img: fileUrl,
      video: videourl,

      location,
      likers: [],
      comments: [],
    };
  
    // Send a POST request to the backend API
    axios
      .post("http://localhost:8000/api/post", newPost)
      .then((response) => {
        console.log(response);
        setChange(true);
        setShowMap(false);
        setVideoFile(null);
        setLocationEvent(null);
        setLoading(false);
        handleDeletePost();
        setFileUrl(null); // reset fileUrl to null after posting
        setvideourl(null); // reset fileUrl to null after posting
        setVideoFile(null);
        setLocationEvent(null);

        setIsSubmitting(false);
        setIsDisabled(true); // Disable the button again after the post is submitted

      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const uploadimage = () => {
    //dxououehj
    //siwarse
    //https://api.cloudinary.com/v1_1/
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "siwarse");
    axios
      .post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
      .then((result) => {

       const newPost = {
        img: result.data.secure_url
       
      }
      .then((response) => {
       setimg(newPost.img)
        
      })})};

  const likePost = (e) => {
    fetch(`http://localhost:8000/api/post/like-post/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idCurrentUser,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
    setChange(true);
  };

  const unlikePost = (e) => {
    fetch(`http://localhost:8000/api/post/unlike-post/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idCurrentUser,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
    setChange(true);
  };

  return (
    <>
      <div className="col-lg-6 order-1 order-lg-2">
        <div className="card card-small">
          <div className="share-box-inner">
            <div className="profile-thumb">
              <a href="#">
                <figure className="profile-thumb-middle">
                  <img src={profilePicture} alt="profile picture" />
                </figure>
              </a>
            </div>

            <div className="share-content-box w-100" onClick={handleShoww}>
              <form className="share-text-box">
                <InputEmoji
                  name="share"
                  className="share-text-field"
                  aria-disabled="true"
                  placeholder={"what's on your mind " + firstName + " ? "}
                  data-toggle="modal"
                  data-target="#textbox"
                  id="email"
                ></InputEmoji>
              </form>
            </div>
            {isClosing ? (  <Modal
              class="modal fade"
              id="textbox"
              aria-labelledby="textbox"
              style={{ width: "1900px", marginTop: "150px" }}
              show={showModall}
              onHide={handleCloseModal}
            >
                <Modal.Header class="modal-header" >
                  <h5 class="modal-title">confirm  your delete</h5>
                </Modal.Header>
                <Modal.Body class="modal-body custom-scroll">
            <div  style={{ margin: '15px 0' }}>
              <p   className="modal-title" style={{ marginBottom: '2px', marginTop:'30px', marginLeft:"55px",fontSize:"19px", fontfamily:"arial"}}>Are you sure you want to drop this post?</p>
              <Divider sx={{ margin: "1.2rem 0" }} />

              <button  style={{ marginBottom: '10px', marginTop:'55px', marginLeft:"100px",marginRight:"40px"}} className="buttonfooter"onClick={handleDeletePost}>delete</button>
              <button style={{ marginBottom: '10px',marginLeft:"2px" }} className="buttonfooter" onClick={() => setIsClosing(false)}>cancel</button>
            </div> </Modal.Body>
            <Modal.Footer class="modal-footer">
                     
                </Modal.Footer>
            </Modal>
          ) : (
            <Modal
              class="modal fade"
              id="textbox"
              aria-labelledby="textbox"
              style={{ width: "1900px", marginTop: "150px" }}
              show={showModall}
              onHide={handleCloseModal}
            >
              <div
                class="modal-content"
                style={{
                  height: "150%",
                  width: "150%",
                }}
              >
                <Modal.Header class="modal-header" closeButton>
                  <h5 class="modal-title">Share a Post</h5>
                </Modal.Header>
                
                <Modal.Body class="modal-body custom-scroll">
                  <div className='class="share-creation-state__member-info'>
                    <div className="profile-thumb">
                      <a href="#">
                        <figure className="profile-thumb-middle">
                          <img src={profilePicture} alt="profile picture" />
                        </figure>
                      </a>
                    </div>
                    <textarea
                      class="share-field-big custom-scroll"
                      placeholder="what do you want to discuss ?"
                      onChange={handleInputChange}
                      ref={messagee}
                    ></textarea>{" "}
                    {showMap && (
                      <div className="form-outline mb-4">
                        <MapContainer
                          center={position}
                          zoom={13}
                          scrollWheelZoom={false}
                          style={{ width: "700px", height: "300px" }}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <LeafletGeoCoder onData={handleDataFromChild} />
                        </MapContainer>
                      </div>
                    )}
                  </div>
                {fileUrl && !isDisabled &&   <img src={fileUrl} style={{marginLeft:"160px",width:"300px"}}></img> } 

                  {loading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        zIndex: "9999",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            fontfamily: "Arial",
                            textalign: "center",
                            color: "#081b3778",
                            fontsize: "100px",
                          }}
                        >
                          Loading...
                        </p>
                        <BeatLoader size={30} color="#bde2ec" />
                      </div>
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer class="modal-footer">
                  <div className="margin">
                    <div className="icon-containerr">
                      <label className="iconn-wrapper">
                        <FaPhotoVideo className="icon-bluee" />

                        <span className="label">Photo </span>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          accept=".png,.jpg,.jpeg"
                          onChange={handleImageClick}
                        />
                      </label>

                      <button
                        className="iconn-wrapperr"
                        onClick={handleButtonClick}
                        disabled={isDisabled}
                      >
                        <ImLocation className="icon-bluee" />
                        <span className="label">Localisation</span>
                      </button>

                      <label className="iconn-wrapper">
                        <ImPlay className="icon-bluee" />
                        <span className="label">video</span>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </label>

                      <button
                        onClick={submitHandeler}
                        disabled={isDisabled || isVideoUploading}
                        className="postbutton"   
                      >
                        Post
                      </button>
                    </div>{" "}
                  </div>
                </Modal.Footer>
              </div>{" "}
            </Modal>
          )}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header className="modelheader" closeButton></Modal.Header>
              <Modal.Body className="modelcontent">
                <label type="file" htmlFor="file" id="ember1142" class="input">
                  select images here
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
                </label>
              </Modal.Body>
              <Modal.Footer className="modelfooterr">
                <button className="buttonfooter" onClick={handleClose}>
                  Close
                </button>
                <button className="buttonfooter" onClick={uploadimage}>
                  upload
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <Divider sx={{ margin: "0.90rem 0" }} />

          <div>
            <div className="icon-container">
              <button className="icon-wrapper" onClick={handleShow}>
                <ImImage className="icon-blue" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Photo </strong>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </button>
              <button className="icon-wrapper" onClick={handleShow}>
                <ImStatsBars className="icon-green" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Sondage</strong>
                </span>
              </button>
              <button className="icon-wrapper" onClick={handleShow}>
                <ImLocation className="icon-orange" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Localisation</strong>
                </span>
              </button>
              <button className="icon-wrapper" onClick={handleShow}>
                <ImPlay className="icon-red" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Video</strong>
                </span>
              </button>
            </div>
          </div>
        </div>

        {Array.from(posts).map((e) => (
          <div className="card" key={e._id}>
            <div className="post-title d-flex align-items-center">
              <div className="profile-thumb">
                <a href="#">
                  <figure className="profile-thumb-middle">
                    <img
                      src={e.posterId.profilePicture}
                      alt="profile picture"
                    />
                  </figure>
                </a>
              </div>

              <div className="posted-author">
                <h6 className="author">
                  <Link to={`/profile/${e.posterId._id}`}>
                    <a href="">
                      {e.posterId.firstName} {e.posterId.lastName}
                    </a>
                  </Link>
                </h6>
                {!isupdated && e.location && (
                  <span className="date">
                    {" "}
                    à {e.location.split(" ").slice(0, 4).join(" ")}{" "}
                  </span>
                )}
                <span className="date">{moment(e.createdAt).fromNow()}</span>
              </div>

              <div className="post-settings-bar">
                <span></span>
                <span></span>
                <span></span>
                <div className="post-settings arrow-shape">
                  <ul>
                    {currentUser?._id === e.posterId._id && (
                      <li>
                        <button
                          onClick={() => {
                            setisupdated(e._id);
                          }}
                        >
                          edit post
                        </button>
                      </li>
                    )}

                    {currentUser?._id == user?._id && (
                      <li>
                        <button onClick={() => handleDelete(e._id)}>
                          delete post{" "}
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="post-content">
              {isupdated === false && <div className="post-desc">
    
{e.message.split(" ").length <= 20 ? (
  <p>{e.message}</p>
) : (
  <>
    <p>{showFullMessage ? e.message : `${e.message.split(" ").slice(0, 15).join(" ")}....`}
  <button onClick={toggleShowFullMessage} style={{color:"rgb(10, 68, 93)"}}>{showFullMessage ? "  Show less" : "Show more" }</button></p>
  </>
)}
  </div>}
              {isupdated === e._id ? (
                <div className="update-post">
                  <button
                    type="button"
                    data-mdb-ripple-color="dark"
                    onClick={() => setisupdated(false)}
                    style={{ paddingLeft: "510px" }}
                  >
                    X
                  </button>
                  <textarea
                    className="textareaaaa"
                    defaultValue={e.message}
                    onChange={(e) => setmessage(e.target?.value)}
                    multiple
                  />
                    {e.img && (
          <Swiper navigation pagination style={{ width: "500px", height: "330px", marginLeft:"20px" }}>
            <SwiperSlide>
              <img src={e.img} alt="post image"  style={{ width: "500px", height: "280px" }} />
            </SwiperSlide>
            {e.video && (
              <SwiperSlide>
                <video controls                          style={{ width: "500px", height: "300px" }}
>
                  <source src={e.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </SwiperSlide>
            )}
          </Swiper>
        )}
  {!e.img && e.video && (
          <video controls                         style={{ width: "500px", height: "300px" }}
          >
            <source src={e.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}


                  <div className="button-container">
                    <button
                      class="buttonfootere"
                      onClick={() => handleupdate(e._id)}
                    >
                      valider modification
                    </button>
                  </div>
                </div>
              ) : (
                <div className="post-content">
                  {isupdated && <p className="post-desc">{e.message}</p>}

                  {e.img && isupdated && (
                    <img src={e.img} style={{ display: "none" }} />
                  )}

                  {e.video && isupdated && (
                    <video controls style={{ width: "550px", height: "400px" }}>
                      <source src={e.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              <div className="post-thumb-gallery img-gallery">
                <div className="row no-gutters">
                  <div className="col-8">
                           
                 {e.img && !isupdated &&  (
          <Swiper  navigation pagination style={{ width: "500px", height: "330px", marginLeft:"30px" }}>
            <SwiperSlide >
            <img src={e.img}            style={{ width: "500px", height: "280px" }}
 />
            </SwiperSlide>
            {e.video && !isupdated && (
              <SwiperSlide  >
                <video
                        controls
                        style={{ width: "500px", height: "300px" }}
                      >
                        <source src={e.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
              </SwiperSlide>
            )}
          </Swiper>
        )}
  {!e.img && e.video && !isupdated && (
           <video
           controls
           style={{ width: "500px", height: "300px" }}
         >
           <source src={e.video} type="video/mp4" />
           Your browser does not support the video tag.
         </video>
        )}

                  </div>
                </div>
              </div>
            </div>
            <div className="post-meta">
              {!e.likers.includes(user?._id) ? (
                <button class="post-meta-like" style={{ color: "black" }}>
                  <i
                    class="bi bi-heart-beat"
                    style={{ color: "black" }}
                    onClick={() => {
                      likePost(e._id);
                    }}
                  ></i>
                  <span> {e.likers.length} </span>
                </button>
              ) : (
                <button class="post-meta-like" style={{ color: "red" }}>
                  <i
                    class="bi bi-heart-beat"
                    style={{ color: "red" }}
                    onClick={() => {
                      unlikePost(e._id);
                    }}
                  ></i>
                  <span> {e.likers.length} </span>
                </button>
              )}

              <ul
                className="comment-share-meta"
                onClick={() => {
                  toggleVisibility(e._id);
                }}
              >
                <li>
                  <button className="post-comment">
                    <i className="bi bi-chat-bubble"></i>
                    <span>{e.comments.length}</span>
                  </button>
                </li>
                <li>
                  <button className="post-share">
                    <i className="bi bi-share"></i>
                    <span>07</span>
                  </button>
                </li>
              </ul>
            </div>
            <Divider sx={{ margin: "0.90rem 0" }} />
            <div className="share-box-inner">
              <div className="profile-thumbb">
                <a href="#">
                  <figure className="profile-thumb-middlee">
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      className="taswira"
                    />
                  </figure>
                </a>
              </div>

              <div className="comment-containerrrrr">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    handlecomment(event.target[0].value, e._id);
                    event.target.reset();
                  }}
                >
                  <input
                    type="text"
                    placeholder="add a comment ..."
                    className="form"
                    style={{ fontsize: "50px" }}
                  />
                </form>
                {/* <InputEmoji     ></InputEmoji> */}
              </div>
              <br></br>
            </div>{" "}
            <Divider sx={{ margin: "0.90rem 0" }} />
            {isVisible === e._id && (
              <div>
                {e.comments.map((record) => {
                  return (
                    <div class="card">
                      <div class="post-title d-flex align-items-center">
                        <div class="profile-thumb">
                          <a href="#">
                            <figure class="profile-thumb-middle">
                              <img
                                src={record.commenterid.profilePicture}
                                alt="profile picture"
                              />
                            </figure>
                          </a>
                        </div>

                        <div class="posted-author">
                          <h6 class="author">
                            {record.commenterid.firstName}{" "}
                            {record.commenterid.lastName}
                          </h6>
                        </div>

                        <div class="post-settings-bar">
                          <span></span>
                          <span></span>
                          <span></span>
                          <div class="post-settings arrow-shape">
                            <ul>
                              <li>
                                {" "}
                                {currentUser?._id == record.commenterid._id && (
                                  <button
                                    onClick={() => {
                                      if (
                                        currentUser?._id ==
                                        record.commenterid._id
                                      ) {
                                        setisupdatedd(record._id);
                                      }
                                    }}
                                  >
                                    edit comment
                                  </button>
                                )}{" "}
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    deletecomment(e._id, record._id);
                                  }}
                                >
                                  delete commment
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="post-content">
                        {isupdatedd === false && (
                          <p class="post-desc">{record.text}</p>
                        )}
   {isupdatedd === record._id ? (
                          <div className="updatepostt">
                            <div class="post-content">
        
 

<button type="button" class="btnclose"   onClick={() => setisupdatedd(false)}> X
  
</button>




                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  handleupdatecomment(e._id, record._id);
                                }}
                              >
                                <input
                                  className="t"
                                  
                                  type="text"
                                  defaultValue={record.text}
                                  onChange={(event) =>
                                    settext(event.target.value)
                                  }
                                />
                                <div>
                                  <button className="button-39" type="submit">
                                    Update Comment
                                  </button>
                                </div>{" "}
                              </form>
                            </div>
                          </div>
                        ) : (
                          <div class="post-content">
                            {isupdatedd && (
                              <p class="post-desc">{record.text}</p>
                            )}
                          </div>
                        )}



                        <div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Share;
