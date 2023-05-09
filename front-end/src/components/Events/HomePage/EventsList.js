import React,{useState,useEffect , useCallback} from 'react'
import { Cookies, useCookies } from "react-cookie";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const EventsList = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[event,setEvent]=useState([]);
    console.log("🚀 ~ file: EventsList.js:7 ~ EventsList ~ event:", event)
    const user =localStorage.getItem('id')
    const [isDropDown, setIsDropDown] = useState(false);
    const [isDropDownn, setIsDropDownn] = useState(false);
    const [iisDropDownn, setIIsDropDownn] = useState(false);
    const [cool, setCool] = useState(false);
    const [timePeriod, setTimePeriod] = useState('');
    const[query,setQuery]=useState('')
    const[type,setType]=useState('')
    console.log("🚀 ~ file: EventsList.js:27 ~ EventsList ~ type:", type)
    const [globalRating,setGlobalRating]= useState(0);

    const style = isDropDown ? { display: 'block' , width:"135px"  , position:'absolute' , zIndex: 1 } : {display: 'none' };
    const stylee = isDropDownn ? { display: 'block' , position:'absolute' , zIndex: 1} : {display: 'none' };
    const styleee = iisDropDownn ? { display: 'block' , position:'absolute' , zIndex: 1} : {display: 'none' };
    const styyle = cool ? { display: 'block' } : {display: 'none' };


    useEffect(() => {
        fetch('http://localhost:8000/event/getAllEvent')
          .then(response => response.json())
          .then(data => {
            setEvent(data)
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

   
  

  return (

    
  
        <>
          <div className="card card-registration my-4" style={{position:'relative'}}>
            <h3><u>Discover Different Events</u></h3>
            <br/>
            <div className='d-flex  '>
            <ul className="event-trigger">

            <button className='btn btn-light'  onClick={()=>{setIsDropDown(!isDropDown)}}>
              <LocationOnIcon/>
              My Position
              <ArrowDropDownIcon/>
              {/* <ArrowDropUpIcon/> */}
              </button>
              
              <div
                            className="card "
                            style={style}
                            id="a"

                          >
                            <div className="dropdown-title">
                              <input type='text' className="recherche" placeholder='Search...' style={{outline:'none' , width:'80px'}} onChange={(e) => setQuery(e.target.value)}  />
                            </div>
                            <button className="" onClick={()=>{setType('Online Event')}}>OnLine</button>

                            </div>
              </ul>
              <ul className="event-trigger">

            <button className='btn btn-light'  onClick={()=>{setIsDropDownn(!isDropDownn)}}>
              <EventAvailableIcon/>
              Choose any Date
              <ArrowDropDownIcon/>
              {/* <ArrowDropUpIcon/> */}
              </button>
              
              <div
                            className="card "
                            style={stylee}
                            id="a"
                          >
                            <div className="dropdown-title">
                              <button className="" onClick={(e) => setTimePeriod('today')}>Today </button>
                            </div>
                            <div className="dropdown-title">
                              <button className="" onClick={(e) => setTimePeriod('Tomorrow')}>Tomorrow </button>
                            </div>
                            <div className="dropdown-title">
                              <button className="" onClick={(e) => setTimePeriod('Upcoming')}>Upcoming </button>
                            </div>
                              <button className="" onClick={(e) => setTimePeriod('')}>All</button>
                            </div>
              </ul>

              <ul className="event-trigger">

              <button className='btn btn-light'  onClick={()=>{setIIsDropDownn(!iisDropDownn)}}>
                <ViewAgendaIcon/>
                Choose  Type
                <ArrowDropDownIcon/>
                {/* <ArrowDropUpIcon/> */}
                </button>
                
                <div
                              className="card "
                              style={styleee}
                              id="a"
                            >
                              <div className="dropdown-title">
                                <button className="" onClick={()=>{setType('Paid Event')}}>Paid Event </button>
                              </div>
                                <button className="" onClick={()=>{setType('Free Event')}}>Free Event</button>
                              </div>
                </ul>
                <ul className="event-trigger">

                <button className='btn btn-light' >
                <AutoAwesomeIcon/>
                  Top rated events
                </button>
                
                </ul>

            
            
            </div>
          
            <div className="justify-content-center d-flex" >
                <div className="row" >
                  {event&&handleFilterByTimePeriod(event)
                  .filter( (e) =>e.locationEvent.toLowerCase().includes(query.toLowerCase()) &&
                  e.typeEvent.toLowerCase().includes(type.toLowerCase())) 
                   .map((e) => (
                        
                    <div className="col-sm-4" key={e._id} >
                      <li className="unorder-list">
                        <div
                          className="card widget-item"
                          style={{ width: "350px", margin: "20px" }}
                        >
                          <h4 className="widget-title">{e.nameEvent} </h4>
    
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
            </div>
        </>
    
    
)
}

export default EventsList