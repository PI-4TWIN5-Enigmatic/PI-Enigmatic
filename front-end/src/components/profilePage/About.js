import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from "react-cookie";
import {BiMessageAdd} from "react-icons/bi"
import { Button } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { toast } from 'react-toastify';





const About =() => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [user,setUser]= useState(null);
    const { id } =useParams()
    const [following, setFollowing] = useState(false);
    const [followingCount, setFollowingCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false );
  const handleShow1 = () => setShow1(true);
  const handleNavig = (id) =>   {
    
  }
 

//     const [userProfileImage, setUserProfileImage] = useState({});
  
  
    const getUser = async()=>{
      const response = await fetch(
        `http://localhost:8000/api/getuser/${id}`,
        {
          method: "GET",
        }
      );
  
      const data = await response.json();
      setUser(data);
      console.log(data);
      setFollowing(data.followedProfil.includes(currentUser?._id));
      setFollowingCount(data.followingProfil.length);
      setFollowersCount(data.followedProfil.length);
  
      console.log(followersList)

  };

   const getFollowersList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${id}/followedProfiles`);
      setFollowersList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

   const getFollowingList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${id}/followingProfiles`);
      setFollowingList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

 
       
        
     
  useEffect(()=>{
    getUser();
        getFollowersList();
    getFollowingList();
},[following,id]);

if(!user) return null ;
                const{
                    profilePicture
                }=user;
                

//   setUserProfileImage(`data:${user.userPhotoExtensionType};base64, ${Buffer.from(user.profilePicture.data).toString('base64')}`);
           
    
const handleClick = async (user) => {
  const conversation = {
    senderId: user?._id,
    receiverId: id,
    
  };
 
      axios.post(
      "http://127.0.0.1:8000/conversation",conversation
    )
    .then((response) => {
      console.log(response.data)
    
      toast.info(response.data);

})

   
 
};

const handleFollow = async () => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/users/${currentUser._id}/follow`, {
      targetUserId: user?._id
    }).then((response) => {
      console.log(response.data)
    
      toast.info(response.data);

});
    setFollowing(true);
    console.log(res.data.message);
  } catch (err) {
    console.error(err);
  }
};


const handleUnfollow = async () => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/users/${currentUser._id}/unfollow`, {
      targetUserId: user?._id
    })
    .then((response) => {
      console.log(response.data)
    
      toast.info(response.data);

});
    setFollowing(false);
    console.log(res.data.message);
  } catch (err) {
    console.error(err);
  }
};
    

  return (
    <>
      <div className="profile-menu-area bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3">
              <div className="profile-picture-box">
                <figure className="profile-picture">
                  <a>
                    <img
                      src={profilePicture}
                      alt="profile picture"
                      width="300px"
                      height="300px"
                    />
                  </a>
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 offset-lg-1">
              <div className="profile-menu-wrapper">
                <div className="main-menu-inner header-top-navigation">
                  <nav>
                    <ul className="main-menu">
                     
                      <li>
                        <a href="about.html">about</a>
                      </li>
                     
                      <li>
                        <a href="friends.html">friends</a>
                      </li>
                      <li>
                        <Link
                          to={`http://localhost:3000/donnation/request/${window.localStorage.getItem(
                            "id"
                          )}`}
                        >
                          donnation
                        </Link>
                      </li>
                      <li>
                      <Button onClick={handleShow1}  variant="danger">
      Following Profile
       <Badge bg="dark">{followingCount}</Badge>
     
    </Button>
                      </li>
                      <li>
                      <Button variant="danger" onClick={handleShow} >
      Followed Profile <Badge bg="dark">{followersCount}</Badge>
     
    </Button>
                      </li>
                      <li>
                      {currentUser?._id === id ? null : (
       <div>
                      {following  ? (
        <Button variant="outline-danger"  onClick={handleUnfollow}>Unfollow</Button>
      ) : (
        <Button variant="outline-success" onClick={handleFollow}>Follow</Button>
      )}
      </div>)}
                      </li>
                      {currentUser?._id === id ? null : (
                      <li>
                     <button onClick={() => handleClick(currentUser)}> New conversation <BiMessageAdd/></button>
                      </li>)}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 d-none d-md-block">
              <div className="profile-edit-panel">
               
                {cookies.access_token && (
                  <button>
                    <Link
                      className="edit-btn"
                      to={"http://localhost:3000/association/cree"}
                    >
                      add association
                    </Link>
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Followed Profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="dropdown-msg-list ">
        {followersList.map((following) => (
           <Link to={`/profile/${following._id}`}  >
                      <div  key={following._id} onClick={handleClose}>

            <li className="msg-list-item d-flex flex-container">
            <Image roundedCircle src={following.profilePicture} alt="profile" width="50"/>
            <h5 style={{marginLeft:'10px'}}> {following.firstName} {following.lastName}</h5>
            </li>
            </div>
            </Link>
            ))}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>




        <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Following Profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="dropdown-msg-list ">
        {followingList.map((following) => (
          <Link to={`/profile/${following._id}`}  >
          <div key={following._id}  onClick={handleClose1}>
           
                 <li className="msg-list-item d-flex flex-container">
            <Image roundedCircle src={following.profilePicture} alt="profile" width="50"/>
            <h5 style={{marginLeft:'10px'}}> {following.firstName} {following.lastName}</h5>
            </li>
            </div>
            </Link>))}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default About