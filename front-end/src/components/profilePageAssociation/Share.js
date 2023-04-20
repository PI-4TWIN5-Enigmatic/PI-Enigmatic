import React, { useRef } from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import moment from "moment";
import InputEmoji from "react-input-emoji";

import { Divider } from "@mui/material";
import LeafletGeoCoder from "../Events/LeafletGeoCoder";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

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

import { Cookies, useCookies } from "react-cookie";

const Share = () => {
  const [association, setAssociation] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isDisabled, setIsDisabled] = useState(true);

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
  const [location, setLocationEvent] = useState("");
  const [isupdated, setisupdated] = useState(false);
  const [isupdatedd, setisupdatedd] = useState(false);


  const [cookies, _] = useCookies(["access_token"]);

  const postid = useParams();
  const idCurrentUser = window.localStorage.getItem("id");

  const [inputValue, setInputValue] = useState("");

  const [file, setfile] = useState(null);

  const messagee = useRef();

  const { idd } = useParams();
  const [textt, settext] = useState("");

  const [currentEvent, setCurrentEvent] = useState("");
  const [image, setimg] = useState("");
  const [posterId, setposterid] = useState("");
  const [iddd, setid] = useState(null);
  const [videoFile, setVideoFile] = useState([null]);
  const [message, setmessage] = useState("");
  const [posts, setData] = useState("");
  const [change, setChange] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [video, setvideo] = useState("");

  const [liked, setlikes] = useState("");

  const [showModalme, setShowme] = useState(false);
  const handleCloseme = () => setShowme(false);
  const handleshowme = () => setShowme(true);
  const [user, setUser] = useState(null);

  const [profilePicture, setprofilepicture] = useState("");
  const [firstName, setfirstname] = useState("");


  const getUser = async () => {
    const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUser(data);
    setprofilepicture(data.profilePicture);
    setfirstname(data.firstName);


    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleImageClick =()=> {
    setIsDisabled(false);
  }
  

  const getpostbyid = async () => {
    const response = await fetch(
      `http://localhost:8000/api/post/getpostsassociation/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    getpostbyid();
    setChange(false);
  }, [change]);

  const handleButtonClick = () => {
    setShowMap(!showMap); // toggle the value of showMap
  };
  function handleDataFromChild(data) {
    setLocationEvent(data);
  }

  const position = [36.8065, 10.1815];

  let DefaultIcon = L.icon({
    iconUrl: "../assets/images/marker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;


  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
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

  const submitHandeler = (e) => {
    e.preventDefault();

    const form = new FormData();

    if (videoFile && file) {
        form.append("file", videoFile);
        form.append("file", file);
      } else if (videoFile) {
        form.append("file", videoFile);
      } else if (file) {
        form.append("file", file);
      }
     
      
    form.append("upload_preset", "siwarse");
    axios
      .post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
      .then((result) => {
        const newPost = {
          posterId: association?._id,
          message: messagee.current.value,
          location,
          likers: [],
          comments: [],
        };

        // Check if video or image file was uploaded and add to newPost accordingly
        if (videoFile && file) {
          newPost.video = result.data.secure_url;
          newPost.img = result.data.secure_url;
        } else if (videoFile) {
          newPost.video = result.data.secure_url;
        } else if (file) {
          newPost.img = result.data.secure_url;
        }
        
        // Send a POST request to the backend API
        axios
          .post("http://localhost:8000/api/post", newPost)
          .then((response) => {
            console.log(response);
            setChange(true);
            setfile(null);
            setVideoFile(null);
            setLocationEvent(null);
            setShowMap(!showMap);

            // Handle success response
          })
          .catch((error) => {
            console.error(error);
            // Handle error response
          });
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

  const likePost = (e) => {
    fetch(`http://localhost:8000/api/post/like-post/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: association._id,
      }),
    })
      .then((response) => response.json())

      .then((result) => console.log(result));
      setChange(true)  

  };
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

  const unlikePost = (e) => {
    fetch(`http://localhost:8000/api/post/unlike-post/${e}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: association._id,
      }),
    })
      .then((response) => response.json())

   
        setChange(true);
      ;
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

  //comments

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

  const getAssociation = async () => {
    const response = await fetch(
      `http://localhost:8000/association/get/${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setAssociation(data);
    console.log(data);
  };
  useEffect(() => {
    getAssociation();
  }, []);

  if (!association) return null;

  const { logoPicture, name, _id } = association;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isButtonDisabled = inputValue === "";



  return (
    <>
      <div className="col-lg-6 order-1 order-lg-2">
        <div className="card card-small">
          <div className="share-box-inner">
            <div className="profile-thumb">
              <a href="#">
                <figure className="profile-thumb-middle">
                  <img src={logoPicture} alt="profile picture" />
                </figure>
              </a>
            </div>

            <div className="share-content-box w-100" onClick={handleShoww}>
              <form className="share-text-box">
                <InputEmoji
                  name="share"
                  className="share-text-field"
                  aria-disabled="true"
                  placeholder={"what's on your mind " + name + " ? "}
                  data-toggle="modal"
                  data-target="#textbox"
                  id="email"
                ></InputEmoji>
              </form>
            </div>

            {cookies.access_token && (
              <Modal
                class="modal fade"
                id="textbox"
                aria-labelledby="textbox"
                style={{ width: "1900px", marginTop: "150px" }}
                show={showModall}
                onHide={handleClosee}
              >
                <div
                  class="modal-content"
                  style={{
                    height: "150%",
                    width: "150%",
                  }}
                >
                  <Modal.Header class="modal-header" closeButton>
                    <h5 class="modal-title">Share Your Mood</h5>
                  </Modal.Header>
                  <Modal.Body class="modal-body custom-scroll">
                    <div className='class="share-creation-state__member-info'>
                      <div className="profile-thumb">
                        <a href="#">
                          <figure className="profile-thumb-middle">
                            <img src={logoPicture} alt="profile picture" />
                          </figure>
                        </a>
                      </div>

                      <textarea
                        class="share-field-big custom-scroll"
                        placeholder="what do you want to discuss ?" style={{fontSize:"18px"}}
                        onChange={handleInputChange}
                        data-target="#textbox"
                        id="email"
                        ref={messagee}
                      ></textarea>

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
                            onChange={(e) => setfile(e.target.files[0])}
                            onClick={handleImageClick}
                          />
                        </label>
                        <button
                          className="iconn-wrapper"
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
                        <button onClick={submitHandeler} class="post-share-btn">
                          upload
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
                <ImLink className="icon-orange" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Link</strong>
                </span>
              </button>
              <button className="icon-wrapper" onClick={handleShow}>
                <ImPlay className="icon-red" />
                <span className="label" style={{ marginLeft: "8px" }}>
                  <strong>Video</strong>
                </span>
              </button>
            </div>{" "}
          </div>
        </div>

        {Array.from(posts).map((e) => (
          <div className="card" key={e._id}>
            <div className="post-title d-flex align-items-center">
              <div className="profile-thumb">
                <a href="#">
                  <figure className="profile-thumb-middle">
                    <img src={association.logoPicture} alt="profile picture" />
                  </figure>
                </a>
              </div>

              <div className="posted-author">
                <h6 className="author">
                  <a href="profile.html">{association.name} </a>
                </h6>
                {!isupdated && e.location && (
                  <span className="date">
                    {" "}
                    à {e.location.split(" ").slice(0, 4).join(" ")}{" "}
                  </span>)}
                <span className="date">{moment(e.createdAt).fromNow()}</span>
              </div>

              <div className="post-settings-bar">
                <span></span>
                <span></span>
                <span></span>
                <div className="post-settings arrow-shape">
                  <ul>
                    <li>
                    <button
                          onClick={() => {
                            
                              setisupdated(e._id);
              }}
                          
                        >
                          edit post
                        </button>   
                                         </li>
                    <Modal
                      className="sharebox"
                      show={showModalme}
                      onHide={handleCloseme}
                    >
                      <Modal.Header className="modelheader2" closeButton>
                        {" "}
                      </Modal.Header>
                      <Modal.Body className="modelcontentt">
                        <div className='class="share-creation-state__member-info'>
                          <div className="profile-thumb">
                            <a href="#">
                              <figure className="profile-thumb-middle">
                                <img src={logoPicture} alt="profile picture" />
                              </figure>
                            </a>
                          </div>

                          <input
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                          />
                        </div>
                      </Modal.Body>
                    </Modal>

                    <li>
                        <li>
                          <button onClick={() => handleDelete(e._id)}>
                            delete post{" "}
                          </button>
                        </li>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>

           <div className="post-content">
              {isupdated === false && <p className="post-desc">{e.message}</p>}
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
                    onChange={(e) => setmessage(e.target.value)}
                    multiple
                  />
                  {e.img && <img src={e.img} style={{ marginLeft: "3px" }} />}
                  {e.video && (
                    <video controls style={{ width: "500px", height: "400px" }}>
                      <source src={e.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  <div className="button-container">
                    <button className="btn" onClick={() => handleupdate(e._id)}>
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
                    {e.img && (
                      <figure className="post-thumb">
                        <a className="gallery-selector">
                          {!isupdated && (
                            <img src={e.img} style={{ marginLeft: "80px" }} />
                          )}
                        </a>
                      </figure>
                    )}

                    {!isupdated && e.video && (
                      <video
                        controls
                        style={{ width: "600px", height: "400px" }}
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
              {!e.likers.includes(association._id) ? (
                <button class="post-meta-like" style={{ color: "black" }}>
                  {cookies.access_token && (
                    <i
                      class="bi bi-heart-beat"
                      style={{ color: "black" }}
                      onClick={() => {
                        likePost(e._id);
                      }}
                    ></i>
                  )}
                  {cookies.access_token && <span> {e.likers.length} </span>}
                </button>
              ) : (
                <button class="post-meta-like" style={{ color: "red" }}>
                  {cookies.access_token && (
                    <i
                      class="bi bi-heart-beat"
                      style={{ color: "red" }}
                      onClick={() => {
                        unlikePost(e._id);
                      }}
                    ></i>
                  )}
                  {cookies.access_token && <span> {e.likers.length} </span>}
                </button>
              )}

              <ul
                className="comment-share-meta"
                onClick={() => {
                  toggleVisibility(e._id);
                }}
              >
                {" "}
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
                <div className="profile-thumbb">
                  <a href="#">
                    <figure className="profile-thumb-middlee">
                      <img
                        src={currentUser.profilePicture}
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
                    />
                  </form>
                  {/* <InputEmoji     ></InputEmoji> */}
                </div>
                <br></br>
              </div>
            )}{" "}
            <Divider sx={{ margin: "0.90rem 0" }} />
            {isVisible && (
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
                          <h6 class="author">{record.commenterid?.firstName} {record.commenterid?.lastName}</h6>
                          <span class="post-time">
                            {moment(record.createdAt).fromNow()}
                          </span>
                        </div>

                        <div class="post-settings-bar">
                          <span></span>
                          <span></span>
                          <span></span>
                          <div class="post-settings arrow-shape">
                            <ul>
                              <li>
                              <button
                                    onClick={() => {
                                     
                                        setisupdatedd(record._id);
                                      
                                    }}
                                  >
                                    edit comment
                                  </button>
                              </li>
                              <li>
                              <button
                                  onClick={() => {
                                    deletecomment(e._id, record._id);
                                  }}
                                >
                                  delete commment
                                </button>                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="post-content">
                      {isupdatedd === false && (
                          <p class="post-desc">{record.text}</p>
                        )} {isupdatedd === record._id ? (
                          <div class="post-content">
                            <button
                              type="button"
                              data-mdb-ripple-color="dark"
                              onClick={() => setisupdatedd(false)}
                              style={{ paddingLeft: "510px" }}
                            >
                              X
                            </button>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                handleupdatecomment(e._id, record._id);
                              }}
                            >
                              <input
                                type="text"
                                defaultValue={record.text}
                                onChange={(event) =>
                                  settext(event.target.value)
                                }
                              />
                              <button type="submit">Update Comment</button>
                            </form>
                          </div>
                        ) : (
                          <div class="post-content">
                            {isupdatedd && (
                              <p class="post-desc">{record.text}</p>
                            )}
                          </div>
                        )}
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
