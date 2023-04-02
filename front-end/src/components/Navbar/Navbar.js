import React from 'react'
// import {setLogout} from "../state";
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))

 
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
      };

      const rediret = () => {
       
        navigate("/");
      };


  return (
    


        <div className="header-top sticky bg-white d-none d-lg-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-5">
                                            <div className="header-top-navigation">
                                                <nav>
                                                    <ul>
                                                        <li className="active">home</li>
                                                        <li className="msg-trigger"><a className="msg-trigger-btn" href="">message</a></li>
                                                        <li className="notification-trigger"><a className="msg-trigger-btn" href="">notification</a> </li>
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
                        </div>
   <div className="col-md-5">
                    <div className="header-top-right d-flex align-items-center justify-content-end">
                      
                       
                        {!cookies.access_token ? (
        <button style={{borderRadius: 30,marginBottom:15}} className="submit-btn "  onClick={rediret}>login/signup</button>
        ) ||     window.localStorage.clear()
      : (
        <button style={{borderRadius: 30,marginBottom:15}} className="submit-btn "  onClick={logout}>Log Out</button>
        )}


                
             </div></div>  </div>  </div></div>  </div>                                 
                  </div>);};
                                                    


            
        



    
    
    
    
 
export default Navbar