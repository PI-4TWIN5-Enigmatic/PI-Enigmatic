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

const EventDisplay = () => {
    const [association,setAssociation]= useState(null);
    const[event,setEvent]=useState("");
    const {id} = useParams();
    const [alpha,setAlpha]= useState(null);
    const idCurrentUser =window.localStorage.getItem("id");
    const token =window.localStorage.getItem("token");
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[query,setQuery]=useState('')



    //Swiper
    const carouselRef=useRef();
    const[width,setWidth]=useState(0);

    useEffect(()=>{

          setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    })

    //endSwiper






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
            setEvent(data);})
          .catch(error => console.error(error));
      }, []);
      

      const navigate = useNavigate();

      const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this event?`)){
        axios.delete(`http://localhost:8000/event/deleteEvent/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => {
            console.log('Item deleted successfully');
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

                            </div>
        
                </div>
                


        <div className ="container" >

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
    
       
                     
</div>
    <br></br>
    </div>
    </main>
    

    
    
    
    </>
  )
}

export default EventDisplay