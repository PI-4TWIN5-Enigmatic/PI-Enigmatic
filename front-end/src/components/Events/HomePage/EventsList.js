import React,{useState,useEffect } from 'react'
import { Cookies, useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Rating from '@mui/material/Rating';

const EventsList = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[event,setEvent]=useState([]);
    const user =localStorage.getItem('id')
    const [isDropDown, setIsDropDown] = useState(false);
    const [isDropDownn, setIsDropDownn] = useState(false);
    const [iisDropDownn, setIIsDropDownn] = useState(false);
    const [timePeriod, setTimePeriod] = useState('');
    const[query,setQuery]=useState('')
    const[type,setType]=useState('')
    const [globalRating,setGlobalRating]= useState([]);
    const [namePosition,setNamePosition]=useState('My Position')
    const [nameDate,setNameDate]=useState('Choose any Date')
    const [nameType,setNameType]=useState('Choose  Type')
    const [colorp,setColorP]=useState(false)
    const [colorD,setColorD]=useState(false)
    const [colorT,setColorT]=useState(false)
    const [colorR,setColorR]=useState(false)
    const[data,setData]=useState([])

    const style = isDropDown ? { display: 'block' , width:"135px"  , position:'absolute' , zIndex: 1 } : {display: 'none' };
    const stylee = isDropDownn ? { display: 'block' ,width:"135px"  ,  position:'absolute' , zIndex: 1} : {display: 'none' };
    const styleee = iisDropDownn ? { display: 'block' ,width:"135px"  ,  position:'absolute' , zIndex: 1} : {display: 'none' };

    useEffect(() => {
        fetch('http://localhost:8000/event/getAllEvent')
          .then(response => response.json())
          .then(data => {
            setEvent(data)
            rating(data)
            })
          .catch(error => console.error(error));
      }, []);
      

     
      const handleFilterByTimePeriod = (event) => {
        const currentTime = moment().toISOString(); 
        const tomorrowEnd = moment().add(1, 'day').endOf('day');
        const todayStart = moment().startOf('day');
        const upcomingEvents = event.filter(e => moment(e.dateEvent).isAfter(currentTime));
        const currentEvents = event.filter(e => moment(e.dateEvent).isSameOrAfter(todayStart) && moment(e.dateEvent).isBefore(tomorrowEnd));
        const tomorrow = event.filter(e => moment(e.dateEvent).isBetween(currentTime, tomorrowEnd, null, '[]'));

        console.log("timePeriod:", timePeriod);
        console.log("event:", event);
        console.log("upcomingEvents:", upcomingEvents);
        console.log("currentEvents:", currentEvents);
        switch (timePeriod) {
          case 'Upcoming':
            return upcomingEvents;
          case 'today':
            return currentEvents;
            case 'Tomorrow':
            return tomorrow;
          default:
            return event;
        }}

        async function rating(event) {
          const newData = await Promise.all(event.map(async (e) => {
            const response = await fetch(`http://localhost:8000/event/getRating/${e._id}`);
            const rating = await response.json();
            return {
              type: e,
              value: rating
            };
          }));
          setGlobalRating(newData); 
          setData(newData.filter((data) => data.value >= 3.5));

        }
        
         
          

      
        

   
  

  return (

    
  
        <>
          <div className="card card-registration my-4" style={{position:'relative'}}>
            <h3><u>Discover Different Events</u></h3>
            <br/>
            <div className='d-flex '>
            <ul className="event-trigger" >

            <button className={colorp?'btn btn-danger' : 'btn btn-light'}  >
            <div style={{ display: 'flex', alignItems: 'center'}}>
            <LocationOnIcon />
                {namePosition}
              <ArrowDropDownIcon style={{ display: colorp ? 'none' : 'block' }} onClick={()=>{setIsDropDown(!isDropDown)    }} />
               <CloseIcon style={{ display: !colorp ? 'none' : 'block' }} onClick={()=>{setColorP(!colorp) 
                                                                                        setNamePosition('My Position')
                                                                                        setType('')
                                                                                        }} /> 
                </div>
              </button>
              <div
                            className="card "
                            style={style}
                            id="a"

                          >
                            <div className="dropdown-title">
                              <input type='text' className="recherche" placeholder='Search...' 
                              style={{outline:'none' , width:'80px' ,border: 'none', backgroundColor: 'transparent'}} onChange={(e) => setQuery(e.target.value) }  />
                            </div>
                            <button className="" onClick={
                              ()=>{setType('Online Event')
                                  setNamePosition('Online Events')
                                  setColorP(true)
                                  setIsDropDown(!isDropDown)
                                }}>OnLine</button>
                            </div>
              </ul>
              <ul className="event-trigger">

            <button className={colorD?'btn btn-danger' : 'btn btn-light'}  >
            <div style={{ display: 'flex', alignItems: 'center'}}>

              <EventAvailableIcon/>
                {nameDate}
                <ArrowDropDownIcon  style={{ display: colorD ? 'none' : 'block' }} onClick={()=>{setIsDropDownn(!isDropDownn)}}/>
               <CloseIcon  style={{ display: !colorD ? 'none' : 'block' }}  onClick={()=>{setColorD(!colorD) 
                                                                                        setNameDate('Choose any Date')
                                                                                        setTimePeriod('')
                                                                                        }}/> 
               </div>
              </button>
              
              <div
                            className="card "
                            style={stylee}
                            id="a"
                          >
                            <div className="dropdown-title">
                              <button className="" onClick={() => {
                                                              setTimePeriod('today')
                                                              setNameDate('Today')
                                                              setColorD(true)
                                                              setIsDropDownn(!isDropDownn)
                                                            }
                                                           }
                                                    >Today </button>
                            </div>
                            <div className="dropdown-title">
                              <button className="" onClick={() => {
                                                              setTimePeriod('Tomorrow')
                                                              setNameDate('Tomorrow')
                                                              setColorD(true)
                                                              setIsDropDownn(!isDropDownn)
                                                            }
                                
                                }>Tomorrow </button>
                            </div>
                              <button className="" onClick={() => {setTimePeriod('Upcoming')
                                                          setNameDate('Upcoming')
                                                          setColorD(true)
                                                          setIsDropDownn(!isDropDownn)}
                            }>Upcoming </button>
                            </div>
              </ul>

              <ul className="event-trigger">

              <button className={colorT?'btn btn-danger' : 'btn btn-light'}  >
              <div style={{ display: 'flex', alignItems: 'center'}}>

                <ViewAgendaIcon/>
                {nameType}
                <ArrowDropDownIcon style={{ display: colorT ? 'none' : 'block' }} onClick={()=>{setIIsDropDownn(!iisDropDownn)}}/>
                 <CloseIcon  style={{ display: !colorT ? 'none' : 'block' }} onClick={()=>{setColorT(!colorT) 
                                                                                        setNameType('Choose  Type')
                                                                                        setType('')
                                                                                        }}/> 
                                  </div>
                </button>
                
                <div
                              className="card "
                              style={styleee}
                              id="a"
                            >
                              <div className="dropdown-title">
                                <button className="" onClick={()=>{
                                                        setType('Paid Event') 
                                                        setNameType('Paid Event')
                                                        setColorT(true)
                                                        setIIsDropDownn(!iisDropDownn)
                                                      }
                          
                                                        }>Paid Event </button>
                              </div>
                                <button className="" onClick={()=>{
                                                        setType('Free Event')
                                                        setNameType('Free Event')
                                                        setColorT(true)
                                                        setIIsDropDownn(!iisDropDownn)
                                                      }
                                                        }>Free Event</button>
                            
                            </div>
                            
                </ul>
                <ul className="event-trigger">

                <button onClick={()=>{
                  setColorR(!colorR)}} className={colorR?'btn btn-danger' : 'btn btn-light'} 
                  
                  >
                <AutoAwesomeIcon/>
                  Top rated events
                </button>
                
                </ul>

            
            
            </div>
          
            <div className="justify-content-center d-flex"   >
            <div className="d-flex row" style={{ justifyContent:  'space-evenly'}}>
                  {event &&  handleFilterByTimePeriod(event) 
                  .filter( (e) =>e.locationEvent.toLowerCase().includes(query.toLowerCase()) &&
                  e.typeEvent.toLowerCase().includes(type.toLowerCase())) 
                   .map((e) => (
                        
                    <div className=" d-flex  col-sm-4"  key={e._id} >
                      <li className=" d-flex  unorder-list" >
                        <div
                          className="card widget-item"
                          style={{ width: "350px", margin: "20px" ,display: colorR ? 'none' : 'block'}}
                        >
                          <h4 className="widget-title"  >
                            <div className='d-flex' style={{alignItems:'center' }}>

                            {e.nameEvent}
                            {globalRating
                                          .filter((data) => data.type._id === e._id) 
                                          .map((data) => (
                                            <Rating
                                                name="simple-controlled"
                                                value={data.value}
                                                precision={0.25}
                                                size='medium'
                                                readOnly
                                                style={{marginLeft:'10px'}}
                                              />
                                          ))}

                            </div>
                                      
                                       </h4>
                          
    
                          <div className="d-flex justify-content-left"></div>
                          <div style={{ marginRight: "15px" }}></div>
                          <div className="widget-body"  >
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
                              {/* <p>{rating(e._id)}</p> */}
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
                                        Are you intrested ?
                                      </Link>
                                    </button></button>

                                                                  
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}



                </div>
                </div>

                <div className="justify-content-center d-flex"  >


                <div className="d-flex row" style={{ justifyContent: 'space-evenly'  }}>
                  {
                   data.map((e) => (
                        
                    <div className=" d-flex  col-sm-4"  key={e.type._id}  >
                      <li className=" d-flex  unorder-list"  >
                        <div
                          className="card widget-item"
                          style={{ width: "350px", margin: "20px" ,display: colorR ? 'block' : 'none'  }}
                        >
                          <h4 className="widget-title"  >
                            <div className='d-flex' style={{alignItems:'center' }}>

                            {e.type.nameEvent}
                            {globalRating
                                          .filter((data) => data.type._id === e.type._id) 
                                          .map((data) => (
                                            <Rating
                                                name="simple-controlled"
                                                value={data.value}
                                                precision={0.25}
                                                size='medium'
                                                readOnly
                                                style={{marginLeft:'10px'}}
                                              />
                                          ))}

                            </div>
                                      
                                       </h4>
                          
    
                          <div className="d-flex justify-content-left"></div>
                          <div style={{ marginRight: "15px" }}></div>
                          <div className="widget-body"  >
                            <div className="add-thumb">
                              <a href="#">
                                <img
                                  src={e.type.eventPicture}
                                  alt="Event picture"
                                  style={{ pointerEvents: "none" }}
                                />
                              </a>
                            </div>
                            <p>
                              <AccessTimeIcon style={{paddingRight:"6px"}} />
                              {new Date(e.type.dateEvent).toString().substring(0, 24)}
                              </p>
                              {/* <p>{rating(e._id)}</p> */}
                              <p>
                                <AttachMoneyIcon style={{paddingRight:"6px"}} />
                                <b>{e.type.typeEvent}</b></p>
                                <button className='btn btn-dark'> 
                                <StarBorderPurple500Icon style={{paddingRight:"6px"}}/>
                                <button>
                                      <Link
                                        to={`http://localhost:3000/EventDetails/${e.type._id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                      >
                                        Are you intrested ?
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

export default EventsList