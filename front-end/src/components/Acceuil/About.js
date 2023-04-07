import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from "react-cookie";


const About =() => {
    const [cookies, setCookies] = useCookies(["access_token"]);

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
                

//   setUserProfileImage(`data:${user.userPhotoExtensionType};base64, ${Buffer.from(user.profilePicture.data).toString('base64')}`);
               
  return (
    <>

    
           




   
          

        

        <div className="main-wrapper" style={{ backgroundColor: '#bcbcbc42' }}>

        
                       
                     
                    
                </div>

                
            
       
   






    
    </>
  )
}

export default About