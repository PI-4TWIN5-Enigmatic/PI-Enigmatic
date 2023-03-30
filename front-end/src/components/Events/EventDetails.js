import React from 'react'
import Navbar from '../Navbar/Navbar'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeoCoder from './LeafletGeoCoder';
import { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import L from "leaflet";
import {MapContainer , TileLayer } from 'react-leaflet'

import { Col ,Container} from 'react-bootstrap'

const EventDetails = () => {

    const user =localStorage.getItem('id')
    console.log("🚀 ~ file: EventDetails.js:17 ~ EventDetails ~ user:", user)

    const [buttonName, setButtonName] = useState("Want to participate ?");
    const [buttonNamee, setButtonNamee] = useState("Are you interested ?");

    const [color, setColor] = useState("btn btn-light btn-lg" );
    const [coloor, setColoor] = useState("btn btn-danger btn-lg ms-2" );



    const [participants, setParticipants] = useState([]);
    const position = [36.8065, 10.1815]


    let DefaultIcon = L.icon({
        iconUrl: "../assets/images/marker.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      });
      L.Marker.prototype.options.icon = DefaultIcon;



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


      const patchParticipate = async () => {
        const response = await fetch(`http://localhost:8000/event/participateEvent/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: user }),
        });

      };
  

      const patchInterested = async () => {
        const response = await fetch(`http://localhost:8000/event/interestedInEvent/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: user }),
        });

      };



      const handleClickPartcipate = () => {
        if (buttonName === "Want to participate ?") {
          setButtonName("Participated");
          setColoor("btn btn-info btn-lg ms-2");
        } else {
          setButtonName("Want to participate ?");
          setColoor("btn btn-danger btn-lg ms-2");

        }
      };


      
      const handleClickInerested = () => {
        if (buttonNamee === "Are you interested ?") {
          setButtonNamee("Interested");
          setColor("btn btn-secondary btn-lg");

        } else {
          setButtonNamee("Are you interested ?");
          setColor("btn btn-light btn-lg");
        }
      };



  return (
    <>
                <Navbar />
                <br />
                <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >      
        
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
              <div className="card card-registration my-4">
              <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                  
                      <br />
                      <h4>Reviews Section:</h4>
                      <hr />
                      <div className="d-flex  justify-content-center pt-2">
                          <button type="button" className={color} style={{  width: '30%'}}
                                            onClick={() => { 
                                    patchInterested(); 
                                    handleClickInerested();
                                }}>{buttonNamee}</button>
                        

                            <button type="button" className={coloor}
                                        style={{ width: '30%'}}
                                        onClick={() => { 
                                            patchParticipate(); 
                                            handleClickPartcipate();
                                        }}
                                                >{buttonName}</button>
                                                </div>
       
                  </div>

                  <div className="col-xl-6">
                    <div className="justify-content-center d-flex">
                  <img src={event.eventPicture}
                      alt="Sample" className="img-fluid justify-content-center d-flex "
                      style={{width:"70%"}}
                      />
                      </div>
                      <h3 className="mb-5 text-uppercase justify-content-center d-flex">{event.nameEvent} </h3>


                    

                  <div className="card-body p-md-5 text-black">

                      <div className="row">
                      <div className="form-outline mb-4">
                      <h5 className="mb-2 text-uppercase">Description : </h5>
                      <label className="form-label" >{event.descriptionEvent}</label>
                      </div>

                      </div>

                      <div className="row">
                      <div className="form-outline mb-4">
                      <h5 className="mb-2 text-uppercase">Date : </h5>
                      <label className="form-label" >{event.dateEvent}</label>
                      </div>

                      </div>


                      <div className="row">
                      <div className="form-outline mb-4">
                      <h5 className="mb-2 text-uppercase">Type : </h5>
                      <label className="form-label" >{event.typeEvent}</label>
                      </div>

                      </div>

                      <div className="row">
                      <div className="form-outline mb-4">
                      <h5 className="mb-2 text-uppercase">Price : </h5>
                      <label className="form-label" >{event.priceEvent}</label>
                      </div>

                      </div>
                     
                      <div className="row">
                      <div className="form-outline mb-4">
                      <h5 className="mb-2 text-uppercase">Location : </h5>
                      <label className="form-label" >{event.locationEvent}</label>
                      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                               <TileLayer
                                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                 <LeafletGeoCoder   />
                      </MapContainer>
                      </div>

                      </div>
                     
                           

                  </div>
                  </div>
              </div>
              </div>
          </div>
          <Container className="mt-10 p-4">
               <Col md={4} lg={4} sm={4}>

                <h2>Add Review</h2>
                  <hr />


                  
                </Col>
                <div className="row">
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg"  />
                            <label className="form-label" >Rating</label>
                            </div>

                            
                            
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg"  />
                            <label className="form-label" >Description</label>
                            </div>

                            <button type="button" className="btn btn-primary btn-lg " >Submit</button>

                            </div>  


                </Container >
          </div>
      </div>
      </section>

    
    
    </>
  )
}

export default EventDetails