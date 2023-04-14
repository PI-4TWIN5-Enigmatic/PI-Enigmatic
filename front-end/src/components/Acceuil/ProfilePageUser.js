import React from 'react'
import Navbar from '../NavbarPage/Navbar'
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
import { useSelector } from 'react-redux';
import './profilepage.css'
import { useGetUserID } from '../../hooks/useGetUserID'

const ProfilePageUser = () => {

  const [user, setUser] = useState(null);
 
  const {id} = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    fetch(`http://localhost:8000/api/getuser/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser(data);
      })
      .catch(error => console.error(error));
  }, [id]);


 



 

if(!user) return null ;


const{
  firstName,
  lastName,
  sexe,
  occupation,
  email, 
  phone,profilePicture
}=user;






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

<Navbar/>


     
            


<div class="main-wrapper pt-80"  style={{backgroundColor:'#bcbcbc42',marginTop : "30px"}}  >
  <div className='container' >
        <div className="row">
            <div class="col-lg-3 order-2 order-lg-1">
                <aside class="widget-area">
                <div class="card card-profile widget-item p-0">
                                <div class="profile-banner">
                                    <figure className="profile-banner-smal" style={{border:'none',height:'100px'}}>
                                        <a href="">
                                            <img src="../../assets/unnamed.png "alt="" style={{border:'none',height:'100px'}}/>
                                        </a>
                                        <a href="" class="profile-thumb-2">
                                            <img src={profilePicture} alt=""/>
                                        </a>
                                    </figure>
                                    <div class="profile-desc text-center">
                                        <h6  style={{fontSize:'25px',color:'black'}}>{firstName} {lastName}</h6>
                                        <p  style={{fontSize:'15px'}}>{occupation} </p>

                                        <p style={{fontSize:'16px'}}>Any one can join with but Social network us if you want </p>
                                    </div>
                                </div>
                            </div>
                  
                    <LikedPages/>
                   </aside>  </div>  


<Share/>


<div class="col-lg-3 order-3">
    <aside class="widget-area">


    <div class="card widget-item">
                                <h4 class="widget-title">Recent Notifications</h4>
                                <div class="widget-body">
                                    <ul class="like-page-list-wrapper">
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-9.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>

                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p class="list-subtitle">5 min ago</p>
                                            </div>
                                        </li>
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-35.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>
                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p class="list-subtitle">10 min ago</p>
                                            </div>
                                        </li></ul>




</div></div> 


<div class="card widget-item">
                                <h4 class="widget-title">Advertizement</h4>
                                <div class="widget-body">
                                    <div class="add-thumb">
                                        <a href="#">
                                            <img src="assets/images/banner/advertise.jpg" alt="advertisement"/>
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div class="card widget-item">
                                <h4 class="widget-title">Friends Zone</h4>
                                <div class="widget-body">
                                    <ul class="like-page-list-wrapper"/>
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-33.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>

                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Ammeya Jakson</a></h3>
                                                <p class="list-subtitle"><a href="#">10 mutual</a></p>
                                            </div>
                                            <button class="like-button">
                                                <img class="heart" src="assets/images/icons/heart.png" alt=""/>
                                                <img class="heart-color" src="assets/images/icons/heart-color.png" alt=""/>
                                            </button>
                                        </li>
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-30.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>
                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Jashon Muri</a></h3>
                                                <p class="list-subtitle"><a href="#">2 mutual</a></p>
                                            </div>
                                            <button class="like-button active">
                                                <img class="heart" src="assets/images/icons/heart.png" alt=""/>
                                                <img class="heart-color" src="assets/images/icons/heart-color.png" alt=""/>
                                            </button>
                                        </li>
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-5.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>
                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Rolin Theitar</a></h3>
                                                <p class="list-subtitle"><a href="#">drama</a></p>
                                            </div>
                                            <button class="like-button">
                                                <img class="heart" src="assets/images/icons/heart.png" alt=""/>
                                                <img class="heart-color" src="assets/images/icons/heart-color.png" alt=""/>
                                            </button>
                                        </li>
                                        <li class="unorder-list">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-29.jpg" alt="profile picture"/>
                                                    </figure>
                                                </a>
                                            </div>
                                            
                                            <div class="unorder-list-info">
                                                <h3 class="list-title"><a href="#">Active Mind</a></h3>
                                                <p class="list-subtitle"><a href="#">fitness</a></p>
                                            </div>
                                            <button class="like-button">
                                                <img class="heart" src="assets/images/icons/heart.png" alt=""/>
                                                <img class="heart-color" src="assets/images/icons/heart-color.png" alt=""/>
                                            </button>
                                        </li></div></div></aside>
                                </div>
                            </div>

       


                    </div>
               
           


  </div>
            
                              
 



 







                        

                   
                                        
                    


                   
                    
                    
                    
                    
                    
                    
                    
                    
                    
            
                    
                    
                    





    </>
  )
}

export default ProfilePageUser