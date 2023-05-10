import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

const Redirectmeeting = () => {
    const [cookies, setCookies] = useCookies(["roomID"]);
    const Navigate=useNavigate();
    const idCurrentUser = window.localStorage.getItem("id");

const handlelogout=()=>{
    setCookies("roomID", "");
Navigate(`/HomePage/${idCurrentUser}`)
}


const handlelogin=()=>{

Navigate('/stream')
}
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
                                                        <img src="../assets/images/profile/profile-small-33.jpg" alt="profile picture" />
                                                        
                                                    </figure>
                                                </a>
                                            </div>
                                            <button onClick={handlelogin}>loginn</button>
                                            <Link to={`/stream?roomID=${cookies.roomID}&role=Audience`}   style={{marginLeft:"15px"}} >   lol </Link>

<button onClick={handlelogout}>logout</button>
                                           </li></ul></div></div>
                                </>

    
  )
}

export default Redirectmeeting