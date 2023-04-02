import React , { useState,useEffect } from 'react'
import {MapContainer , TileLayer , Marker , Popup } from 'react-leaflet'
import '../createEvent/CreateEvent.css'
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeoCoder from '../LeafletGeoCoder';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies, useCookies } from "react-cookie";


const UpdateEvent = () => {
    const {id} = useParams();
    const [currentEvent, setCurrentEvent] = useState('');
    const [nameEvent, setNameEvent] = useState('');
    const [dateEvent, setDateEvent] = useState('');
    const [locationEvent, setLocationEvent] = useState('');
    const [descriptionEvent, setDescriptionEvent] = useState('');
    const [typeEvent, setTypeEvent] = useState('');
    const [eventPicture, seteventPicture] = useState('');
    const [priceEvent, setPriceEvent] = useState('');
    const [cookies, _]=useCookies(['token'])



    useEffect(() => {
      fetch(`http://localhost:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPriceEvent(data.priceEvent);
          setTypeEvent(data.typeEvent);
            setNameEvent(data.nameEvent);
            setDescriptionEvent(data.descriptionEvent);
            setLocationEvent(data.locationEvent)
            seteventPicture(data.eventPicture);
            setDateEvent(data.dateEvent);

     } )
          .then(
          )
        .catch(error => console.error(error));
    }, []);



    function handleDataFromChild(data) {
        setLocationEvent(data);
        }

   



    const handleSubmit = (e) => {

        


        const dataimg = new FormData()
        dataimg.append("file",eventPicture)
        dataimg.append("upload_preset","enigmatic")
        dataimg.append("cloud_name","dtisuumvj")
        axios.post("https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",dataimg)
        .then((result)=> {
            console.log(result.data.secure_url)
            const data = {
                nameEvent,
                dateEvent,
                locationEvent,
                descriptionEvent,
                typeEvent,
                priceEvent,
                eventPicture:result.data.secure_url,
            };
            console.log("data:", data)

            // Send a POST request to the backend API
             axios.put(`http://localhost:8000/event/updateEvent/${id}`, data , {headers:{Authorization:cookies.access_token}})
                .then(response => {
                    console.log(response);
                    toast.info("Event have been updated")                    // Handle success response

                    // Handle success response
                })
                .catch(error => {
                    console.error(error);
                    // Handle error response
                });
                }
        
        )
    
        if(window.confirm(`Event have been updated successfully`)){
            navigate(`/EventDetails/${id}`)

        }
    
    }



        console.log(locationEvent);

    const position = [36.8065, 10.1815]


    let DefaultIcon = L.icon({
        iconUrl: "../assets/images/marker.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      
      const navigate = useNavigate();


      const goBack=()=>{
        navigate(`/EventDetails/${id}`)
      }



  return (
<>
            <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >      
        
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                    <div className="card card-registration my-4">
                    <div className="row g-0">
                        <div className="col-xl-6 d-none d-xl-block">
                            <br></br> <br></br>
                        <img src="../assets/images/update.jpg"
                            alt="Sample" className="img-fluid"
                            />
                            <div>
                                <br/> <br/>

                        <img src="../assets/images/updatee.jpg"
                                                    alt="Samplee" className="img-fluid"
                                                    />


                                                    </div>
                        </div>

                        <div className="col-xl-6">
                        <div className="card-body p-md-5 text-black">
                            <h3 className="mb-5 text-uppercase">Update An Event </h3>

                            <div className="row">
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg" value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} />
                            <label className="form-label" >Name</label>
                            </div>

                            </div>
                            
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg" value={descriptionEvent} onChange={(e) => setDescriptionEvent(e.target.value)} />
                            <label className="form-label" >Description</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input type="datetime-local" id="form3Example8" className="form-control form-control-lg" value={dateEvent} onChange={(e) => setDateEvent(e.target.value)}/>
                            <label className="form-label" >Date</label>
                            </div>


                          


                            <div className="form-outline mb-4">
                            <div className="mb-3">
                            <input className="form-control" type="file" id="formFile" onChange={(event) => seteventPicture(event.target.files[0])} />
                            <label className="form-label">Choose a Picture</label>

                                          </div>
                             </div>
                                 


                            <div className="form-outline mb-4">
                            <select className="nice-select" name="sort" onChange={(e) => setTypeEvent(e.target.value)} value={typeEvent}>
                                    <option >Type Event</option>
                                    <option value="Free Event">Free Event</option>
                                    <option value="Paid Event">Paid Event</option>
                                                                
                                                            </select>
                            </div>
                                    
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example97" className="form-control form-control-lg" value={priceEvent} onChange={(e) => setPriceEvent(e.target.value)}  />
                            <label className="form-label">If it's a paid event, please enter the price of the tickets here :  </label>
                            </div>



                            <div className="form-outline mb-4">
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LeafletGeoCoder onData={handleDataFromChild}  />
                            </MapContainer>
                            <label className="form-label" >Location</label>
                            </div>


                            <div className="d-flex justify-content-end pt-3">
                            <button type="button" className="btn btn-light btn-lg" onClick={goBack}>Go back</button>
                            <button type="button" className="btn btn-danger btn-lg ms-2" onClick={handleSubmit}>Submit form</button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>







</>  )
}

export default UpdateEvent