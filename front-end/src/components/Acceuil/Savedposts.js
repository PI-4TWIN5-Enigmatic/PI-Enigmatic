import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import About from "./About";
import UserWidget from "./UserWidget";
import Share from "./Share";
import Memories from "./Memories";
import LikedPages from "./LikedPages";
import RecentNotifications from "./RecentNotifications";
import Advertissement from "./Advertissement";
import Friends from "./Friends";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import NotFound from "../NotFound";
import { io } from "socket.io-client";
import Avatar from "@material-ui/core/Avatar";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { BiShow } from "react-icons/bi";
import { Link} from "react-router-dom";
import moment from "moment";
import {  AvatarGroup } from "@mui/material";
import {
  CiTrash,
  CiEdit,
  CiVideoOn,
  CiWarning,
  CiHeart,
  CiImport,
  
} from "react-icons/ci";
const Savedposts = () => {
  const [coverPicture, setCoverPicture] = useState("");
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false);

  console.log("🚀 ~ file: ProfilePage.js:22 ~ ProfilePage ~ user:", user);
  const { id } = useParams();
  console.log("🚀 ~ file: ProfilePage.js:23 ~ ProfilePage ~ id:", id);
  const token = useSelector((state) => state.token);
  const useer = JSON.parse(localStorage.getItem("user"));
  const idd = localStorage.getItem("id");
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [cookies, _] = useCookies(["token"]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [posts, setData] = useState("");
  const idCurrentUser = window.localStorage.getItem("id");
  const [selectedPost, setSelectedPost] = useState(null);
  const getpostbyid = async () => {
    const response = await fetch(
      `http://localhost:8000/api/post/saved/${idCurrentUser}`,
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
    setChange(true);
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

  const handlePhotoSelection = (event) => {
    const selectedFile = event.target.files[0];
    setCoverPicture(selectedFile);
    const dataimg = new FormData();

    dataimg.append("file", selectedFile);
    dataimg.append("upload_preset", "enigmatic");
    dataimg.append("cloud_name", "dtisuumvj");
    axios
      .post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload", dataimg)
      .then((result) => {
        console.log(result.data.secure_url);
        setCoverPicture(result.data.secure_url);
        const data = {
          coverPicture: result.data.secure_url,
        };
        console.log("data:", data);
        axios
          .put(`http://localhost:8000/api/updateUser/${useer._id}`, data, {
            headers: { Authorization: cookies.access_token },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  //usavepost
  const handleusave = (e) => {
    axios
      .put(`http://localhost:8000/api/post/unsave-post/${e}`)
      .then((response) => {
        console.log(response);
        setChange(true);
        toast.info("post has been usaved");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const condition = idd === id;
  console.log(
    "🚀 ~ file: ProfilePage.js:86 ~ ProfilePage ~ condition:",
    condition
  );

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

  return (
    <>
      <div
        class="main-wrapper pt-80"
        style={{ backgroundColor: "#bcbcbc42", marginTop: "30px" }}
      >
        <Navbar></Navbar>

        <main>
          <div class="main-wrapper">
            <div className="container">
              <input
                type="file"
                id="cover-photo-input"
                accept="image/*"
                multiple
                onChange={handlePhotoSelection}
                style={{ display: "none" }}
              />

              {user &&
                (condition ? (
                  <label htmlFor="cover-photo-input">
                    {user.coverPicture ? (
                      <img
                        className="profile-banner-large bg-img"
                        src={user.coverPicture}
                        width="3000px"
                      />
                    ) : (
                      <img
                        className="profile-banner-large bg-img"
                        src="../../assets/unnamed.png"
                        width="3000px"
                      />
                    )}
                  </label>
                ) : user.coverPicture ? (
                  <img
                    className="profile-banner-large bg-img"
                    src={user.coverPicture}
                    width="3000px"
                  />
                ) : (
                  <img
                    className="profile-banner-large bg-img"
                    src="../../assets/unnamed.png"
                    width="3000px"
                  />
                ))}
            </div>

            <div class="profile-menu-area secondary-navigation-style bg-white">
              <div class="container" style={{ marginTop: "-20px" }}>
                <div class="row align-items-center">
                  <div class="col-lg-3 col-md-3">
                    <div class="profile-picture-box">
                      <figure
                        class="profile-picture"
                        style={{ marginBottom: "4px" }}
                      >
                        <a href="profile.html">
                          <img
                            src={currentUser.profilePicture}
                            style={{ width: "280px" }}
                            alt="profile picture"
                          />
                        </a>
                      </figure>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 offset-lg-1">
                    <div class="profile-menu-wrapper">
                      <div class="main-menu-inner header-top-navigation"></div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-3 d-none d-md-block">
                    <div class="profile-edit-panel"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="menu-secondary">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="secondary-menu-wrapper secondary-menu-2 bg-white">
                      <div class="page-title-inner">
                        <h4
                          class="page-title"
                          style={{
                            marginLeft: "50px",
                            fontSize: "20px",
                            marginTop: "10px",
                          }}
                        >
                        Saved posts
                        </h4>
                      </div>

                      <div class="filter-menu">
                        <button
                          class="page-title"
                          style={{ fontSize: "20px", color: "black" }}
                        >
                          all
                        </button>
                      </div>
                      <div class="post-settings-bar">
                        <span></span>
                        <span></span>
                        <span></span>
                        <div class="post-settings arrow-shape">
                          <ul>
                            <li>
                              <button>edit profile</button>
                            </li>
                            <li>
                              <button>activity log</button>
                            </li>
                            <li>
                              <button>embed adda</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="photo-section mt-20" style={{ marginTop: "80px" }}>
              <div class="container" style={{ height: "500px" }}>
                <div class="row">
                  <div class="col-12">
                    {Array.from(posts).map((e) => (
                      <div class="content-box" key={e._id}>
                        <div class="content-body" style={{ height: "200px" }}>
                        <div class="post-settings-bar"  style={{marginLeft:"1200px"}} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <div class="post-settings arrow-shape">
                          <ul>
                            <li>
                            <button 
  onClick={() => {
  setSelectedPost(e);
  }}
> <BiShow className="svgg" /> 
  view post
</button>

                            </li>
                            
                          </ul>
                        </div>
                      </div>
                          <div class="row mt--30">

                            



                          <Modal   style={{
                width: "500px",
                marginTop: "150px",
                position: "fixed",
                top: "1%",
                left: "35%",
              }}
              show={selectedPost !== null} onHide={() => setSelectedPost(null)}>
  <Modal.Header class="modal-header"  closeButton>
  </Modal.Header>
  <Modal.Body class="modal-body custom-scroll" style={{ width: '1000px !important' }}>
  <div className="card" style={{width:'450px'}} >
            <div className="post-title d-flex align-items-center">
              <div className="profile-thumb">
                <a href="#">
                  <figure className="profile-thumb-middle">
                    <img
                      src={selectedPost?.posterId.profilePicture}

                      alt="profile picture"
                    />
                  </figure>
                </a>
              </div>
              <div className="posted-author">
                <h6 className="author" style={{marginBottom:'28px'}}>
                  <Link to={`/profile/${e.posterId._id}`} >
                    <a href="">
                    {selectedPost?.posterId.firstName} {selectedPost?.posterId.lastName}
                    </a>
                  </Link>
                  { e.location && (
                  <span className="date">
                    {" "}
                    at {selectedPost?.location.split(" ").slice(0, 4).join(" ")}{" "}
                  </span>
                )}
                <span className="date" style={{marginTop:"9px"}}>{moment(selectedPost?.createdAt).fromNow()}</span>
                </h6></div>
              </div>

              <h6>{selectedPost?.message.split(/[.]/)[0]}</h6>
    <img src={selectedPost?.img} alt={selectedPost?.message} />
    <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "3px",
                      marginTop: "10px",
                    }}
                  >
 <i
                    class="bi bi-heart-beat"
                    style={{ color: "red", marginTop: "6px", fontSize:"20px",marginRight:"10px"}}
                   
                  ></i>    {selectedPost?.likers.slice(0, 3).map((liker) => (
      
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
                          src={liker.likerid.profilePicture}
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
                            +{selectedPost?.likers.length - selectedPost?.likers.length + 1} 
                          </Avatar>
                        </AvatarGroup>
                        <span style={{ marginLeft: "4px" }}>
                          {" "}
                          and {selectedPost?.likers.length - 4} other people
                        </span>
                        
                      </div>
                    )}
                     <button className="post-comment" style={{marginLeft:"250px", color:"black"}} >
                    <i className="bi bi-chat-bubble"></i>
                    <span>{selectedPost?.comments.length}</span>
                  </button>
</div></div>
  </Modal.Body>
  <Modal.Footer class="modal-footer" >
   
  </Modal.Footer>
</Modal>




                             



                            <div class="col-12">
                              <div>
                                <h6
                                  style={{
                                    marginLeft: "310px",
                                    fontSize: "20px",
                                    cursor: "pointer", // add cursor pointer to indicate it's clickable
                                  }}
                                >
                                  {e.message.split(/[.]/)[0]}.{" "}
                                </h6>

                                <p
                                  style={{
                                    marginLeft: "310px",
                                    fontSize: "18px",
                                    color: "#646363",
                                  }}
                                >
                                  Publication • Enregistred in Saved posts
                                </p>
                                <div
                                  style={{
                                    marginLeft: "310px",
                                    fontSize: "18px",
                                    color: "#646363",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <Avatar
                                      style={{
                                        margin: 0,
                                        padding: 0,
                                        width: "35px",
                                        height: "30px",
                                      }}
                                      alt="Remy Sharp"
                                      src={e.posterId.profilePicture}
                                    />
                                    <span
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "18px",
                                        color: "#646363",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      posted by {e.posterId.firstName}
                                    </span>
                                    <span
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "18px",
                                        color: "#646363",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {e.posterId.lastName} in his profile
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      handleusave(e._id);
                                    }}
                                    style={{
                                      marginTop: "50px",

                                      fontSize: "18px",
                                      fontfamily: "arial",
                                      fontWeight: "bold",

                                      width: "450px",
                                    }}
                                    className="enregister"
                                  >
                                    Cancel registration
                                  </button>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row mt--30 photo-filter">
                            <div class="col-sm-6 col-md-4 timeline upload folder">
                              <div class="photo-group active">
                                <div class="gallery-toggle">
                                  <img
                                    src={e.img}
                                    style={{
                                      height: "170px",
                                      marginTop: "-300px",
                                      borderRadius: "12px",
                                    }}
                                  ></img>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="main-wrapper pt-80"
            style={{ backgroundColor: "#F0EDED", marginTop: "30px" }}
          />
        </main>
      </div>
    </>
  );
};

export default Savedposts;
