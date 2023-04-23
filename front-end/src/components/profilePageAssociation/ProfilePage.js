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
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import NotFound from '../NotFound'

const ProfilePage = () => {


    const [association,setAssociation]= useState(null);
    const {id} = useParams();
    const [coverPicture, setCoverPicture] = useState('');
    const [cookies, _]=useCookies(['token'])
    const idCurrentUser =window.localStorage.getItem("id");
    const [alpha,setAlpha]= useState('');

    useEffect(() => {

      fetch(`http://localhost:8000/association/get/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAssociation(data);
          if (data && data.hasOwnProperty('founder')) {
              console.log("association.founder:", data.founder);
              const alphaa = data.founder.toString() === idCurrentUser.toString();
              setAlpha(alphaa);
              console.log("🚀 ~ file: RecentNotification.js:28 ~ areIdsEqual ~ alpha:", alphaa);
          } else {
              console.log("association is null or does not have a founder property");
          }
      })
        .catch(error => console.error(error));

    }, [id , coverPicture]);


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
              axios.put(`http://localhost:8000/association/UpdateAssociation/${id}`, data  , {headers:{Authorization:cookies.access_token}},
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
      
      

  return (
    <>

        <Navbar />
        <div class="main-wrapper pt-80"  style={{backgroundColor:'#bcbcbc42'}}  >

    
      {association && association.isVerified ? (
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

          {association && (
            alpha ? (
              <label htmlFor="cover-photo-input">
                {association.coverPicture ? (
                  <img className="profile-banner-large bg-img" src={association.coverPicture} width="3000px" />
                ) : (
                  <img className="profile-banner-large bg-img" src="../../assets/unnamed.png" width="3000px" />
                )}
              </label>
            ) : (
              association.coverPicture ? (
                <img className="profile-banner-large bg-img" src={association.coverPicture} width="3000px" />
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

                          <AssociationWidget  /> 
  
                           <Memories />


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
      ) : <></>}
       
    </div>

    
    
    
    </>
  )
}

export default ProfilePage