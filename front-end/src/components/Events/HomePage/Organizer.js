import React,{useState,useEffect , useCallback} from 'react'
import { Cookies, useCookies } from "react-cookie";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
const Organizer = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[event,setEvent]=useState([]);
    console.log("organisateur", event)
    const user =localStorage.getItem('id')

    useEffect(() => {
      fetch(`http://localhost:8000/event/getFounder`, {
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
            <div className='d-flex  '>
            <button className='btn btn-light' style={{width:"20%"}}>
              <LocationOnIcon/>
              My Position
              </button>

              <button className='btn btn-light' style={{width:"20%"}}>
              <EventIcon/>
                Choose any Date
              </button>
            </div>
          
            <div className="justify-content-center d-flex">
                <div className="row">
                  {event.map((e) => (
                        
                    <div className="col-sm-4" key={e._id}>
                      <li className="unorder-list">
                        <div
                          className="card widget-item"
                          style={{ width: "800px", margin: "20px" }}
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
                                <button className='btn btn-dark'> 
                                <StarBorderPurple500Icon style={{paddingRight:"6px"}}/>
                                <button>
                                      <Link
                                        to={`http://localhost:3000/EventDetails/${e._id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                      >
                                        Intrested yeeey
                                      </Link>
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

export default Organizer