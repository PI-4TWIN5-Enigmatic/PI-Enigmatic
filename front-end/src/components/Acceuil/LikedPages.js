import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from "react-cookie";

const LikedPages = () => {
    const [cookies, setCookies] = useCookies(["roomID"]);
   const [user,setUser]= useState(null);
    const {id} = useParams();
//     const [userProfileImage, setUserProfileImage] = useState({});
    
  
    const getUser = async()=>{
        const response = await fetch (`http://localhost:8000/api/getuser/${id}` , {
        method:"GET",
    
        });
    
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

  return (

    <>


                        <div className="card widget-item" >
                                <h4 className="widget-title">live streamers</h4>
                                <div className="widget-body">
                                    <ul className="like-page-list-wrapper">
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src={profilePicture} alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>
                                            <Link to={'/redirectmeeting'}   style={{marginLeft:"15px"}} >   Skander Zouaoui  </Link>


                                           </li></ul></div></div>
                                </>

    
  )
}

export default LikedPages