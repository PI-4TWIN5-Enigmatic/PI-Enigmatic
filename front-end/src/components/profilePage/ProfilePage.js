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
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';


const ProfilePage = () => {

  const [user,setUser]= useState(null);
  const {id} = useParams();
  const [_, setCookies] = useCookies(["access_token"]);



  const getUser = async()=>{
    const response = await fetch (`http://localhost:8000/api/getuser/${id}` , {
    method:"GET",



    });

    const data = await response.json();
    setUser(data);
    console.log(data);

    // if(data.secret){
    //     setCookies("access_token", data.secret);
    //     // Cookies.set("access_token", data.secret, { expires: 7 }); 
    // window.localStorage.setItem('id',data._id)
    // window.localStorage.setItem('token',data.secret)
    // window.localStorage.setItem('user', JSON.stringify(data));
    // }
   
};


useEffect(()=>{
    getUser();
    

},[]);





    
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