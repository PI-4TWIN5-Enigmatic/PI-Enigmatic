import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'


const About =() => {

    const [user,setUser]= useState(null);
    const {id} = useParams();
//     const [userProfileImage, setUserProfileImage] = useState({});
  
  
    const getUser = async()=>{
      const response = await fetch (`http://localhost:8000/api/${id}` , {
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
                

//   setUserProfileImage(`data:${user.userPhotoExtensionType};base64, ${Buffer.from(user.profilePicture.data).toString('base64')}`);
               
  return (
    <>

    
           


    <div className="profile-menu-area bg-white">


        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-3">
                    <div className="profile-picture-box">
                        <figure className="profile-picture">
                            <a >
                                <img  src={profilePicture} alt="profile picture" width="300px" height="300px"  />
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
                                    <li><a href="friends.html">friends</a></li>
                                    <li><a href="about.html">more</a></li>
                                    <li className="d-inline-block d-md-none"><Link to={'association/cree'}>add association</Link></li> 
      
                                </ul>
                            </nav>
                            
                        </div>

                        
                    </div>
                    
                </div>




                <div className="col-lg-2 col-md-3 d-none d-md-block">
                    
                    <div className="profile-edit-panel">
                            <button  ><Link className="edit-btn" to={`http://localhost:3000/user/update/${id}`}>edit profile</Link></button>
                            <button  ><Link className="edit-btn" to={'http://localhost:3000/association/cree'}>add association</Link></button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    

    
  


    
    
    </>
  )
}

export default About