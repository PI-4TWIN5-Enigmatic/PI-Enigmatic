import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { Badge, Button, Image, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


const About =() => {

    const [association,setAssociation]= useState(null);
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [followersCount, setFollowersCount] = useState(0);
    const [following, setFollowing] = useState(false);
    const [followersList, setFollowersList] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  
    const getAssociation = async()=>{
      const response = await fetch (`http://localhost:8000/association/get/${id}` , {
      method:"GET",
  
      });
  
      const data = await response.json();
      setAssociation(data);
      setFollowersCount(data.followedProfil.length);
      setFollowing(data.followedProfil.includes(currentUser?._id));
      console.log(data);
  };

  const getFollowersList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/association/${id}/followedProfiles`);
      setFollowersList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/association/${currentUser._id}/follow`, {
        targetAssociationId: association?._id
      })
      .then((response) => {
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
      const res = await axios.post(`http://127.0.0.1:8000/association/${currentUser._id}/unfollow`, {
        targetAssociationId: association?._id
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



  useEffect(()=>{
    getAssociation();
    getFollowersList();
},[following]);

if(!association) return null ;
  

                const{
                    logoPicture
                }=association;
                
             
               
  return (
    <>

    
           


    <div className="profile-menu-area bg-white">


        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-3">
                    <div className="profile-picture-box">
                        <figure className="profile-picture">
                            <a >
                                <img  src={logoPicture} alt="profile picture" width="300px" height="300px"  />
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
                                    <li> <Link to={`/EventDisplay/${id}`}>Events</Link>  </li>
                                    <li>
                      <Button onClick={handleShow}  variant="danger">
      Followed profiles
       <Badge bg="dark">{followersCount}</Badge>
     
    </Button>
                      </li>
                                    <li>
                     
       <div>
                      {following  ? (
        <Button variant="outline-danger" onClick={handleUnfollow}>Unfollow</Button>
      ) : (
        <Button variant="outline-success"  onClick={handleFollow}>Follow</Button>
      )}
      </div>
                      </li>
      
                                </ul>
                            </nav>
                            
                        </div>

                        
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
    
    
    </>
  )
}

export default About