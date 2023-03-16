import React from 'react'
import Navbar from '../Navbar/Navbar'
import About from './About'
import AssociationWidget from './AssociationWidget'
import Share from './Share'
import Memories from '../profilePage/Memories'
import LikedPages from '../profilePage/LikedPages'
import RecentNotifications from './RecentNotification'
import Advertissement from '../profilePage/Advertissement'
import Friends from '../profilePage/Friends'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const ProfilePage = () => {


    const [association,setAssociation]= useState(null);
    const {id} = useParams();
 

    useEffect(() => {
        fetch(`http://localhost:8000/association/get/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setAssociation(data);})
          .catch(error => console.error(error));
      }, [id]);



  return (
    <>

        <Navbar />
    <main >
        <div className ="main-wrapper">
            <img className ="profile-banner-large bg-img" src="../assets/images/banner/profile-banner.jpg" />
            
        <About />


        <div className ="container">
                <div className ="row">
                    <div className ="col-lg-3 order-2 order-lg-1">
                        <aside className ="widget-area profile-sidebar">

                                <AssociationWidget  /> 
        
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