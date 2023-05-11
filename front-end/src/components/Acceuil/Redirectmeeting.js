import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useState,useEffect } from 'react';
import {  useParams } from 'react-router-dom';
const Redirectmeeting = () => {
    const [cookies, setCookies] = useCookies(["roomID"]);
    const [idd, setIdd] = useCookies('');
    const Navigate=useNavigate();
    const idCurrentUser = window.localStorage.getItem("id");
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
    const handleLogout = () => {
        localStorage.removeItem('roomID');
        Navigate(`/HomePage/${idCurrentUser}`);
      }

      
const handlelogin=()=>{

Navigate('/stream')
}
  return (

    <>

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <div class="card" style={{ width: "800px", height: "500px", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

    <div class="post-content">
      <img src="../assets/Following-pana.png" style={{ height: "400px", margin: "auto" }} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
                      style={{ marginBottom: "10px", marginLeft: "5px" }}
                      className="del-34 "
                      onClick={handlelogin}                   >
                      Enter your room
                    </button>
        {/* {localStorage.getItem('roomID') && (
          <Link to={`/stream?roomID=${localStorage.getItem('roomID')}&role=Audience`} style={{ color: "#f44336", marginLeft: "20px", marginRight: "20px" }}>view LIVE</Link> )} */}
        <button
                      style={{ marginBottom: "10px", marginLeft: "20px" }}
                      className="del-34 "
                      onClick={handleLogout}                    >
                      go back to Home 
                    </button>
      </div>
    </div>
  </div>
</div>
                   
                                              
                                           

                                </>

    
  )
}

export default Redirectmeeting
