import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';





const UserWidget = () => {


 
    const [association,setAssociation]= useState(null);
    const {id} = useParams();
  
  
    const getAssociation = async()=>{
      const response = await fetch (`http://localhost:8000/association/get/${id}` , {
      method:"GET",
  
      });
  
      const data = await response.json();
      setAssociation(data);
      console.log(data);
  };

  useEffect(()=>{
    getAssociation();
},[]);

if(!association) return null ;
  

               


const{
  name,
  sector,
  foundationDate, 
  location,
  description,
  country
}=association;

  return (
    <>
                            <div className ="card widget-item">
                                <h4 className ="widget-title">{name}</h4>
                                <div className ="widget-body">
                                    <div className ="about-author">
                                    <p>{description}</p>


                                        <ul className ="author-into-list">
                                            <li><a href="#"><i className ="bi bi-office-bag"></i>{sector}</a></li>
                                            <li><a href="#"><i className ="bi bi-home"></i>{foundationDate}</a></li>
                                            <li><a href="#"><i className ="bi bi-location-pointer"></i>{location}</a></li>
                                            <li><a href="#"><i className ="bi bi-heart-beat"></i>{country}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        

    
    
    
    </>
  )
}

export default UserWidget