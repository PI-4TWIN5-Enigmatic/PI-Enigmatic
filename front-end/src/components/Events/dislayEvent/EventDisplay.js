import React , {useRef}from 'react'
import Navbar from '../../Navbar/Navbar'
import About from '../../profilePageAssociation/About'
import { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
import {motion} from "framer-motion"
import "./EventDisplay.css"
import moment from 'moment';
import { MapContainer, TileLayer, Marker, Popup  } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
const EventDisplay = () => {
    const [association,setAssociation]= useState(null);
    const[event,setEvent]=useState("");
    const {id} = useParams();
    const [alpha,setAlpha]= useState(null);
    const idCurrentUser =window.localStorage.getItem("id");
    const token =window.localStorage.getItem("token");
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[query,setQuery]=useState('')
    const[change,setChange]=useState(false)
    const [isCardVisible , setIsCardVisible]=useState(true)
    const [data, setData] = useState([]);
    console.log("🚀 ~ file: EventDisplay.js:29 ~ EventDisplay ~ data:", data)



    //Swiper
    const carouselRef=useRef();
    const[width,setWidth]=useState(0);

    useEffect(()=>{

          setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    })

    //endSwiper

    //MAP
    const DefaultIco = L.icon({
      iconUrl:'../assets/images/marker.png',
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
    });
    L.Marker.prototype.options.icon = DefaultIco;

    const position = [36.81897,  10.16579]

    const fetchData = async (e) => {
      if (e.locationEvent === "From All Over The World") {
        return [];
            }
     else {
      const url = `https://nominatim.openstreetmap.org/search?q=${e.locationEvent}&format=json`;
      try {
        const response = await fetch(url);
        const data = await response.json();

   
        const { lat, lon } = data[0];


        const  newData=[
               [parseFloat(lat), parseFloat(lon)]

        ]
        return newData;

      }

        catch (error) {
          console.error(error);
        }
      }
      }
    

          function populateDataM(data) {
          const promises = data.map((e) =>
          fetchData(e)  );
          Promise.all(promises).then((newDataArray) => {
            const newData = newDataArray.filter(arr => arr.length > 0).flat();
            setData(newData)

          })
          }






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
            } else {
                console.log("association is null or does not have a founder property");
            }
        })
          .catch(error => console.error(error));
      }, []);


      useEffect(() => {
        fetch(`http://localhost:8000/event/${id}/events`, 
        {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setEvent(data)
            populateDataM(data)
            setChange(false)
            ;})
          .catch(error => console.error(error));
      }, [change]);
      

      const navigate = useNavigate();

      const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this event?`)){
        axios.delete(`http://localhost:8000/event/deleteEvent/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => {
            console.log('Item deleted successfully');
            setChange(true)
            toast.info("Event have been deleted")                    // Handle success response

          })
          .catch(error => {
            console.error('Error deleting item', error);
          });}
      };

   
      const [timePeriod, setTimePeriod] = useState('');

     
      const handleFilterByTimePeriod = (event) => {
        const currentTime = moment().toISOString(); 
        const upcomingEvents = event.filter(e => moment(e.dateEvent).isAfter(currentTime));
        const currentEvents = event.filter(e => moment(e.dateEvent).isSameOrBefore(currentTime) && moment(e.endTime).isAfter(currentTime)); 
        const pastEvents = event.filter(e => moment(e.dateEvent).isBefore(currentTime)); 
        console.log("timePeriod:", timePeriod);
        console.log("event:", event);
        console.log("upcomingEvents:", upcomingEvents);
        console.log("currentEvents:", currentEvents);
        console.log("pastEvents:", pastEvents);
        switch (timePeriod) {
          case 'upcoming':
            return upcomingEvents;
          case 'current':
            return currentEvents;
          case 'past':
            return pastEvents;
          default:
            return event;
        }}
          
  return (
    <>

        <Navbar />
        
        {/* style={{backgroundColor:'rgb(213 205 200)'}} */}

    <main  >
        <div className ="main-wrapper"  >
            <img className ="profile-banner-large bg-img" src="../assets/images/banner/profile-banner.jpg" />
            
        <About />
                          <div className="d-flex justify-content-center"  >
                            <select className="nice-select" name="sort"style={{marginRight: "40px"}} onChange={(e) => setQuery(e.target.value)}  >
                                    <option value="">Type Event</option>
                                    <option value="Free Event">Free Event</option>
                                    <option value="Paid Event">Paid Event</option>       
                                                            </select>

                            

                             <select className="nice-select" name="sort"style={{marginRight: "40px"}}  onChange={(e) => setTimePeriod(e.target.value)}>
                                    <option value="">Event Status</option>
                                    <option value="past">Archived Events</option>
                                    <option value="current">Today's Events</option>     
                                    <option value="upcoming">Upcoming Events</option>       
  
                                                            </select> 

                            <button onClick={()=>{
                              setIsCardVisible(!isCardVisible)
                            }}> Show/Hide Map Events </button>


                            </div>
        
                </div>
                


        <div className ="container" >
        <div style={{ display: isCardVisible ? 'block' : 'none' }}>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
    

          <motion.div className="carousel" ref={carouselRef} >
            <motion.div drag="x" dragConstraints={{right:0 , left:- width}} className="inner-carousel" >
              
            {Array.isArray(event) &&
              handleFilterByTimePeriod(event)
            .filter(
              (e) =>
                e.typeEvent.includes(query) 
            )
            .map((e)=>
        
       
        <li className ="unorder-list" key={e._id}>
        <div className="card widget-item" style={{width:"400px" , margin: "20px"}} >
      
        <div class="post-settings-bar">
                                <span></span>
                                <span></span>
                                <span></span>
                                <div class="post-settings arrow-shape">
                                   
                                      {alpha ? (
                                         <ul>
                                        <li><button> <Link to={`http://localhost:3000/EventDetails/${e._id}`}> show more details </Link></button></li>
                                        <li><button onClick={() => 
                                          handleDelete(e._id)}>delete event</button></li> 
                                                              
                                        </ul>
                                        ):(
                                        <ul>
                                        <li><button> <Link to={`http://localhost:3000/EventDetails/${e._id}`}> show more details </Link></button></li>
                    

                                        </ul>

                                      )}

                                </div>
                            </div>
                                             
                            <h4 className="widget-title">{e.nameEvent} </h4>

                            <div className="d-flex justify-content-left"   >
                              </div>
                            <div style={{  marginRight: "15px" }}>
                              </div>
                            <div className="widget-body" >
                                <div className="add-thumb" >
                                    <a href="#">
                                        <img src={e.eventPicture} alt="Event picture"  style={{pointerEvents:'none'}}  />
                                    </a>
                                </div>
                                <br/>
                                
                            </div>
                         
                        </div>
                        
                        </li>
                       
                                

        )}
            </motion.div>
          </motion.div>
    
       
                     
</div></div>
    <br></br>
    <div style={{ display: isCardVisible ? 'none' : 'block' }}>
    <div className="justify-content-center d-flex">

        <div className ="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>

                <div className="form-outline mb-4">
                <MapContainer center={position} zoom={7} scrollWheelZoom={false} >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data.map((e)=>(
                  <Marker position={[e[0], e[1]]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                ))}
                
              </MapContainer>
                                                </div>
                        </div>
                </div>
                    </div>
            </div>
        <br/>
            </main>
    

    
    
    
    </>
  )
}

export default EventDisplay