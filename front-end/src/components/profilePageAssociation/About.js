import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const About =() => {

    const [association,setAssociation]= useState(null);
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'))

    const [following, setFollowing] = useState(false);
  
  
    const getAssociation = async()=>{
      const response = await fetch (`http://localhost:8000/association/get/${id}` , {
      method:"GET",
  
      });
  
      const data = await response.json();
      setAssociation(data);
      setFollowing(data.followedProfil.includes(currentUser?._id));
      console.log(data);
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

},[]);

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
    

    
  


    
    
    </>
  )
}

export default About