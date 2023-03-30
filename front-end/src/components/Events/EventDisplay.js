import React from 'react'
import Navbar from '../Navbar/Navbar'
import About from '../profilePageAssociation/About'
import AssociationWidget from '../profilePageAssociation/AssociationWidget'
import { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EventDisplay = () => {
    const [association,setAssociation]= useState(null);
    const[event,setEvent]=useState("");
    const {id} = useParams();
    const [alpha,setAlpha]= useState(null);
    const idCurrentUser =window.localStorage.getItem("id");


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
      }, [id]);


      useEffect(() => {
        fetch(`http://localhost:8000/event/${id}/events`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setEvent(data);})
          .catch(error => console.error(error));
      }, []);
      

      const navigate = useNavigate();

      const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/event/deleteEvent/${id}`)
          .then(response => {
            console.log('Item deleted successfully');
            toast.info("Event have been deleted")                    // Handle success response
            navigate(`/EventDisplay/${id}`)

          })
          .catch(error => {
            console.error('Error deleting item', error);
          });
      };




  return (
    <>

        <Navbar />


    <main >
        <div className ="main-wrapper">
            <img className ="profile-banner-large bg-img" src="../assets/images/banner/profile-banner.jpg" />
            
        <About />
        
      
                </div>
        <div className ="container">

        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.from(event).map((e)=>
        
       
            <li className ="unorder-list" key={e._id}>
            <div className="card widget-item" style={{width:"300px" , margin: "10px"}}>
            <div class="post-settings-bar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div class="post-settings arrow-shape">
                                       
                                          {alpha ? (
                                             <ul>
                                            <li><button> <Link to={`http://localhost:3000/EventDetails/${e._id}`}> show more details </Link></button></li>
                                            <li><button> <Link to={`http://localhost:3000/updateEvent/${e._id}`}>edit event</Link></button></li>
                                            <li><button onClick={() => handleDelete(e._id)}>delete event</button></li> 
                                            </ul>
                                            ):(
                                            <ul>
                                            <li><button> <Link to={`http://localhost:3000/EventDetails/${e._id}`}> show more details </Link></button></li>
                                            </ul>

                                          )}
                                        
                                    </div>
                                </div>
                                <h4 className="widget-title">{e.nameEvent}</h4>
                                <div className="widget-body">
                                    <div className="add-thumb">
                                        <a href="#">
                                            <img src={e.eventPicture} alt="Event picture" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            </li>
                           
                                    

            )}
</div>
    <br></br>
    </div>
    </main>
    

    
    
    
    </>
  )
}

export default EventDisplay