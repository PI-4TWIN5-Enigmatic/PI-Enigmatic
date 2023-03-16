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


        const asso = association.map(function(element){
            return [`${element.name}`];})

            const assoo = association.map(function(element){
                return [`${element.logoPicture}`];})

                const associa = association.map(function(element){
                    return [`${element._id}`];})


  return (
<>

<div className ="card widget-item">
                                <h4 className ="widget-title">Non-profit organisation you may like</h4>
                                <div className ="widget-body">
                                    <ul className ="like-page-list-wrapper">
                                        <li className ="unorder-list">
                                            <div className ="profile-thumb">
                                                <a href="#">
                                                    <figure className ="profile-thumb-small">
                                                        <img src={assoo[0]} alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className ="unorder-list-info">
                                                <h3 className ="list-title"><a href={`http://localhost:3000/association/${associa[0]}`}>{asso[0]}</a></h3>
                                            </div>
                                        </li>

                                 
                                    </ul>
                                </div>
                            </div>



</>  

)
}

export default RecentNotifications