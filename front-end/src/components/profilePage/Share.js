import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Link, json, useParams } from "react-router-dom";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { Picker } from "emoji-mart";
import Updatepost from "../profilePage/Updatepost";
import LeafletGeoCoder from "../Events/LeafletGeoCoder";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { BeatLoader } from "react-spinners";
import { Divider,AvatarGroup } from "@mui/material";
import Avatar from '@material-ui/core/Avatar';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { CiTrash, CiEdit,CiVideoOn ,CiSquarePlus,  CiHeart,
} from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import UploadReel from "../UploadReel/UploadReel";


import {
  BiCommentError,
  BiInfoCircle,
  BiCheck,
  BiExit,
  BiArrowBack,
} from "react-icons/bi";


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
  ImClipboard
} from "react-icons/im";

import { Modal } from "react-bootstrap";
import "./share.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

const Share = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef("");

  const [fileUrl, setFileUrl] = useState(null);
  const Navigate=useNavigate();

  SwiperCore.use([Navigation, Pagination]);

  const [videourl, setvideourl] = useState(null);
  const idCurrentUser = window.localStorage.getItem("id");
  const [textt, settext] = useState("");


  const handlenavigate=()=>{
    Navigate("/stream")
      }

  const [cookies, _] = useCookies(["access_token"]);
  const [location, setLocationEvent] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [showModal, setShow] = useState(false);
  const [showModall, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = (e) => {
    setIsVisible(e === isVisible ? null : e);
  };  
  const [isupdatedd, setisupdatedd] = useState(false);

  const [file, setfile] = useState("");

  const messagee = useRef();
  const text = useRef();

  const [posts, setData] = useState("");
  const { idd } = useParams();

  const [img, setimage] = useState("");
  const [video, setvideo] = useState("");

  const [message, setmessage] = useState("");
  const [videoFile, setVideoFile] = useState("");
//show close modal
const [isClosing, setIsClosing] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterId, setposterid] = useState("");
  const [change, setChange] = useState(false);
  const [showModalme, setShowme] = useState(false);
  const handleCloseme = () => setShowme(false);
  const handleshowme = () => setShowme(true);


  const closesurv = () => setmodalsurv(false);
  const [modalsurv, setmodalsurv] = useState(false);
  const handlemodalsurv = () => setmodalsurv(true);
  const handleClosesurv = () => {
    setmodalsurv(false);
  };


  
  //vote
  const [showResults, setShowResults] = useState(false);

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [surveyQuestions, setsurveyquestions] = useState("");

  
  const [voted, setVoted] = useState(false);

  const [options, setOptions] = useState(["", ""]);
  const [showsur, setsurv] = useState(false);
  const questionRef = useRef(null);



  const handleOptionChange = (index, value) => {
    const newOptions = [...options]; // create a new array with the same elements as the current options array
    newOptions[index] = value; // replace the element at the specified index with the new value
    setOptions(newOptions); // update the state of the options array
  };
  const addOption = () => {
    setOptions([...options, ""]); // create a new array with the same elements as the current options array, but with an additional empty string element at the end
  };

  const handleVote = (postId, questionId, optionId) => {
    axios
      .put(`http://localhost:8000/api/post/vote/${postId}`, {
        questionId,
        optionId,
        userId: idCurrentUser,
      })
      .then((response) => {
        console.log(response);
        setChange(true);
        toast.info("Post has been updated");
        setVoted(true);
        setIsUpdated(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };




  //
  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        // Swiper options here
      });
    }
  }, []);

  //show more/less 
  const [showFullMessage, setShowFullMessage] = useState(false);

const toggleShowFullMessage = () => {
  setShowFullMessage(!showFullMessage);
};
  

