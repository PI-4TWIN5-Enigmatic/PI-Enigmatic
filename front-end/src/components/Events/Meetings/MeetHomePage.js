import React ,{useEffect}from 'react'
import { BsCamera , BsCalendarCheck } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {  useCookies } from "react-cookie";

const MeetHomePage = () => {
    const{id}=useParams();
    const [roomcode,setRoomcode]=useState('')
    const [date,setDate]=useState('')
    const navigate = useNavigate();
    const submit=(ev)=>{
        ev.preventDefault();
        window.location.replace(roomcode);}
        const [cookies, _]=useCookies(['access_token'])

        useEffect(() => {
            
            fetch(`http://localhost:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
              .then(response => response.json())
              .then(data => {
                setRoomcode(data.eventLink)})
            })
  return (
    <>

    <div className="col-md-2">
        <div className="header-top sticky bg-white d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              
              <div className="col-md-5">
              < h2 className="notification-trigger">GiveBack Meet </h2>

                </div>



                    <div className="col-md-2">
                            
                            <div className="brand-logo text-center">
                                <a href="index.html">
                                    <img src="../../assets/enigmatic.jpg" alt="brand logo" style={{width:"40%"}} />
                                </a>
                            </div>
                        
                        </div>
                        <div className="col-md-5 d-flex justify-content-end">  
                            <div className="d-flex" style={{ fontSize:" 1.8em" , paddingRight:"20px" }} >
                        <BsCalendarCheck />
                        </div>
                        <div className=" d-flex " style={{ fontSize:" 1.8em" }} >
                        <SiGooglemeet />
                        </div></div>
                      

              </div>
              </div>

                       



             </div>    
             </div>    

             
                                    
               <br />
               <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >   

          
                   <div className="container py-5 h-100">
               
                   <div className="row d-flex justify-content-center align-items-center h-100">
           
           
                   <div className="card card-registration my-4">
        
               
                    <div className='d-flex ' >
                        <img src="../../assets/images/meet.png"  style={{width:"580px"}}/>

                        <div>
                            <h1> Premium Video Meetings.</h1>
                            <hr/>
                            <h2> Now available and free for every non-profit organisation</h2>                    
                            <p> Communicate, Collaborate and Celebrate the good times wherever you are with GiveBack Meet </p>                    
                        <div className="col">
              
                        <form onSubmit={submit}> 
                        <input type="text"  className="form-control form-control-lg"  placeholder={roomcode} value={roomcode} onChange={(e)=>setRoomcode(e.target.value)}/>
                        <button className='btn btn-danger' type='submit' > Join Meet </button>
                        
                        </form> 
                        <div className='d-flex justify-content-end'>
                        <button className='btn btn-dark' onClick={()=>{navigate(-1)}}  > Leave </button>

                        </div>

                       

                        </div>

                    </div>

                    </div>

                        </div>       
                    </div>
                </div>
                </section>

   
  
  
  
  </>
  )
}

export default MeetHomePage