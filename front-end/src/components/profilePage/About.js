import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from "react-cookie";
import {BiMessageAdd} from "react-icons/bi"




const About =() => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [user,setUser]= useState(null);
    const { id } =useParams()
    const [following, setFollowing] = useState(false);

//     const [userProfileImage, setUserProfileImage] = useState({});
  
  
    const getUser = async()=>{
      const response = await fetch(
        `http://localhost:8000/api/getuser/${id}`,
        {
          method: "GET",
        }
      );
  
      const data = await response.json();
      setUser(data);
      console.log(data);
  };

  useEffect(()=>{
    getUser();
},[]);

if(!user) return null ;
                const{
                    profilePicture
                }=user;
                

//   setUserProfileImage(`data:${user.userPhotoExtensionType};base64, ${Buffer.from(user.profilePicture.data).toString('base64')}`);
           
    
const handleClick = async (user) => {
  const conversation = {
    senderId: user._id,
    receiverId: id,
    
  };
  try {
     await axios.post(
      "http://127.0.0.1:8000/conversation",conversation
    );
    console.log(conversation)
  } catch (err) {
    console.log(err);
  }
};

const handleFollow = async () => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/users/${currentUser._id}/follow`, {
      targetUserId: user._id
    });
    setFollowing(true);
    console.log(res.data.message);
  } catch (err) {
    console.error(err);
  }
};


const handleUnfollow = async () => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/users/${currentUser._id}/unfollow`, {
      targetUserId: user._id
    });
    setFollowing(false);
    console.log(res.data.message);
  } catch (err) {
    console.error(err);
  }
};
    

  return (
    <>
      <div className="profile-menu-area bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3">
              <div className="profile-picture-box">
                <figure className="profile-picture">
                  <a>
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      width="300px"
                      height="300px"
                    />
                  </a>
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 offset-lg-1">
              <div className="profile-menu-wrapper">
                <div className="main-menu-inner header-top-navigation">
                  <nav>
                    <ul className="main-menu">
                     
                      <li>
                        <a href="about.html">about</a>
                      </li>
                     
                      <li>
                        <a href="friends.html">friends</a>
                      </li>
                      <li>
                        <Link
                          to={`http://localhost:3000/donnation/request/${window.localStorage.getItem(
                            "id"
                          )}`}
                        >
                          donnation
                        </Link>
                      </li>
                      <li>
                      {currentUser._id === id ? null : (
       <div>
                      {following  ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
      </div>)}
                      </li>
                      {currentUser._id === id ? null : (
                      <li>
                     <button onClick={() => handleClick(currentUser)}> New conversation <BiMessageAdd/></button>
                      </li>)}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 d-none d-md-block">
              <div className="profile-edit-panel">
               
                {cookies.access_token && (
                  <button>
                    <Link
                      className="edit-btn"
                      to={"http://localhost:3000/association/cree"}
                    >
                      add association
                    </Link>
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About