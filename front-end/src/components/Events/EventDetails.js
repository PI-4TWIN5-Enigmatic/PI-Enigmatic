import React from 'react'
import Navbar from '../Navbar/Navbar'
import About from '../profilePageAssociation/About'
import AssociationWidget from '../profilePageAssociation/AssociationWidget'
import { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';

const EventDetails = () => {

    const[event,setEvent]=useState("");
    const {id} = useParams();


      useEffect(() => {
        fetch(`http://localhost:8000/event/getEventById/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setEvent(data);})
          .catch(error => console.error(error));
      }, []);






  return (
    <>

        <Navbar />

        <main style={{ position: "absolute", top: "70%", left: "50%", transform: "translate(-50%, -50%)",width: "80%"  }} >
        <div className ="main-wrapper">
            <div className="container" >
      
        <div className="menu-secondary" >
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            
                                    <h4 className="page-title">Here's more details about the event</h4>
                                </div>
                              
                         
                    </div>
                </div>
            </div>
           
            <div className="about-author-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                        <br></br>
                        <br></br>
                        <br></br>

                            <div className="card widget-item">
                                <img  src={event.eventPicture} alt="profile picture" width="300px" height="300px"  />
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="about-description">
                                <div className="tab-content">
                                    <div className="tab-pane fade active show" id="one">
                                        <div className="work-zone">
                                            <div className="author-desc-title d-flex">
                                                <h3 style={{color:"#ffa4a4"}}><u>{event.nameEvent}</u></h3>
                                             
                                            </div>
                                            <h5>Description:</h5>
                                            <p>{event.descriptionEvent}</p>
                                            <h5>Date of the event:</h5>
                                            <p>{event.dateEvent}</p>
                                            <h5>Type :</h5>
                                            <p>{event.typeEvent}</p>
                                            <h5>Price :</h5>
                                            <p>{event.priceEvent}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
    </div>
    </div>
</main>
    
    
    
    </>
  )
}

export default EventDetails