//map
  const [showMap, setShowMap] = useState(false);
  const handleButtonClick = () => {
    setShowMap(!showMap); // toggle the value of showMap
  };
  function handleDataFromChild(data) {
    setLocationEvent(data);
  }

  
  function handleCloseModal() {
    
    if (isSubmitting) {
      setIsClosing(true);
      setShowMap(false)
      setmessage('')
      setLocationEvent('')

    } else {
      setShoww(false);
      setIsClosing(false);
      setLocationEvent("")
      setShowMap(false)
      setIsDisabled(true)

      setmessage('')

      
    }
  }
  
  const likeComment = (e, commentId) => {
    fetch(`http://localhost:8000/api/post/like-comment/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iduser: idCurrentUser,
        commentId: commentId,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
    setChange(true);
  };

  const dislikeComment = (e, commentId) => {
    fetch(`http://localhost:8000/api/post/dislike-comment/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iduser: idCurrentUser,
        commentId: commentId,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
    setChange(true);
  };


  function handleDeletePost() {
    setIsDisabled(true);

    setFileUrl("");
    setLoading(false);
    setLocationEvent("");

    setmessage('');
    setVideoFile('');
    setIsClosing(false);
    setIsSubmitting(false);
    // TODO: Implement logic to delete post
    setShoww(false);
  }



  useEffect(() => {
    setIsDisabled(!fileUrl || !messagee.current?.value || isImageUploading);
    setChange(true);
  }, [fileUrl, messagee, isImageUploading]);

  const position = [36.8065, 10.1815];

  let DefaultIcon = L.icon({
    iconUrl: "../assets/images/marker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

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

  setInputValue(event.target?.value);
  setIsDisabled(!videoFile && !file && !event.target?.value );
}




function handleCloseModal() {
  
  if (isSubmitting) {
    setIsClosing(true);
    setShowMap(false)
    setmessage('')
    setLocationEvent("")

  } else {
    setShoww(false);
    setIsClosing(false);
    setLocationEvent("")
    setShowMap(false)
    setIsDisabled(true)

    setmessage('')

    
  }
}

function handleDeletePost() {
  setIsDisabled(true);

  setFileUrl("");
  setLoading(false);
  setLocationEvent("");

  setmessage('');
  setVideoFile('');
  setIsClosing(false);
  setIsSubmitting(false);
  // TODO: Implement logic to delete post
  setShoww(false);
}



useEffect(() => {
  setIsDisabled(!fileUrl || !messagee.current?.value && isImageUploading);
  setChange(true);
}, [fileUrl, messagee, isImageUploading]);

//disabled button handle imagechange/video change
function handleImageClick(e) {
  setFileUrl("");
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



  const getpostbyid = async () => {
    const response = await fetch(
      `http://localhost:8000/api/post/getposts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

 
    const data = await response.json();
    setimage(data.img);
    setmessage(data.message);

    setData(data);
    console.log(data);
  };
  useEffect(() => {
    getpostbyid();
    setChange(false);
  }, [change]);

  const get = async () => {
    const response = await fetch(`http://localhost:8000/api/post/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setimage(data.img);
    setvideo(data.video);
    setmessage(data.message);
    setChange(true);

    console.log(data);
  };
  useEffect(() => {
    get();
    setChange(true);
  }, []);

  

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
            toast.info("Event have been updated"); // Handle success response

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
      .then((result) => {
        const newData = posts.map((e) => {
          if (e._id == result._id) {
            return result;
          }
          return e;
        });
        setData(newData);
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };



  const isButtonDisabled = inputValue === "";

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
        likerid: idCurrentUser,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
    setChange(true);
  };

  const submitHandelerr = (e) => {
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

    setIsSubmitting(true);

    // Send a POST request to the backend API
    axios
      .post("http://localhost:8000/api/post", newPost)

      .then((response) => {
        console.log(response);
        setChange(true);
        setShowMap(false);
        setVideoFile("");
        setLocationEvent("");
        setLoading(false);
        handleDeletePost();
        setFileUrl(null); // reset fileUrl to null after posting
        setvideourl(""); // reset fileUrl to null after posting
        setVideoFile("");
        setLocationEvent("");

        setIsSubmitting(false);
        setIsDisabled(true); // Disable the button again after the post is submitted
        setIsClosing(false);
        setmodalsurv(false);  
        setOptions (["", ""]);

      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    const newOptions = options.filter((option) => option !== "");

    const newSurveyQuestions = [
      {
        question: questionRef.current.value,
        questionerid: idCurrentUser,
        options: newOptions.map((option) => ({ optiontext: option })),
      },
    ];
    const newPost = {
      posterId: user?._id,
      message: messagee.current?.value,
      img: fileUrl,
      // pdf: pdfurl,
      video: videourl,
      location,
      likers: [],
      comments: [],
      surveyQuestions: newSurveyQuestions,
    };

    setIsSubmitting(true);

    // Send a POST request to the backend API
    axios
      .post("http://localhost:8000/api/post", newPost)

      .then((response) => {
        console.log(response);
        setChange(true);
        setShowMap(false);
        setVideoFile("");
        setLocationEvent("");
        setLoading(false);
        handleDeletePost();
        setFileUrl(null); // reset fileUrl to null after posting
        setvideourl(""); // reset fileUrl to null after posting
        setVideoFile("");
        setLocationEvent("");

        setIsSubmitting(false);
        setIsDisabled(true); // Disable the button again after the post is submitted
        setIsClosing(false);
        setmodalsurv(false);  
        setOptions (["", ""]);

      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
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
      .then((result) => console.log(result));
  };

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
            {isClosing ? (
              <Modal
                class="modal fade"
                id="textbox"
                aria-labelledby="textbox"
                style={{ width: "1500px", marginTop: "150px",marginLeft:"100px" }}
                show={showModall}
                onHide={handleCloseModal}
              >
                <Modal.Header class="modal-header">
                {/* <FcOk className="add"/> */}
                  <h5 class="modal-title"><FiCheckCircle className="add"/>confirm your delete</h5>
                </Modal.Header>
                <Modal.Body class="modal-body custom-scroll">
                  <div style={{ margin: "15px 0" }}>
                    <h6
                      style={{
                        marginBottom: "2px",
                        marginTop: "0px",
                        fontsize: "60px",
                        marginLeft:"60px"
                      }}
                    >
                      Are you sure you want to drop this post?
                    </h6>
                    <Divider sx={{ margin: "1.2rem 0" }} />

                    <button
                      style={{
                        marginBottom: "10px",
                        marginTop: "55px",
                        marginLeft: "100px",
                        marginRight: "80px",
                      }}
                      className="del-34 "
                      onClick={handleDeletePost}
                    >
                      delete
                    </button>
                    <button
                      style={{ marginBottom: "10px", marginLeft: "5px" }}
                      className="del-34 "
                      onClick={() => setIsClosing(false)}
                    >
                      cancel
                    </button>
                  </div>{" "}
                </Modal.Body>
                <Modal.Footer class="modal-footer"></Modal.Footer>
              </Modal>
          ) : (

            
             cookies.access_token && ( <Modal
                class="modal fade"
                id="textbox"
                aria-labelledby="textbox"
                style={{ width: "1200px", marginTop: "90px" }}
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
                  <Modal.Header class="modal-header" closeButton     >
                    <h5 class="modal-title">Share a Post</h5>
                  </Modal.Header>
                  <Modal.Body class="modal-body custom-scroll">
                    <div className='class="share-creation-state__member-info'>
                      <div className="profile-thumb">
                        <a href="#">
                          <figure className="profile-thumb-middle">
                            <img
                              src={currentUser?.profilePicture}
                              alt="profile picture"
                            />
                          </figure>
                        </a>
                      </div>

                      <textarea
                        className="share-field-big custom-scroll"
                        
                        placeholder="what do you want to discuss ?"
                        onChange={handleInputChange}
                        data-target="#textbox"
                        id="email"
                        ref={messagee}
                        multiple
                      ></textarea>

                      {showMap && (
                        <div className="form-outline mb-4">
                          <MapContainer
                            center={position}
                            zoom={13}
                            scrollWheelZoom={false}
                            style={{ width: "700px", height: "200px" }}
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
                    {fileUrl && !isDisabled && (  <img src={fileUrl}      style={{ marginLeft: "260px", width: "170px" }}></img> )} 
                 
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

                  <Modal.Footer
                    class="modal-footer"
                    className="d-flex justify-content-between"
                  >
                    <div >
                      <div
                        className="icon-containerr"
                        style={{ marginLeft: "300px" }}
                      >
                        <label className="iconn-wrapper"  >
                          <ImImage
                            className="icon-blue"
                            style={{ marginLeft: "20px" }}
                          />

                          <span
                            className="label"
                            style={{ fontWeight: "bold" }}
                          >
                            Photo{" "}
                          </span>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageClick}
                          />
                        </label>
                        <label className="iconn-wrapper">
                          <CiVideoOn
                            className="icon-red"
                            style={{ marginLeft: "10px" }}
                          />
                          <span
                            className="label"
                            style={{ fontWeight: "bold" }}
                          >
                            video
                          </span>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                          />
                        </label>
                      
                        
                        
      
                        <button
                          className="iconn-wrapperr"
                          onClick={handleButtonClick}
                          disabled={isDisabled}
                          style={{ marginRight: "380px" }}
                        >
                          <ImLocation
                            className="icon-orange"
                            style={{ marginLeft: "10px", marginBottom: "7px" }}
                          />
                          <span
                            className="label"
                            style={{ fontWeight: "bold", marginBottom: "5px" }}
                          >
                            Im here
                          </span>
                        </button>
                        <button
                          onClick={submitHandelerr}
                          disabled={isDisabled || isVideoUploading}
                          className="postbutton"
                        >
                          Post
                        </button>{" "}
                      </div>
                    </div>
                  </Modal.Footer>
                </div>{" "}
              </Modal>
           ) )}

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
                    multiple
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
          <Divider sx={{ margin: "0.9rem 0" ,}} />

          <div className="div" style={{marginTop:'15px'}} >
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
              <button className="icon-wrapper"  onClick={handlenavigate}>
                <CiVideoOn className="icon-green" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>direct</strong>
                </span>
              </button>
              <button className="icon-wrapper"  onClick={handlemodalsurv}  >
            
            <ImClipboard  className="icon-orange"   onClick={handlemodalsurv}
/>
            <span className="label" style={{ marginLeft: "8px" }}>
              <strong>survey</strong>
            </span>
          </button>
          <Modal
                      id="textbox"
                      aria-labelledby="textbox"
                      style={{
                        width: "500px",
                        marginTop: "40px",
                        position: "fixed",
                        top: "1%",
                        left: "35%",
                      }}
                      show={modalsurv}
                      onHide={closesurv}
                    >
                      <Modal.Header class="modal-header">
                        <h5 class="modal-title d-flex justify-content-between align-items-center">
                          <span>Create your survey</span>
                        
                        </h5>
                      </Modal.Header>
                  
                      <Modal.Body class="modal-body custom-scroll">
                        <div className="profile-thumb">
                          <a href="#">
                            <figure className="profile-thumb-middle">
                              <img
                                src={profilePicture}
                                alt="profile picture"
                              />
                            </figure>
                          </a>
                          <div style={{ margin: "15px 0" }}></div>
                          <textarea
                            style={{
                              width: "450px",
                              height: "80px",
                              fontSize: "16px",
                              borderColor: "#DDDFE0",
                            }}
                            placeholder="what do you want to discuss ?"
                            onChange={handleInputChange}
                            ref={messagee}
                          ></textarea>

                          <h6
                            className="modal-title"
                            style={{
                              marginBottom: "2px",
                              marginTop: "0px",
                              fontsize: "18px",
                              color:"#6D6E6E",

                            }}
                          >
                            {" "}
                            <p style={{marginBottom:"10px"}}>your question*</p>
                          </h6>
                          <textarea
                            style={{
                              width: "450px",
                              height: "35px",
                              fontSize: "16px",
                            }}
                            placeholder="write your question ?"
                            ref={questionRef}
                          ></textarea>

                       
                          {options.map((option, index) => (
                           
                            <div key={index}>
                               <h6
                               className="modal-title"
                               style={{
                                 marginBottom: "2px",
                                 marginTop: "0px",
                                 fontsize: "18px",
                                 color:"#6D6E6E"
                               }}
                             >
                               {" "}
                               <p style={{marginBottom:"10px"}}> set an option *</p>
                             </h6>
                              <input
                               style={{
                                width: "450px",
                                height: "35px",
                                fontSize: "16px",
                                boxsizing: "border-box",
                              }}
                              placeholder="write your option .."


                                type="text"
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(index, e.target.value)
                                }
                              />

                              
                            </div>
                          ))}


                          
                          
                          <button className="hey-39" style={{marginTop:"20px"}} onClick={addOption}>
                            <CiSquarePlus className="plusbutton"/>Add Option</button>

                          
                        </div>{" "}
                      </Modal.Body>
                      <Modal.Footer class="modal-footer">
                      <button
                      onClick={submitHandeler}
                      disabled={isDisabled}
                      className="survpost"
                    >
                      Post
                    </button>{" "}
                 
                      </Modal.Footer>
                    </Modal>

                    <UploadReel/>
            </div>
          </div>
        </div>

        {Array.from(posts).map((e) => (
          <div className="card" key={e._id}>
            <div className="post-title d-flex align-items-center">
              <div className="profile-thumb">
                <a href="#">
                  <figure className="profile-thumb-middle">
                    <img src={user?.profilePicture} alt="profile picture" />
                  </figure>
                </a>
              </div>
              <div className="posted-author">
                <h6 className="author">
                  {user.firstName} {user.lastName}
                </h6>
                {!isupdated && e.location && (
                  <span className="date">
                    {" "}
                    à {e.location.split(" ").slice(0, 4).join(" ")}{" "}
                  </span>
                )}

                <span className="date">{moment(e.createdAt).fromNow()}</span>
              </div>
              {currentUser?._id == user?._id && (
                <div className="post-settings-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                  <div className="post-settings arrow-shape">
                    <ul>                 
                    {currentUser?._id === e.posterId && (

                      <li>
                        <button
                          onClick={() => {
                         
                              setisupdated(e._id);
                            
                          }}
                        >
                          <CiEdit className="svg" />
                          edit post
                        
                        </button>
                      </li>
                    )}
                      {currentUser?._id == user?._id && (
                        <li>
                          <button onClick={() => handleDelete(e._id)}>
                            <CiTrash className="svg" /> Delete Post

                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}{" "}
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
      {isupdated === e?._id ? (
                <div className="update-post">
                  <BiArrowBack
                    type="button"
                    className="returnpost"
                    onClick={() => setisupdated(false)}
                  ></BiArrowBack>
                  <textarea
                    className="textareaaaa"
                    defaultValue={e.message}
                    onChange={(e) => setmessage(e.target?.value)}
                    multiple
                  />
                  {e.img && (
                    <Swiper
                      navigation
                      pagination
                      style={{
                        width: "500px",
                        height: "330px",
                        marginLeft: "20px",
                      }}
                    >
                      <SwiperSlide>
                        <img
                          src={e.img}
                          alt="post image"
                          style={{ width: "500px", height: "280px" }}
                        />
                      </SwiperSlide>
                      {e.video && (
                        <SwiperSlide>
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

                  {!e.img && e.video && (
                    <video controls style={{ width: "500px", height: "300px" }}>
                      <source src={e.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  <div className="button-container">
                    <button
                      class="button-399"
                      onClick={() => handleupdate(e?._id)}
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
        {e.surveyQuestions &&
  !isupdated &&
  e.surveyQuestions.map((surveyQuestion, index) => (
    <div className="surveydiv">
      <div key={index}>
        <h6 style={{ marginTop: "10px", marginLeft: "10px" }}>
          {surveyQuestion.question}
        </h6>
        <p
          style={{
            color: "#AEAEAD",
            marginTop: "15px",
            marginLeft: "10px",
          }}
        >
          {voted
            ? "You can see what people voted for."
            : "Click on an option to vote."}
        </p>

        
{voted || showResults ?  (
  // show progress bars for all options
  <ul>
    {surveyQuestion.options.map((option, i) => {
      let totalVotes = 0;
      surveyQuestion.options.forEach((option) => {
        totalVotes += option.votes;
      });
      const percentage =
        totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

      return (
        <li key={i}>
          <div className="progress-bar-container">
            <progress
              className="progress-bar"
              value={option.votes}
              max={totalVotes}
            >
              {" "}
            </progress>
            <span className="progress-value">{percentage}%</span>
          </div>
        </li>
      );
    })}
  </ul>
) : (
  // show voting options
  <ul>
    {surveyQuestion.options.map((option, i) => {
      let totalVotes = 0;
      surveyQuestion.options.forEach((option) => {
        totalVotes += option.votes;
      });
      const percentage =
        totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

      return (
        <li key={i}>
          {option.voters.includes(idCurrentUser) ? (
            <div className="progress-bar-container">
              <progress
                className="progress-bar"
                value={option.votes}
                max={totalVotes}
              >
                {" "}
              </progress>
              <span className="progress-value">{percentage}%</span>
            </div>
          ) : (
            <button
              className="butsurv-28"
              onClick={() => {
                handleVote(e._id, surveyQuestion._id, option._id);
              }}
            >
              {option.optiontext}
            </button>
          )}
        </li>
      );
    })}
  </ul>
)}
 { !showResults && (
        <button onClick={() => setShowResults(true)} style={{marginLeft:"430px",color:"#6B6C6C"}}> See Results</button>
 )}
      
      </div>
    </div>
    
  ))}  

                  </div>
                </div>
              </div>
            </div>
            <div
              className="post-meta"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {!e.likers.some(
                (liker) =>
                  liker.likerid?._id.toString() === idCurrentUser.toString()
              ) ? (
                <button
                  class="post-meta-like"
                  style={{
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "5px",
                  }}
                
                >
                  <i
                    class="bi bi-heart-beat"
                    style={{ color: "black", marginTop: "6px" }}
                    onClick={() => {
                      likePost(e._id);
                    }}
                  ></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "20px",
                      marginBottom: "2px",
                    }}
                  >
                    {e.likers.slice(0, 3).map((liker) => (
                      <AvatarGroup
                        max={3}
                        spacing="0px"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: "2px",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <Avatar
                          style={{
                            margin: 0,
                            padding: 0,
                            width: "30px",
                            height: "30px",
                          }}
                          alt="Remy Sharp"
                          src={liker.likerid?.profilePicture}
                        />
                      </AvatarGroup>
                    ))}
                    {e.likers.length > 3 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: "-8px",
                        }}
                      >
                        <AvatarGroup
                          max={3}
                          spacing="0px"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "2px",
                            width: "30px",
                            height: "30px",
                          }}
                        >
                          <Avatar
                            alt="..."
                            src="..."
                            style={{
                              margin: 0,
                              padding: 0,
                              width: "30px",
                              height: "30px",
                            }}
                          >
                            {" "}
                            +{e.likers.length - e.likers.length + 1}
                          </Avatar>
                        </AvatarGroup>
                        <span style={{ marginLeft: "4px" }}>
                          {" "}
                          and {e.likers.length - 4} other people
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ) : (
                <button
                  class="post-meta-like"
                  style={{
                    color: "red",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <i
                    class="bi bi-heart-beat"
                    style={{ color: "red", marginTop: "8px" }}
                    onClick={() => {
                      unlikePost(e._id);
                    }}
                  ></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "20px",
                      marginBottom: "2px",
                    }}
                  >
                    {e.likers.slice(0, 3).map((liker) => (
                      <AvatarGroup
                        max={3}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "-8px",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <Avatar
                          key={liker._id}
                          src={liker.likerid?.profilePicture}
                          style={{
                            margin: 0,
                            padding: 0,
                            marginLeft: "8px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </AvatarGroup>
                    ))}
                    {e.likers.length > 3 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: "-8px",
                        }}
                      >
                        <AvatarGroup
                          max={3}
                          spacing="0px"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "2px",
                            width: "30px",
                            height: "30px",
                          }}
                        >
                          <Avatar
                            alt="..."
                            src="..."
                            style={{
                              margin: 0,
                              padding: 0,
                              width: "30px",
                              height: "30px",
                            }}
                          >
                            +{e.likers.length - e.likers.length + 1}
                          </Avatar>
                        </AvatarGroup>
                        <span style={{ marginLeft: "1px" }}>
                          {" "}
                          and {e.likers.length - 4} other people
                        </span>
                      </div>
                    )}
                  </div>
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
            {cookies.access_token && (
              <div className="share-box-inner">
              <div className="profile-thumbb"  style={{ marginRight: "10px"}}>
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
                      placeholder="add a comment"
                      className="form"
                      aria-multiline="true"
                      style={{ width: "500px" }}
                    />
                  </form>
                  {/* <InputEmoji     ></InputEmoji> */}
                </div>
                <br></br>
              </div>
            )}{" "}
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
                                src={record.commenterid?.profilePicture}
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
                          <span className="date">
                            {" "}
                            {record.commenterid.occupation} -{" "}
                            {moment(record.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>

                      <div class="post-content">
                        {isupdatedd === false && (
                          <p class="post-desc">{record.text}</p>
                        )}
                        {isupdatedd === record._id ? (
                          <div className="updatepostt">
                            <div class="post-content">
                              <BiExit
                                type="button"
                                className="return"
                                onClick={() => setisupdatedd(false)}
                              ></BiExit>

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
                          <div>
                            {isupdatedd && (
                              <p class="post-desc">{record.text}</p>
                            )}
                          </div>
                        )}
                        <div></div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
  {!record.likerscomment.some(
    (commentliker) => commentliker.commentlikerid?._id.toString() === idCurrentUser.toString()
  ) ? (
    <CiHeart
    className="svgg"

      onClick={() => {
        likeComment(e?._id, record?._id);
      }}>
 
                      <div>   
                      {record.likerscomment.map((like) => (
                            <AvatarGroup
                              key={like?._id}
                              max={3}
                              spacing="0px"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "1px",
                                width: "30px",
                                height: "30px",
                                marginLeft: "5px",
                              }}
                            >
                              <Avatar
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  width: "30px",
                                  height: "30px",
                                }}
                                alt="Remy Sharp"
                                src={like.commentlikerid?.profilePicture}
                              />
                            </AvatarGroup>
                          ))}
                  </div>
</CiHeart>

  ) : (
    <FcLike
className="fclike"
    onClick={() => {
      dislikeComment(e?._id, record?._id);
    }}>

                    <div
                  
                >     {record.likerscomment.map((like) => (
                  <AvatarGroup
                    key={like?._id}
                    max={3}
                    spacing="0px"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "1px",
                      width: "30px",
                      height: "30px",
                      marginLeft: "5px",
                    }}
                  >
                    <Avatar
                      style={{
                        margin: 0,
                        padding: 0,
                        width: "30px",
                        height: "30px",
                      }}
                      alt="Remy Sharp"
                      src={like.commentlikerid?.profilePicture}
                    />
                  </AvatarGroup>
                ))}
              </div>
</FcLike>
  )}</div>
  
                          <div style={{ display: "flex", marginLeft: "400px" }}>
                            <CiTrash
                              className="commenticon"
                              onClick={() => {
                                deletecomment(e._id, record._id);
                              }}
                            ></CiTrash>{" "}
                            <CiEdit
                              className="commenticon"
                              onClick={() => {
                                if (
                                  currentUser?._id == record.commenterid._id
                                ) {
                                  setisupdatedd(record._id);
                                }
                              }}
                            ></CiEdit>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div></div>{" "}
          </div>
        ))}
      </div>
    </>
  );
};

export default Share;
