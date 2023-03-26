import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const RecentNotifications = () => {

    const idCurrentUser =window.localStorage.getItem("id");


    const [association,setAssociation]= useState(null);
    const {id} = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/association/get/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setAssociation(data);})
          .catch(error => console.error(error));
      }, []);

      // const{
      //   founder
      // }=association


    


    
  return (
<>

<div className ="card widget-item">
                                <h4 className ="widget-title">Event Section</h4>
                                <div className ="widget-body">
                                    <li class="unorder-list">
                                   
                                            <div className="profile-thumb">
                                                    <figure className="profile-thumb-small" >
                                                    <a href={`/createEvent/${id}`}>
                                                        <img src="../assets/images/profile/add.png" alt="profile"  />
                                                        </a>
                                                    </figure>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><Link to={`/createEvent/${id}`}>Want to add an event ? Click right here </Link></h3>
                                            </div>
                                        </li>
                                  
                            

                                 
                                </div>
                            </div>



</>  )
}

export default RecentNotifications