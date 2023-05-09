import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const Events = () => {
    const navigate= useNavigate()
  return (
    <>


    <div className="card widget-item" >
            <h4 className="widget-title">
            <Link to={`http://localhost:3000/EventsHomePage`} style={{ textDecoration: 'none', color: 'black' }}>Events</Link>
                
                </h4>
            <div className="widget-body">
                <ul className="like-page-list-wrapper">
                    <li className="unorder-list">
                        <div className="profile-thumb">
                                    <img src="../../Events.png" alt="profile picture"  onClick={()=>{navigate('/EventsHomePage')}}/>
                        </div>

                       </li></ul></div></div>
            </>
)
}

export default Events