import React from 'react'
import { useEffect, useState } from 'react';

const RecentNotifications = () => {

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
            getAssociations();
        },[]);



  return (
<>


<div className ="card widget-item">
                                <h4 className ="widget-title">List Of The Non-Profit Organisation </h4>
                                <div className ="widget-body">
                                    <ul className ="like-page-list-wrapper">

                                        {association.map((a)=>
                                        
                                        <li className ="unorder-list" key={a._id}>
                                            <div className ="profile-thumb">
                                                <a href="#">
                                                    <figure className ="profile-thumb-small">
                                                        <img src={a.logoPicture} alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className ="unorder-list-info">
                                                <h3 className ="list-title"><a href={`http://localhost:3000/association/${a._id}`}>{a.name}</a></h3>
                                            </div>
                                        </li>
                                        
                                        
                                        )}
                                        

                                 
                                    </ul>
                                </div>
                            </div>



</>  

)
}

export default RecentNotifications