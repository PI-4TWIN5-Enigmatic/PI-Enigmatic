import React,{useState,useEffect , } from 'react'
import { Cookies, useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import DoneAllIcon from '@mui/icons-material/DoneAll';
const Participation = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[event,setEvent]=useState([]);
    console.log("participation", event)
    const user =localStorage.getItem('id')
    

    useEffect(() => {
      fetch(`http://localhost:8000/event/getParticipation`, {
        method: "POST",  headers: {
          "Content-Type": "application/json"
        },
          body: JSON.stringify({ idUser: user}),
    })

          .then(response => response.json())
          .then(data => {
            setEvent(data)
            })
          .catch(error => console.error(error));
      }, []);
      


  

  return (

    
  
        <>
          <div className="card card-registration my-4" >
            <h3><u>Discover Your Events</u></h3>
            <br/>
          
            <div className="justify-content-center d-flex">
                <div className="row">
                  
                  {event.length === 0 ? (
                      <img
                      src={'../errorPart.png '}
                      alt="Event picture"
                      style={{ pointerEvents: "none" }}
                    />
                  ) :null}

                  {event.map((e) => (
                        
                    <div className="col-sm-4" key={e._id}>
                      <li className="unorder-list">
                        <div
                          className="card widget-item"
                          style={{ width: "500px", margin: "20px" }}
                        >
                          <h4 className="widget-title">{e.nameEvent} </h4>
    
                          <div className="d-flex justify-content-left"></div>
                          <div style={{ marginRight: "15px" }}></div>
                          <div className="widget-body">
                            <div className="add-thumb">
                              <a href="#">
                                <img
                                  src={e.eventPicture}
                                  alt="Event picture"
                                  style={{ pointerEvents: "none" }}
                                />
                              </a>
                            </div>
                            <p>
                              <AccessTimeIcon style={{paddingRight:"6px"}} />
                              {new Date(e.dateEvent).toString().substring(0, 24)}
                              </p>
                              <p>
                                <AttachMoneyIcon style={{paddingRight:"6px"}} />
                                <b>{e.typeEvent}</b></p>
                                <button className='btn btn-dark ' style={{alignItems:'center'}}> 
                                <button style={{paddingRight:"20px"}}>
                                      <Link
                                        to={`http://localhost:3000/EventDetails/${e._id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                      >
                                        Participated 
                                      </Link>
                                      <DoneAllIcon style={{color:'white' , paddingLeft:"7px" , fontSize:"30px"}}/>

                                    </button></button>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </>
    
    
)
}

export default Participation