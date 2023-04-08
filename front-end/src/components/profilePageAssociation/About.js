import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';


const About =() => {

    const [association,setAssociation]= useState(null);
    const {id} = useParams();
  
  
    const getAssociation = async()=>{
      const response = await fetch (`http://localhost:8000/association/get/${id}` , {
      method:"GET",
  
      });
  
      const data = await response.json();
      setAssociation(data);
      console.log(data);
  };

  useEffect(()=>{
    getAssociation();
},[]);

if(!association) return null ;
  

                const{
                    logoPicture
                }=association;
                
             
               
  return (
    <>

    
           


    <div className="profile-menu-area bg-white">


        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-3">
                    <div className="profile-picture-box">
                        <figure className="profile-picture">
                            <a >
                                <img  src={logoPicture} alt="profile picture" width="300px" height="300px"  />
                            </a>
                        </figure>
                    </div>
                </div>

                


                <div className="col-lg-6 col-md-6 offset-lg-1">
                    <div className="profile-menu-wrapper">
                        <div className="main-menu-inner header-top-navigation">
                            <nav>
                                <ul className="main-menu">
                                    <li className="active"><a href="#">timeline</a></li>
                                    <li><a href="about.html">about</a></li>
                                    <li><a href="photos.html">photos</a></li>
                                    <li> <Link to={`/EventDisplay/${id}`}>Events</Link>  </li>
                                    <li><a href="about.html">more</a></li>
      
                                </ul>
                            </nav>
                            
                        </div>

                        
                    </div>
                    
                </div>




               
            </div>
        </div>
    </div>
    

    
  


    
    
    </>
  )
}

export default About