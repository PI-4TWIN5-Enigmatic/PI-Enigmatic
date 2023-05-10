import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import About from './About';

const ListeFriends = () => {
    const [coverPicture, setCoverPicture] = useState('');
    const [user,setUser]= useState(null);
    const[Friends, setFriends]= useState([]);
   
      console.log("🚀 ~ file: ProfilePage.js:22 ~ ProfilePage ~ user:", user)
      const {id}=useParams();
      console.log("🚀 ~ file: ProfilePage.js:23 ~ ProfilePage ~ id:", id)
      const token = useSelector((state) => state.token);
      const useer = JSON.parse(localStorage.getItem('user'));
      const idd = localStorage.getItem('id')
      const socket = useRef()
      const [onlineUsers, setOnlineUsers] = useState([]);
  
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
  
  
      useEffect(()=>{
        const getFriends = async () =>{
            try{
            const res = await axios.get(`http://127.0.0.1:8000/api/friends/${id}`)
            console.log(res)
            setFriends(res.data.interestedProfiles)
            }catch(err){
                console.log(err)
            }
            
            console.log(id)
        }
        getFriends()
       
        },[]
        )
        
        const friendsCount = Friends.length;
          
  
    return (
      <>
  
  
      <Navbar />
      <div class="main-wrapper pt-80"  style={{backgroundColor:'#bcbcbc42'}}  >
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
  
  
  
      
      </div>
<br></br><br></br><br></br><br></br>

      <div className="menu-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="secondary-menu-wrapper secondary-menu-2 bg-white">
                                <div className="page-title-inner">
                                    <h4 className="page-title">friends ({friendsCount})</h4>
                                </div>
                                <div className="filter-menu">
                                    <button className="active" data-filter="*">all</button>
                                    <button data-filter=".recently">recently</button>
                                    <button data-filter=".relative">relative</button>
                                    <button data-filter=".collage">collage</button>
                                    <button data-filter=".request">request</button>
                                </div>
                                <div className="post-settings-bar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div className="post-settings arrow-shape">
                                        <ul>
                                            <li><button>edit profile</button></li>
                                            <li><button>activity log</button></li>
                                            <li><button>embed adda</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


      <div className="friends-section mt-20">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="content-box friends-zone">
                                <div className="row mt--20 friends-list">
                                    <div className="col-lg-3 col-sm-6 recently request">
                                        <div className="friend-list-view">
                                        
                                        {Array.isArray(Friends) && 
                                        Friends.map((friend) => (
    <>
      <div className="profile-thumb">
        <a href="profile">
          <figure className="profile-thumb-middle">
            <img src={friend.profilePicture} alt="profile picture" />
          </figure>
        </a>
      </div>

      <div className="posted-author">
        <h6 className="author">
          <a href="profile.html">
            {friend.firstName} {friend.lastName}
          </a>
        </h6>
      </div>
    </>
  ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


      </main> 
      </div>
      
  
      
      
      </>

    )
}
export default ListeFriends