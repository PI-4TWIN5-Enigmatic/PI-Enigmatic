import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const RecentNotifications = () => {

    const {id} = useParams();
    const Navigate = useNavigate();

   const goEvent =()=>{
        Navigate(`/createEvent/${id}`);
    }



  return (
<>

<div className ="card widget-item">
                                <h4 className ="widget-title">Event Section</h4>
                                <div className ="widget-body">
                                    <li class="unorder-list">
                                   
                                            <div className="profile-thumb">
                                                    <figure className="profile-thumb-small" onClick={goEvent}>
                                                        <img src="../assets/images/profile/add.png" alt="profile" />
                                                    </figure>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a>Want to add an event ? Click right here </a></h3>
                                            </div>
                                        </li>
                                  
                            

                                 
                                </div>
                            </div>



</>  )
}

export default RecentNotifications