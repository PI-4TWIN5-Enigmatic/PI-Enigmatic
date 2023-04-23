import React from 'react'
import Navbar from '../../Navbar/Navbar'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useEffect, useState,useCallback } from 'react';
import { useParams ,Link, useNavigate } from 'react-router-dom';
import L from "leaflet";
import {MapContainer , TileLayer } from 'react-leaflet'
import {  Col ,Container ,Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {  useCookies } from "react-cookie";
import Rating from '@mui/material/Rating';
import moment from 'moment';
import { Marker, Popup } from 'react-leaflet';

const EventDetails = () => {

const navigate = useNavigate();

  const [cookies, _]=useCookies(['access_token'])



    const user =localStorage.getItem('id')

    const useer = JSON.parse(localStorage.getItem('user'));
        

    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [numReviews, setNumReviews] = useState(4);
    const [organisateur,setOrganisateur]=useState("");
    const [revieew, setRevieew] = useState("");
    const [interestedCount, setInterestedCount] = useState("");
    const [participatedCount, setParticipatedCount] = useState("");
    const [isparticipated, setIsparticipated] = useState("");
    const [isInterested, setIsInterested] = useState("");
    const [alpha,setAlpha]= useState(null);
    const [association,setAssociation]= useState(null);
    const [globalRating,setGlobalRating]= useState(0);
    const [value, setValue] = React.useState(0);
    const[event,setEvent]=useState("");
    const [isEventTimePassed, setIsEventTimePassed] = useState('');
    const [isFav, setIsFav] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const {id} = useParams();
    const [latLng, setLatLng] = useState("");
    const [change, setChange] = useState(false);
    const position = latLng;
    const currentTime = moment();

     //LEAFLET_MAP  

    let DefaultIcon = L.icon({
        iconUrl: "../assets/images/marker.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      });
      L.Marker.prototype.options.icon = DefaultIcon;


      const fetchData = async (data) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${data}&format=json`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
  
          if (data.length === 0) {
            throw new Error('No results found');
          }
          const { lat, lon } = data[0];
          setLatLng([parseFloat(lat), parseFloat(lon)]);
        } catch (error) {
          console.error(error);
        }
      };
      
  
      //END_LEAFLET_MAP
    


      //LIST_BUTTONS_FUNCTIONS

    const handleShowMoreClick = () => {
      setShowMoreReviews(true);
      setNumReviews(numReviews + 4);
    };

  
    
    const showLessReviews = () => {
      setNumReviews(4);
    };


    //END_LIST_BUTTONS_FUNCTIONS




    //REVIEWS_SECTION

    const handleSubmit = (e) => {
      const response =  fetch(`http://localhost:8000/event/reviewEvent/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization:cookies.access_token

            },
            body: JSON.stringify({ reviewerId: user ,review:revieew , rating:value}),
      });
      setChange(true)
      toast.info("Review has been added");                
      setRevieew("");
      setValue("");
      
    }
    const eventReviews = event.reviews
    console.log("🚀 ~ file: EventDetails.js:123 ~ EventDetails ~ eventReviews:", eventReviews)



      const deleteReview = async (reviewIdd) => {
        if (window.confirm(`Are you sure you want to delete this review?`)){
        const response = await fetch(`http://localhost:8000/event/deleteReview/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization:cookies.access_token

              },
              body: JSON.stringify({ reviewerId: reviewIdd }),
        });} 
      };

        const handleRatingChange = (event, newValue) => {
          setValue(newValue);

      };



    useEffect(() => {
      fetch(`http://localhost:8000/event/getRating/${id}`)
        .then(response => response.json())
        .then(data => {
          setGlobalRating(data);})
        .catch(error => console.error(error));
    }, [id,globalRating,eventReviews,value]);


  //END_REVIEW_SECTION


  //FAVORITE_EVENT


  const getUser = async()=>{
    const response = await fetch (`http://localhost:8000/api/getuser/${user}` , {
    method:"GET",

    });

    const data = await response.json();
    setCurrentUser(data);
    setIsFav(Boolean(data.favEvents[id]))

    console.log(data);

};

 

  const patchFav = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/event/favEvent`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user , eventId: id }),
    });
    
    const updatedUser = { ...currentUser };
    setCurrentUser(updatedUser);
    setChange(true)
  
    if (isFav) {
      updatedUser.favEvents[id] = false;
    } else {
      updatedUser.favEvents[id] = true;
    }

  }, []);
  


  //END_FAVORITE_EVENT





    //INTERACTION_SECTION

    const patchParticipate = useCallback(async () => {
      const response = await fetch(`http://localhost:8000/event/participateEvent/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.access_token
        },
        body: JSON.stringify({ userId: user }),
      });
    
      setChange(true)

    }, []);
    
  


    const patchInterested = useCallback(async () => {
      const response = await fetch(`http://localhost:8000/event/interestedInEvent/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.access_token
        },
        body: JSON.stringify({ userId: user }),
      });
    
      setChange(true)

    }, []);
    


    //END_INTERACTION_SECTION

     

      
    

      useEffect(() => {
        getUser();
        
        fetch(`http://localhost:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
          .then(data => {
            fetchData(data.locationEvent);
            setEvent(data);
            setChange(false);

            const eventTime = moment(data.dateEvent);
            setIsEventTimePassed(eventTime.isBefore(currentTime))
            setInterestedCount ( Object.keys(data.interested).length);
            setParticipatedCount( Object.keys(data.participants).length);
            setIsparticipated( Boolean(data.participants[user]));
            setIsInterested( Boolean(data.interested[user]));

           if (data && data.hasOwnProperty('organisateurEvent')) {
            setOrganisateur(data.organisateurEvent)
           fetch(`http://localhost:8000/association/get/${data.organisateurEvent}`)
           .then(response => response.json())
           .then(dataa => {
             console.log(dataa);
             setAssociation(dataa);
             
             if (dataa && dataa.hasOwnProperty('founder')) {
                 console.log("association.founder:", dataa.founder);
                 const alphaa = dataa.founder.toString() === user.toString();
                 setAlpha(alphaa);
             } else {
                 console.log("association is null or does not have a founder property");
             }
         })
           .catch(error => console.error(error));
        }
       
          })
          .catch(error => console.error(error));
         

       
          
      }, [change]);

      

        const goBack=()=>{
          navigate(`/EventDisplay/${association._id}`);
        }

      


  return (
    <>
                <Navbar  />
                <br />
                <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >   

           
        <div className="container py-5 h-100">
       
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            
            
          <Container className="mt-3 p-4">
          <div className='d-flex justify-content-end' >
              <button type="button" className="btn btn-light " data-mdb-ripple-color="dark"  onClick={goBack}>
               X
            </button>
            </div>
            <Row>
              
            <Col>
            
          <div className="d-flex justify-content-left"   >
            <div style={{  marginRight: "15px" }}>
            <h2>Event Details  </h2>

            </div>
            <div style={{  marginRight: "15px" }}>
            <Rating
                name="simple-controlled"
                value={globalRating}
                precision={0.25}
                size='large'
                readOnly
              />
            </div>
            </div>
            <hr style={{ width: '35%', marginLeft: 0 }}/>

            </Col>
            </Row>
                </Container>
                
              <div className="card card-registration my-4">
         
                
              <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">

                  <div className="justify-content-center d-flex">

                      <div className="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>
 
        
                              <h5 className=" text-uppercase justify-content-center d-flex">Participation </h5>   
                              <hr />
                              


                                    <div className="d-flex justify-content-between" style={{ paddingRight: "40px" }}>
                                      <div className="d-flex flex-column align-items-center">
                                        <h6 className="text-uppercase">Interested</h6>
                                        <h6 className="d-flex justify-content-center mb-0">{interestedCount}</h6>
                                      </div>
                                      <div className="d-flex flex-column align-items-center">
                                        <h6 className="text-uppercase">Participated</h6>
                                        <h6 className="d-flex justify-content-center mb-0">{participatedCount}</h6>
                                      </div>
                                    </div>
                                                              

                              </div>

       

</div>
                  
                      <br />
                      <h4>Reviews Section:</h4>
                      <hr />

                      {/* <!-- post status start --> */}
                      {eventReviews && eventReviews.slice(0, numReviews).map((a)=>
                        <li className="card" key={a.reviewerId}>
                            {/* <!-- post title start --> */}
                            <div className="post-title d-flex align-items-center">
                                {/* <!-- profile picture end --> */}
                                <div className="profile-thumb">
                                        <figure className="profile-thumb-middle">
                                            <img src={a.reviewerId?.profilePicture} alt="picture" />
                                        </figure>
                                </div>
                                {/* <!-- profile picture end --> */}

                                <div className="posted-author">
                                    <h6 className="author"><Link to={`/profile/${a.reviewerId?._id}`}>{a.reviewerId?.firstName} {a.reviewerId?.lastName}</Link></h6>
                                    <span class="post-time">{new Date(a.timestamp).toString().substring(0, 24)}</span>

                                </div >
                                { alpha || (a.reviewerId?._id === user) ? (

                                <div className="post-settings-bar" >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div className="post-settings arrow-shape">
                                        <ul>
                                            <li><button onClick={()=>{deleteReview(a._id)}}>Delete review</button></li>
                                        </ul>
                                    </div>
                                </div>):(
                                                             <button></button>

                                )}
                            </div>
                            {/* <!-- post title start --> */}
                            <div className="post-content">
                                <p className="post-desc">
                                  {a.review}
                                </p>
                                   <Rating
                                  name="simple-controlled"
                                  value={a.rating}
                                  precision={0.5}
                                  onChange={handleRatingChange}
                                  size="small"
                                  readOnly
                                  />   
                            </div>
                        </li>
                      )}
                      <div className='d-flex justify-content-center'>
                      <button outline rounded className='btn btn-danger'  onClick={handleShowMoreClick}  style={{ marginRight: '100px' }}>
                      <i className="bi bi-person-down">  Show More</i>

                      {/* <MDBIcon fas icon="caret-down" style={{ marginRight: '10px' }}/> */}
                      </button>


                      <button outline rounded className='btn btn-danger'  onClick={showLessReviews}  style={{ marginRight: '100px' }}>
                                      {/* <MDBIcon fas icon="caret-up" style={{ marginRight: '10px' }}/> */}
                                      <i className="bi bi-person-down">  Show Less</i>

                      </button>
                                      </div>


                        {/* <!-- post status end --> */}
       
                  </div>



                  <div className="col-xl-6">
                    <div className='d-flex justify-content-end'>
                    <button className='like-button'>
                        <img
                          className={isFav ? "heart-color" : "heart"}
                          src={isFav ? "../assets/images/icons/heart-color.png" : "../assets/images/icons/heart.png"}
                          onClick={patchFav}
                          alt=""
                          style={{width:"30px"}}
                        />
                      </button>
                    </div>
                                            
                    <div className="justify-content-center d-flex">

                    <div className="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>
                  
                             <div className="widget-body  justify-content-center d-flex">
                                    <div className="add-thumb">
                                            <img src={event.eventPicture} className="img-fluid justify-content-center d-flex "
                                             alt="event" style={{width:"200px"}}/>
                                    </div>
                                </div>
                                <h3 className=" text-uppercase justify-content-center d-flex">{event.nameEvent} </h3>   
                              <hr />


                                <h4 className="widget-title"><i className="bi bi-heart-beat" style={{paddingRight: "10px"}}></i>Description : </h4>
                                <p >{event.descriptionEvent}</p>
                                <br />
                                <h4 className="widget-title"><i className="bi bi-share" style={{paddingRight: "10px"}}></i>Details : </h4>
                                <p ><b>Date :</b>{new Date(event.dateEvent).toString().substring(0, 24)}</p>
                                <br />
                                <p ><b>Type :</b>{event.typeEvent}</p>
                                <br />
                                <p ><b>Price :</b>{event.priceEvent} Dt</p>
                              <br/>

                              {alpha ? ( <></>
                                    
                                    
                                    
                                    ):( 
                  
                                
                                
                                
                                <div className="d-flex justify-content-center" style={{ paddingRight: "10px" }}>
                                                  
                                  {!isEventTimePassed && (
                                    <>
                                      <button
                                        type="button"
                                        className={`btn btn-${isInterested ? 'secondary' : 'light'} btn-lg`}
                                        onClick={patchInterested}
                                      >
                                        {isInterested ? 'Interested ' : 'Are you interested?'}
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn btn-${isparticipated ? 'info' : 'danger'} btn-lg`}
                                        onClick={patchParticipate}
                                      >
                                        {isparticipated ? 'Going ' : 'Want to participate?'}
                                      </button>
                                    </>
                                  )}                              
                               
                         </div>)}


                                </div>
                  
                                  

                  </div>
                  <br/> <br/>

                  <div className="justify-content-center d-flex">

                        <div className ="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>

                                <div className="form-outline mb-4">
                                <h4 className="widget-title"><i className="bi bi-location-pointer" style={{paddingRight: "10px"}}></i>Location : </h4>
                                <p >{event.locationEvent}</p>
                                {position && (
                                 <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                 <TileLayer
                                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                 />
                                 <Marker position={position}>
                                   <Popup>
                                     A pretty CSS3 popup. <br /> Easily customizable.
                                   </Popup>
                                 </Marker>
                               </MapContainer>
                                
                                )}
                                </div>
                                </div>
                  </div>
                  </div>

                  
              </div>
              </div>
          </div>

          {alpha ? (
              <Container className="mt-10 p-4">
              <Col md={4} lg={4} sm={4}>

              <h2>Event Management</h2>
                <hr />


                
              </Col>
            
              <div class="button-container justify-content-left d-flex" 
                           >
                          <button type="button" className="btn btn-danger btn-lg " style={{marginRight: "20px"}}  >
                          <Link style={{ textDecoration: 'none', color: 'white' }} to={`http://localhost:3000/presenceList/${id}`}>  Check List Of Presence </Link>

                            </button>

                          <button type="button" className="btn btn-danger btn-lg " style={{marginRight: "20px"}}  >
                          <Link style={{ textDecoration: 'none', color: 'white' }} to={`http://localhost:3000/partners/${id}`}>  Add Parteners </Link>

                             </button>

                          <button className="btn btn-danger btn-lg" style={{marginRight: "20px"}} >
                          <Link style={{ textDecoration: 'none', color: 'white' }} to={`http://localhost:3000/updateEvent/${id}`}>  Update Event </Link>
                              </button>

                              {/* <button className="btn btn-danger btn-lg" style={{marginRight: "20px"}} >
                          <Link style={{ textDecoration: 'none', color: 'white' }} to={`http://localhost:3000/meeting/${id}`}>  Meeting Room </Link>
                              </button> */}

                          </div>


       </Container >


          ):(
          <Container className="mt-10 p-4">
               <Col md={4} lg={4} sm={4}>

                <h2>Add Review</h2>
                  <hr />


                  
                </Col>
                <div className="row" >    

                <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={handleRatingChange}
                size="large"
                 />   
                
                  <p >Rate your experience</p>
                  <br/>

                            
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg"  value={revieew} onChange={(e) => setRevieew(e.target.value)}/>
                       
                            <p>Description</p>
                            </div>
                            <button className='btn btn-danger'
                                                          onClick={handleSubmit}                                  >
                                                      Submit                      
                                                      </button>   


                            </div>  


                </Container >


                        )}
          </div>
      </div>
      </section>

    
    
    </>
  )
}

export default EventDetails