import React from 'react'
import Navbar from '../Navbar/Navbar'
import About from './About'
import UserWidget from './UserWidget'
import Share from './Share'
import Memories from './Memories'
import LikedPages from './LikedPages'
import RecentNotifications from './RecentNotifications'
import Advertissement from './Advertissement'
import Friends from './Friends'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserID } from '../../hooks/useGetUserID'
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useSelector } from 'react-redux';


const ProfilePage = () => {
  const [coverPicture, setCoverPicture] = useState('');
  const [user,setUser]= useState(null);
    console.log("🚀 ~ file: ProfilePage.js:22 ~ ProfilePage ~ user:", user)
    const {id}=useParams();
    console.log("🚀 ~ file: ProfilePage.js:23 ~ ProfilePage ~ id:", id)
    const token = useSelector((state) => state.token);
    const useer = JSON.parse(localStorage.getItem('user'));
    const idd = localStorage.getItem('id')


    const [cookies, _]=useCookies(['token'])

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
},[id , coverPicture]);


  
const handlePhotoSelection = (event) => {
  const selectedFile = event.target.files[0];
  setCoverPicture(selectedFile);
  const dataimg = new FormData()

    dataimg.append("file",selectedFile)
    dataimg.append("upload_preset","enigmatic")
    dataimg.append("cloud_name","dtisuumvj")
    axios.post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",dataimg)
    .then((result)=> {
      console.log(result.data.secure_url)
      setCoverPicture(result.data.secure_url)
    const data = {
      coverPicture:result.data.secure_url,
        };
        console.log("data:", data)
        axios.put(`http://localhost:8000/api/updateUser/${useer._id}`, data  , {headers:{Authorization:cookies.access_token}},
        )
        .then(response => {
            console.log(response);

        })
        .catch(error => {
            console.error(error);
        });
        }

        )

    ;}


    const condition= idd===id;
    console.log("🚀 ~ file: ProfilePage.js:86 ~ ProfilePage ~ condition:", condition)


   
        

  return (
    <>

    <Navbar />
    <main >

                <div className ="container">
                <input
                type="file"
                id="cover-photo-input"
                accept="image/*"
                multiple
                onChange={handlePhotoSelection  }
                style={{ display: 'none' }}
              />

                {user && (
                  condition ? (
                    <label htmlFor="cover-photo-input">
                      {user.coverPicture ? (
                        <img className="profile-banner-large bg-img" src={user.coverPicture} width="3000px" />
                      ) : (
                        <img className="profile-banner-large bg-img" src="../../assets/unnamed.png" width="3000px" />
                      )}
                    </label>
                  ) : (
                    user.coverPicture ? (
                      <img className="profile-banner-large bg-img" src={user.coverPicture} width="3000px" />
                    ) : (
                      <img className="profile-banner-large bg-img" src="../../assets/unnamed.png" width="3000px" />
                    )
                  )
                )}
              

                              
              
                  <About />



        <div className ="container">
                <div className ="row">
                    <div className ="col-lg-3 order-2 order-lg-1">
                        <aside className ="widget-area profile-sidebar">

                                <UserWidget  /> 
        
                                 <Memories />

                                 <LikedPages />

                         </aside>

        
                     </div>


     
                     <div className ="col-lg-3 order-3">
                        <aside className ="widget-area">
        
                              <RecentNotifications />
                              <Advertissement />
                              <Friends />
                            
                        </aside>
                    </div>

                    <Share />
                </div>

    
        </div>
    
    </div>
    </main>
    

    
    
    </>
  )
}

export default ProfilePage