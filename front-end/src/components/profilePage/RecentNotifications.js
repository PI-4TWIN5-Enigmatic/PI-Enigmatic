import React from 'react'
import { useEffect, useState } from 'react';
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams } from 'react-router-dom';

const RecentNotifications = () => {
    // const [cookies,setCookies] = useCookies(["access_token"]);
    const token =window.localStorage.getItem("token");
    const [cookies,setCookies] = useCookies(["access_token"]);

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



  return (
<>


<div className ="card widget-item">
                                <h4 className ="widget-title">List Of The Non-Profit Organisation </h4>
                                <div className ="widget-body">
                                    <ul className ="like-page-list-wrapper">

                                        {association.map((a)=>
                                        
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
                                        

                                 
                                    </ul>
                                </div>
                            </div>



</>  

)
}

export default RecentNotifications