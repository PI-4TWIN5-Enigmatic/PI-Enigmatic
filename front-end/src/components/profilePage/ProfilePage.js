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


const ProfilePage = () => {
const id =window.localStorage.getItem("id")

  const [user,setUser]= useState(null);


  useEffect(() => {
      fetch(`http://localhost:8000/api/getuser/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUser(data);})
        .catch(error => console.error(error));
    }, [id]);







    
    // const getUser = async()=>{
    //     const response = await fetch (`http://localhost:8000/api/${_id}` , {
    //     method:"GET",

    //     });

    //     const data = await response.json();
    //     setUser(data);
    //     console.log(data);
    // };

    // useEffect(()=>{
    //     getUser();
    // },[]);

    // if(! user) return null ;



  return (
    <>

        <Navbar />
    <main >
        <div className ="main-wrapper" style={{backgroundColor:'#bcbcbc42'}}>
            <img className ="profile-banner-large bg-img" src="../assets/images/banner/profile-banner.jpg" />
            
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