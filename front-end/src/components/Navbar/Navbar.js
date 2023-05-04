import React, { useEffect, useRef, useState } from 'react'
// import {setLogout} from "../state";
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import Conversation from '../chat/conversation';
import Messages from '../chat/messages';
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import { io } from "socket.io-client"
import About from '../profilePage/About';

import { BsFillHouseDoorFill,BsFillChatSquareDotsFill,BsBellFill } from "react-icons/bs";
import "./Navbar.css"
import picker from "emoji-picker-react";
import { BsEmojiSmileFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

import {  useLocation } from 'react-router-dom';
import { useGetUserID } from '../../hooks/useGetUserID';





const Navbar = ( props ) => {
  const location = useLocation();
  const [linkText, setLinkText] = useState('Home');
  const [isDropDown, setIsDropDown] = useState(false);
  const [isDropDownN, setIsDropDownN] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const scrollRef = useRef();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [friendUser , setFriendUser] = useState(null);
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const idCurrentUser=localStorage.getItem('id')

  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  const idd = useGetUserID();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on('newNotification', (notification) => {
      setNewNotification(notification);
    });
  }, []);
    
  useEffect(() => {
    
    // Récupération des notifications depuis l'API, en incluant les données de la relation related_donation
    fetch(`http://localhost:8000/notifications/getAllNotifications/${idd}?populate=related_donation`)
      .then(response => response.json())
      .then(data => setNotifications(data));
  });

  

 



  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }
  useEffect(()=>
  {
      const friendId = currentChat?.members.find((m)=> m !== user._id);
      const getUser = async ()=>{
          try{
          const res = await axios.get("http://127.0.0.1:8000/api/getuser/"+friendId)
          setFriendUser(res.data)
          }catch(err){
              console.log(err)
          }
      }
      getUser()

  },[currentChat]
  )





  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {

    const getConversations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/conversation/" + user?._id)
        setConversation(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getConversations()

  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/message/" + currentChat?._id);
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()

  }, [currentChat]
  );


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })

  }, [messages])




  useEffect(() => {

    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", users => {
      
    })



  }, [user]
  );



  const handleEmojiClick= (emoji , event) => {
let message = newMessage;
console.log(emoji)
message +=emoji.emoji;
setNewMessage(message)

  }




  const handleSubmitChat = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://127.0.0.1:8000/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleDropDownNotification = () => {
    setIsDropDownN(!isDropDownN);
  };

  const style = isDropDown ? { display: 'block'} : {display: 'none' };
  const styleN = isDropDownN ? { display: 'block'} : {display: 'none' };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);


  useEffect(() => {
    if (location.pathname === `/HomePage/${idCurrentUser}`) {
      setLinkText('profile');
    } else {
      setLinkText('home');
    }
  }, [location, idCurrentUser]);

  const handleClick = (event) => {
    event.preventDefault();
    if (location.pathname === `/HomePage/${idCurrentUser}`) {
      navigate(`/profile/${idCurrentUser}`);
    } else {
      navigate(`/HomePage/${idCurrentUser}`);
    }
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  const rediret = () => {
    window.localStorage.clear()
    navigate("/");
  };

  const handlehomebutton = () => {
    navigate(`/HomePage/${idCurrentUser}`)
  }
  const history = useNavigate();

  const handleNotificationClick = (related_donation) => {
    navigate(`/donation/detail/${related_donation}`);
  };


  return (
    <>
      <div className="col-md-2">
        <div className="header-top sticky bg-white d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                {cookies.access_token && (
                  <div className="header-top-navigation">
                    <nav>
                      <ul>
                        <li className="active">
                          <a
                            className="msg-trigger-btn"
                            href={`/HomePage/${idCurrentUser}`}
                            onClick={handleClick}
                          >
                            {linkText}
                          </a>
                        </li>
                        <li className="msg-trigger">
                          <a
                            className="msg-trigger-btn"
                            onClick={handleDropDown}
                          >
                            message
                          </a>

                          <div
                            className="message-dropdown "
                            style={style}
                            id="a"
                          >
                            <div className="dropdown-title">
                              <p className="recent-msg">recent message</p>
                              <div className="message-btn-group">
                                <button>New group</button>
                                <button>New Message</button>
                              </div>
                            </div>
                            <ul className="dropdown-msg-list ">
                              {conversations.map((c, index) => (
                                <div onClick={() => setCurrentChat(c)}>
                                  <Conversation
                                    key={index}
                                    conversation={c}
                                    currentUser={user}
                                  />
                                </div>
                              ))}
                            </ul>
                            <div className="msg-dropdown-footer">
                              <button>See all in messenger</button>
                              <button>Mark All as Read</button>
                            </div>
                          </div>
                        </li>
                        <li className="">
                          <a
                            className="msg-trigger-btn"
                            href={`http://localhost:3000/donnation/request/${idCurrentUser}`}
                          >
                            Donation
                          </a>
                        </li>
                        <li class="notification-trigger">
                          <a
                            className="msg-trigger-btn"
                            onClick={handleDropDownNotification}
                          >
                            <BsBellFill size={20} />
                            {notifications.length > 0 && (
                              <span className="notification-badge">
                                {notifications.length}
                              </span>
                            )}
                          </a>
                          <div
                            className="message-dropdown "
                            style={styleN}
                            id="a"
                          >
                            <div className="dropdown-title">
                              <p className="recent-msg">recent notifications</p>
                              {/* <div className="message-btn-group">
                            <button>New group</button>
                            <button>New Message</button>
                          </div> */}
                            </div>
                            {Array.isArray(notifications) &&
                            notifications.length > 0 ? (
                              <ul className="dropdown-msg-list">
                                {notifications.map((notification) => (
                                  <li
                                    className="notification-item"
                                    key={notification._id}
                                  >
                                    <div className="notification-info">
                                      <div className="notification-type">
                                        {notification.related_donation.type}
                                      </div>
                                      <div className="notification-location">
                                        {notification.related_donation.location}
                                      </div>
                                      <div className="notification-sector">
                                        {notification.related_donation.sector}
                                      </div>
                                    </div>
                                    <button
                                      className="notification-details-btn"
                                      onClick={() =>
                                        handleNotificationClick(
                                          notification._id
                                        )
                                      }
                                    >
                                      Details
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No notifications</p>
                            )}
                            {/* <div className="msg-dropdown-footer">
                          <button>See all in messenger</button>
                          <button>Mark All as Read</button>
                        </div> */}
                          </div>{" "}
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>

              <div className="col-md-2">
                <div className="brand-logo text-center">
                  <a href="index.html">
                    <img
                      src="../../assets/enigmatic.jpg"
                      alt="brand logo"
                      style={{ width: "40%" }}
                    />
                  </a>
                </div>
              </div>

              <div className="col-md-5">
                <div className="header-top-right d-flex align-items-center justify-content-end">
                  {cookies.access_token && (
                    <div className="header-top-search">
                      <form className="top-search-box">
                        <input
                          type="text"
                          placeholder="Search"
                          className="top-search-field"
                        />
                        <button className="top-search-btn">
                          <i className="flaticon-search"></i>
                        </button>
                      </form>
                    </div>
                  )}
                  <div className="col-md-5">
                    <div className="header-top-right d-flex align-items-center justify-content-end">
                      {!cookies.access_token ? (
                        <button
                          style={{ borderRadius: 30, marginBottom: 15 }}
                          className="submit-btn "
                          onClick={rediret}
                        >
                          login/signup
                        </button>
                      ) : (
                        <button
                          style={{ borderRadius: 30, marginBottom: 15 }}
                          className="submit-btn "
                          onClick={logout}
                        >
                          Log Out
                        </button>
                      )}
                    </div>
                  </div>{" "}
                </div>{" "}
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="footer-area reveal-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="footer-wrapper " style={{ height: "1px" }}>
                  <div className="footer-card position-relative ">
                    <div className="chat-output-box show">
                      <div className="live-chat-title">
                        <div className="profile-thumb active">
                          <a href="#">
                            <figure className="profile-thumb-small">
                              <img
                                src={friendUser?.profilePicture}
                                alt="profile picture"
                              />
                            </figure>
                          </a>
                        </div>

                        <div className="posted-author">
                          <h6 className="author" style={{ color: "white" }}>
                            {friendUser?.firstName} {friendUser?.lastName}
                          </h6>
                          <span className="active-pro">active now</span>
                        </div>
                        <div className="live-chat-settings ml-auto">
                          <button
                            className="close-btn"
                            data-close="chat-output-box"
                            onClick={() => setCurrentChat(null)}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      </div>
                      <div className="message-list-inner">
                        {currentChat ? (
                          <>
                            <ul
                              className="message-list custom-scroll"
                              style={{
                                overflow: "scroll",
                                marginBottom: "100px",
                              }}
                            >
                              {messages.map((m, index) => (
                                <div ref={scrollRef}>
                                  <Messages
                                    key={index}
                                    message={m}
                                    own={m.sender == user?._id}
                                  />
                                </div>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <span style={{ height: 300 }}>
                            open a conversation
                          </span>
                        )}
                        <div className="chat-text-field mob-text-box">
                          <textarea
                            className="live-chat-field custom-scroll"
                            placeholder="Text Message"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                          ></textarea>
                          <button
                            className="chat-message-send"
                            type="submit"
                            onClick={handleEmojiPickerHideShow}
                          >
                            <BsEmojiSmileFill />
                          </button>

                          <button
                            className="chat-message-send"
                            type="submit"
                            onClick={handleSubmitChat}
                          >
                            <AiOutlineSend />
                          </button>

                          <div style={{ position: "relative" }}>
                            {showEmojiPicker && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: 30,
                                  top: -379,
                                }}
                              >
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>{" "}
      </div>
    </>
  );
                      }
export default Navbar