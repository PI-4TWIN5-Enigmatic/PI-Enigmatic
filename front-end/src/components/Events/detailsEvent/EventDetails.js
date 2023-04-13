import React from 'react'
import Navbar from '../../Navbar/Navbar'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeoCoder from '../LeafletGeoCoder';
import { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import L from "leaflet";
import {MapContainer , TileLayer } from 'react-leaflet'
import {  Col ,Container ,Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Cookies, useCookies } from "react-cookie";
import Rating from '@mui/material/Rating';
import moment from 'moment';

const EventDetails = () => {



  const [cookies, _]=useCookies(['access_token'])


  const token = useSelector((state) => state.token);

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
    console.log("🚀 ~ file: EventDetails.js:46 ~ EventDetails ~ isFav:", isFav)
    const [currentUser, setCurrentUser] = useState("");
    const {id} = useParams();
    
    const position = [36.8065, 10.1815]


    let DefaultIcon = L.icon({
        iconUrl: "../assets/images/marker.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      });
      L.Marker.prototype.options.icon = DefaultIcon;


 
    

    const handleShowMoreClick = () => {
      setShowMoreReviews(true);
      setNumReviews(numReviews + 4);
    };

  
    
  const showLessReviews = () => {
    setNumReviews(4);
  };


    const handleSubmit = (e) => {
      const response =  fetch(`http://localhost:8000/event/reviewEvent/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization:cookies.access_token

            },
            body: JSON.stringify({ reviewerId: user , reviewerPseudo: useer.firstName , reviewerPhoto: useer.profilePicture, review:revieew , rating:value}),
      });

      toast.info("Review has been added");                
      setRevieew("");
      setValue("");
      
    }
    const eventReviews = event.reviews



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


  //FAVORITE_EVENT
  const patchFav = async () => {
      
    const response = await fetch(`http://localhost:8000/event/favEvent`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({ userId: user , eventId: id }),
    });

  };

  const getUser = async()=>{
    const response = await fetch (`http://localhost:8000/api/getuser/${user}` , {
    method:"GET",

    });

    const data = await response.json();
    setCurrentUser(data);
    console.log(data);

};

  useEffect(()=>{
    getUser();      

  },[]
  )


  //END_FAVORITE_EVENT





    useEffect(() => {
      fetch(`http://localhost:8000/event/getRating/${id}`)
        .then(response => response.json())
        .then(data => {
          setGlobalRating(data);})
        .catch(error => console.error(error));
    }, [id,globalRating,eventReviews,value]);
    

    const patchParticipate = async () => {
      const response = await fetch(`http://localhost:8000/event/participateEvent/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization:cookies.access_token
            },
            body: JSON.stringify({ userId: user }),
      });

    };

  
    const patchInterested = async () => {
      
      const response = await fetch(`http://localhost:8000/event/interestedInEvent/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization:cookies.access_token

            },
            body: JSON.stringify({ userId: user }),
      });

    };





      const currentTime = moment();
     
    

      useEffect(() => {
        
        fetch(`http://localhost:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
          .then(data => {
            setEvent(data);
            const eventTime = moment(data.dateEvent);
            setIsEventTimePassed(eventTime.isBefore(currentTime))
           setInterestedCount ( Object.keys(data.interested).length);
           setParticipatedCount( Object.keys(data.participants).length);
           setIsparticipated( Boolean(data.participants[user]));
           setIsInterested( Boolean(data.interested[user]));
           setIsFav(Boolean(currentUser.favEvents[id]))

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

       
          
      }, [id,patchFav,patchInterested,patchParticipate]);

  

    

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
              <button type="button" className="btn btn-light " data-mdb-ripple-color="dark" >
               
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
                                            <img src={a.reviewerPhoto} alt="picture" />
                                        </figure>
                                </div>
                                {/* <!-- profile picture end --> */}

                                <div className="posted-author">
                                    <h6 className="author"><a href="profile.html">{a.reviewerPseudo}</a></h6>
                                    <span class="post-time">{new Date(a.timestamp).toString().substring(0, 24)}</span>

                                </div >
                                { alpha ? (

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
                      <button className="btn btn-primary  " style={{ marginRight: '100px' }}onClick={handleShowMoreClick}>Show More</button>
                      <button className="btn btn-secondary "  onClick={showLessReviews}>Show Less</button>
                      </div>
                                


                        {/* <!-- post status end --> */}
       
                  </div>



                  <div className="col-xl-6">
                    <div className='d-flex justify-content-end'>
                    {isFav ? (  
                         <button className='like-button'>
                                   <img className="heart-color" src="../assets/images/icons/heart-color.png"  onClick={patchFav} alt=""style={{width:"30px"}} /> 
                     </button>
                                    
                                    
                                    
                                    ):( 
                    <button className='like-button'>
                                    <img className="heart" src="../assets/images/icons/heart.png" alt="" style={{width:"30px"}} onClick={patchFav} />
                     </button>
                     )}
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
                                <label className="form-label" >{event.descriptionEvent}</label>
                                <br />
                                <h4 className="widget-title"><i className="bi bi-share" style={{paddingRight: "10px"}}></i>Details : </h4>
                                <label className="form-label" ><b>Date :</b>{new Date(event.dateEvent).toString().substring(0, 24)}</label>
                                <br />
                                <label className="form-label" ><b>Type :</b>{event.typeEvent}</label>
                                <br />
                                <label className="form-label" ><b>Price :</b>{event.priceEvent}</label>
                              <br/>

                              {alpha ? ( <></>
                                    
                                    
                                    
                                    ):( 
                  
                                
                                
                                
                                <div className="d-flex justify-content-center" style={{ paddingRight: "10px" }}>

                                                             

                             { !isEventTimePassed && (isInterested ? (
                         <button type="button" className="btn btn-secondary btn-lg"  onClick={() => {
                                                                           patchInterested();
                                                                         }}>Interested In</button>

                                                                         ) : (

                         <button type="button" className="btn btn-light btn-lg"  onClick={() => {
                                                                           patchInterested();
                                                                         }}>are you interested ?</button>
                                                                         ))}


                       {  !isEventTimePassed && (isparticipated ? (
                         <button type="button" className="btn btn-info btn-lg"  onClick={() => {
                                                                           patchParticipate();
                                                                         }}>Participated In</button>

                                                                         ) : (

                         <button type="button" className="btn btn-danger btn-lg"  onClick={() => {
                                                                           patchParticipate();
                                                                         }}>Want to participate ?</button>
                                                                         ))}


                               
                               
                         </div>)}




                                </div>
                  
                                  

                  </div>
                  <br/> <br/>

                  <div className="justify-content-center d-flex">

                        <div className ="card widget-item  justify-content-center d-flex " style={{width:"80%"}}>

                                <div className="form-outline mb-4">
                                <h4 className="widget-title"><i className="bi bi-location-pointer" style={{paddingRight: "10px"}}></i>Location : </h4>
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

          {alpha ? (
              <Container className="mt-10 p-4">
              <Col md={4} lg={4} sm={4}>

              <h2>Event Management</h2>
                <hr />


                
              </Col>
            
              <div class="button-container justify-content-left d-flex" 
                           >
                          <button type="button" className="btn btn-primary btn-lg " style={{marginRight: "20px"}}  >
                          <Link to={`http://localhost:3000/presenceList/${id}`}>  Check List Of Presence </Link>

                            </button>

                          <button type="button" className="btn btn-primary btn-lg " style={{marginRight: "20px"}}  >
                          <Link to={`http://localhost:3000/partners/${id}`}>  Add Parteners </Link>

                             </button>

                          <button className="btn btn-primary btn-lg" style={{marginRight: "20px"}} >
                          <Link to={`http://localhost:3000/updateEvent/${id}}`}>  Update Event </Link>
                              </button>

                          </div>


       </Container >


          ):(
          <Container className="mt-10 p-4">
               <Col md={4} lg={4} sm={4}>

                <h2>Add Review</h2>
                  <hr />


                  
                </Col>
                <div className="row">    
                <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={handleRatingChange}

                 />   
                  <label className="form-label" >Rate your experience</label>
                  <br/>

                            
                            <div className="form-outline mb-4">
                            <input type="text" id="form3Example8" className="form-control form-control-lg"  value={revieew} onChange={(e) => setRevieew(e.target.value)}/>
                       
                            <label className="form-label" >Description</label>
                            </div>
                            <button 
                                                style={{
                                                    marginRight: '40px',
                                                    color: '#dc4734',
                                                    backgroundColor: 'transparent',
                                                    border: '2px solid #dc4734',
                                                    borderRadius: '20px',
                                                    padding: '5px 5px',
                                                    transition: 'all 0.3s ease',
                                                    fontWeight: 'bold'
                                                }}
                                                onMouseEnter={e => e.target.style.backgroundColor = '#f5e1e1'}
                                                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                                                onClick={()=>{handleSubmit();}}                                                >
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