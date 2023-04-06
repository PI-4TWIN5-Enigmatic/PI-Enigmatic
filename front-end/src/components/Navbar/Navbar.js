import React, { useEffect, useRef, useState } from 'react'
// import {setLogout} from "../state";
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import Conversation from '../chat/conversation';
import Messages from '../chat/messages';
import { AiOutlineSend,AiOutlineClose } from "react-icons/ai";
import {io} from "socket.io-client"
import About from '../profilePage/About';






const Navbar = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    const [conversations, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef();
    const [friendUser , setFriendUser] = useState(null);

    const handleDropDown = () => {
        setIsDropDown(!isDropDown);
      };

      const style = isDropDown ? { display: 'block'} : {display: 'none' };

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
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);


    useEffect(()=>{
        
        const getConversations = async () =>{
            try{
            const res = await axios.get("http://127.0.0.1:8000/conversation/"+user?._id)
            setConversation(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getConversations()
        
    },[user?._id]);

    useEffect(()=>{
        const getMessages = async () =>{
          try{  
            const res = await axios.get("http://127.0.0.1:8000/message/"+currentChat?._id);
            setMessages(res.data)
          }catch(err){
            console.log(err)
          }
        }
        getMessages()
       
    },[currentChat]
    );


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior : "smooth"})

    },[messages])




        useEffect(()=>{

            socket.current.emit("addUser", user?._id);
            socket.current.on("getUsers", users=>{
                console.log(users)
            })
          
            
           
        },[user]
        );
    
  


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




 
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
      };

      const rediret = () => {
       
        navigate("/");
      };


  return (
    <>
      <div className="header-top sticky bg-white d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="header-top-navigation">
                <nav>
                  <ul>
                    <li
                      style={{
                        textAlign: "left",
                        paddingBottom: "10px",
                        color: "rgb(220,71,52)",
                        fontWeight: "bold",
                      }}
                      className="active"
                    >
                      HOME
                    </li>
                    <li className="msg-trigger">
                      <a className="msg-trigger-btn" onClick={handleDropDown}>
                        message
                      </a>

                      <div className="message-dropdown " style={style} id="a">
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

                    <li className="notification-trigger">
                      <a className="msg-trigger-btn" href="">
                        notification
                      </a>{" "}
                    </li>
                    <li className="notification-trigger">
                      <a className="msg-trigger-btn">
                        <Link
                          to={`/profile/${window.localStorage.getItem("id")}`}
                        >
                          Profile
                        </Link>
                      </a>
                    </li>
                      </ul>
                  </nav>
              </div>
          
          </div>
          <div className="col-md-2">
                    <div className="brand-logo text-center">
                        <a href="index.html">
                            <img src="../../assets/enigmatic.jpg" alt="brand logo" style={{width:"40%"}} />
                        </a>
                    </div>
                   
                </div>

                <div className="col-md-5">
                    <div className="header-top-right d-flex align-items-center justify-content-end">
                      
                        <div className="header-top-search">
                            <form className="top-search-box">
                                <input type="text" placeholder="Search" className="top-search-field" />
                                <button className="top-search-btn"><i className="flaticon-search"></i></button>
                            </form>
                       

                        {!cookies.access_token ? (
        <button style={{borderRadius: 30,marginBottom:15}} className="submit-btn "  onClick={rediret}>login/signup</button>
        ) ||     window.localStorage.clear()
      : (
        <button style={{borderRadius: 30,marginBottom:15}} className="submit-btn "  onClick={logout}>Log Out</button>
        )}


                
             </div></div>  </div>  </div></div>  </div>                                 
                 
                  
    <div className ="footer-area reveal-footer">
        <div className ="container-fluid">
            <div className ="row">
                <div className ="col-12">
                    <div className ="footer-wrapper " style={{ height: "1px" }}>
                        <div className="footer-card position-relative ">
                              
                              <div className ="chat-output-box show">
                                 <div className ="live-chat-title">
                                
                                     <div className ="profile-thumb active">
                                         <a href="#">
                                             <figure className ="profile-thumb-small">
                                                 <img src={friendUser?.profilePicture} alt="profile picture"/>
                                             </figure>
                                         </a>
                                     </div>
                                   
                                     <div className ="posted-author">
                                         <h6 className ="author" style={{color:'white'}}>{friendUser?.firstName} {friendUser?.lastName}</h6>
                                         <span className ="active-pro">active now</span>
                                     </div>
                                     <div className ="live-chat-settings ml-auto">
                                       
                                         <button className ="close-btn" data-close="chat-output-box" onClick={()=> setCurrentChat(null)}><AiOutlineClose/></button>
                                     </div>
                                 </div>
                                 <div className ="message-list-inner">

                                    {
                                        currentChat ?
                                    <>
                                     <ul className ="message-list custom-scroll" style={{overflow: "scroll" , marginBottom:"100px"}}>
                                    {messages.map((m,index)=>(
                                        <div ref={scrollRef}> 
                                              <Messages key={index} message={m} own={m.sender == user?._id}/>
                                        </div>
                                    ))}
                                   
                                         
                                     </ul>
                                     </> : <span style={{height: 300}} >open a conversation</span>}
                                     <div className="chat-text-field mob-text-box">
                                    <textarea className="live-chat-field custom-scroll" placeholder="Text Message" onChange={(e)=> setNewMessage(e.target.value)} value={newMessage} ></textarea>
                                    <button className="chat-message-send" type="submit"  onClick={handleSubmitChat}>
                                    <AiOutlineSend/>
                                    </button>
                                </div>
                              </div>
                             </div>
                            
                         
                        </div>

                        


                    </div>

                </div>
                
              </div>{" "}
            </div>
          </div>{" "}
        
      

      
    </>
  );
                      }
export default Navbar