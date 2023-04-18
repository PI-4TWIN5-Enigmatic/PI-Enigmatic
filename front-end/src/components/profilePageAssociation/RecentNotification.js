import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useCookies } from 'react-cookie';

const RecentNotifications = () => {

    const idCurrentUser =window.localStorage.getItem("id");


    const [association,setAssociation]= useState(null);
    const [alpha,setAlpha]= useState(null);
    const {id} = useParams();
    const [cookies, _] = useCookies(['access_token'])


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
                console.log("🚀 ~ file: RecentNotification.js:28 ~ areIdsEqual ~ alpha:", alphaa);
            } else {
                console.log("association is null or does not have a founder property");
            }
        })
          .catch(error => console.error(error));

      }, []);

    

      


    
  return (
<>


            {alpha ? (

                        <div className ="card widget-item">
                                <h4 className ="widget-title">Create an Event </h4>
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


            ) : ( 
              <div className ="card widget-item">
                       
                                  <h4 className ="widget-title">Welcoming Section </h4>
                                <div className ="widget-body">
                                    <li class="unorder-list">
                                   
                                            <div className="profile-thumb">
                                            
                                                      <figure className="profile-thumb-small" >
                                                          <img src="../assets/images/welcome.jpg" alt="profile" style={{width:"200px"}} />
                                                      </figure> 
                                            </div>
                                          
                                             <h3 className="list-title">Welcome to our Non-Profit organisation</h3>
                                        </li>
                                                                                         
                                </div>
                            </div>


            )}



</>  )
}

export default RecentNotifications