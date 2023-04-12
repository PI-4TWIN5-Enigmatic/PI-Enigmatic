import React from 'react'
import { useEffect, useState } from 'react';
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams } from 'react-router-dom';
import {ImArrowDown2 , ImArrowUp2 } from "react-icons/im";
const RecentNotifications = () => {
    // const [cookies,setCookies] = useCookies(["access_token"]);
    const token =window.localStorage.getItem("token");
    const [cookies,setCookies] = useCookies(["access_token"]);
    const [showMoreReviews, setShowMoreReviews] = useState(false);
    const [numReviews, setNumReviews] = useState(4);

    const  [association,setAssociation]=useState([]);

        const getAssociations = async()=>{
            const response = await fetch ("http://127.0.0.1:8000/association/getAll" , {
            method:"GET",
        
            });
        
            const data = await response.json();
            setAssociation(data);
            console.log(data);
        };


        useEffect(()=>{
            // setCookies("access_token", token);

            getAssociations();
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


<div className ="card widget-item">
                                <h4 className ="widget-title">List Of The Non-Profit Organisation </h4>
                                <div className ="widget-body">
                                    <ul className ="like-page-list-wrapper">

                                        {association.slice(0, numReviews).map((a)=>
                                        
                                        <li className ="unorder-list" key={a._id}>
                                            <div className ="profile-thumb">
                                                
                                                    <figure className ="profile-thumb-small">
                                                        <img src={a.logoPicture} alt="profile picture" />
                                                    </figure>
                                            </div>

                                            <div className ="unorder-list-info">
                                                <h3 className ="list-title"><Link to={`/association/${a._id}`}>{a.name}</Link></h3>
                                            </div>
                                        </li>
                                        
                                        )}
                                         <div className='d-flex justify-content-center '>
                                         <button 
                                                style={{
                                                    marginRight: '40px',
                                                    color: 'white',
                                                    backgroundColor: '#dc4734',
                                                    border: '2px solid #dc4734',
                                                    borderRadius: '10px',
                                                    padding: '5px 5px',
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
                                                            borderRadius: '10px',
                                                            padding: '5px 5px',
                                                            transition: 'all 0.3s ease',
                                                            fontWeight: 'bold'
                                                        }}
                                                        onMouseEnter={e => e.target.style.backgroundColor = '#dc4734'}
                                                        onClick={showLessReviews}
                                                        >
                                <ImArrowUp2 className="icon" />

                                                        </button>                   
                                        </div>

                                 
                                    </ul>
                                </div>
                            </div>



</>  

)
}

export default RecentNotifications