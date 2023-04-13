import React from 'react'
import { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ImArrowDown2 , ImArrowUp2 } from "react-icons/im";

const LikedPages = () => {

    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [numReviews, setNumReviews] = useState(4);
    const [user,setUser]= useState(null);
    const [events,setEvents]= useState(null);
    const [favEvents,setFavEvents]= useState(null);
    const {id} = useParams();
    const token = useSelector((state) => state.token);
    const getUser = async()=>{

        const response = await fetch (`http://localhost:8000/api/getuser/${id}` , {
        method:"GET",
        headers: { Authorization: `Bearer ${token}` },
    
    
    
        });
    
        const data = await response.json();
        setUser(data);
        setEvents( Object.keys(data.favEvents))
        console.log(data);
        fetch(`http://localhost:8000/event/getEventsByIds` ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ids: Object.keys(data.favEvents) }),
        })
        .then(response => response.json())
        .then(dataa => {
            setFavEvents(dataa);
          console.log(dataa);
        })
    };

    useEffect(()=>{
        getUser();
      
    },[]);

    const handleShowMoreClick = () => {
        setShowMoreReviews(true);
        setNumReviews(numReviews + 4);
      };

      const showLessReviews = () => {
        setNumReviews(4);
      };


   
    



      
  return (

    <>


                        <div className="card widget-item">
                                <h4 className="widget-title">Your Favorite Events</h4>
                                <div className="widget-body">
                                    <ul className="like-page-list-wrapper">
                                        {favEvents && favEvents.map((e)=>
                                        <li className="unorder-list" key={e._id}>
                                            <div className="profile-thumb">
                                                <a >
                                                    <figure className="profile-thumb-small">
                                                        <img src={e.eventPicture} alt="Event pic"  />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><Link to={`/EventDetails/${e._id}`} >{e.nameEvent}</Link></h3>
                                                <p className="list-subtitle">{e.typeEvent}</p>
                                            </div>
                                            <button className="like-button active">
                                                <img className="heart" src="../assets/images/icons/heart.png" alt="" />
                                                <img className="heart-color" src="../assets/images/icons/heart-color.png" alt="" />
                                            </button>
                                        </li>
                                        )}
                                        
                                    </ul>
                                </div>
                                <div className='d-flex justify-content-center '>
                                         <button 
                                                style={{
                                                    marginRight: '40px',
                                                    color: 'white',
                                                    backgroundColor: '#dc4734',
                                                    border: '2px solid #dc4734',
                                                    borderRadius: '20px',
                                                    padding: '3px 3px',
                                                    transition: 'all 0.3s ease',
                                                    fontWeight: 'bold'
                                                }}
                                                onMouseEnter={e => e.target.style.backgroundColor = '#dc4734'}
                                                onClick={handleShowMoreClick}
                                                >
                                <ImArrowDown2 className="icon" />

                                                </button>                
                                                <button
                                                        style={{
                                                            marginRight: '40px',
                                                            color: 'white',
                                                            backgroundColor: '#dc4734',
                                                            border: '2px solid #dc4734',
                                                            borderRadius: '20px',
                                                            padding: '3px 3px',
                                                            transition: 'all 0.3s ease',
                                                            fontWeight: 'bold'
                                                        }}
                                                        onMouseEnter={e => e.target.style.backgroundColor = '#dc4734'}
                                                        onClick={showLessReviews}
                                                        >
                                <ImArrowUp2 className="icon" />

                                                        </button>                   
                                        </div>
                            </div>

                                
                                </>

    
  )
}

export default LikedPages