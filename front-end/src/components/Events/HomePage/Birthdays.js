import React,{useState,useEffect } from 'react'
import { Cookies, useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import moment from 'moment';
import { Navigate } from 'react-router-dom';
const Birthdays = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[event,setEvent]=useState([]);
    console.log("organisateur", event)
    const user =localStorage.getItem('id')
    const navigate=useNavigate();

    useEffect(() => {
      fetch(`http://localhost:8000/association/getAll`)
          .then(response => response.json())
          .then(data => {
            setEvent(data)
            })
          .catch(error => console.error(error));
      }, []);
      
      const handleFilterByTimePeriodToday = (event) => {
        const todayStart = moment().startOf('day').format("MM/DD")
        const anniversaryEvents = event.filter(e => moment(e.foundationDate).format("MM/DD") === todayStart);
            return anniversaryEvents
        }
    
        const handleFilterByTimePeriodTomorrow = (event) => {
          const tomorrowEnd = moment().add(1, 'day').endOf('day').format("MM/DD");
          const tomorrow = event.filter(e => moment(e.foundationDate).format("MM/DD") === tomorrowEnd);
              return tomorrow
          }
          const handleFilterByTimePeriodPassed = (event) => {
            const currentTime = moment().format('MM/DD');
            const passedEvents = event.filter(e => moment(e.foundationDate).format('MM/DD') < currentTime);
          
            passedEvents.sort((a, b) => {
              const dateA = moment(a.foundationDate);
              const dateB = moment(b.foundationDate);
              return dateA.diff(dateB);
            });
          
            return passedEvents;
          }
          
          

          const handleFilterByTimePeriodUpcoming = (event) => {
            const tomorrowEnd = moment().add(1, 'day').endOf('day').format("MM/DD");
            const upcomingEvents = event.filter(e => moment(e.foundationDate).format('MM/DD') > tomorrowEnd);
          
            upcomingEvents.sort((a, b) => {
              const dateA = moment(a.foundationDate);
              const dateB = moment(b.foundationDate);
              return dateA.diff(dateB);
            });
          
            return upcomingEvents;
          }
          
          
          
          
          

  return (

    
  
        <>
          <div className="card card-registration my-4"  style={{backgroundImage:"url('../../r.png')" ,  backgroundRepeat: "no-repeat", backgroundSize: "cover" , backgroundPosition: "center"}}>
            <h3><u>Discover Your Events</u></h3>
            <br/>
              <div className="row g-0">

                  <div className="justify-content-center d-flex">

                      <div className="card widget-item  justify-content-center d-flex " style={{width:"75%"}}>
        
                              <h5 className=" text-uppercase justify-content-center d-flex">Today's NGO anniversary </h5>   
                              <hr />
                              {handleFilterByTimePeriodToday(event).length === 0 ? (
                                                                     <p className='d-flex justify-content-center'>No Anniversarys Today !</p>

                              ) :null}                        
                  
                  {handleFilterByTimePeriodToday(event).map((e) => {
                                                          return (

                                  <div className="row " style={{width:"900px" }} >
                                      <div className="col "  key={e._id}  >
                                              <div className="row" style={{justifyContent:'center'}}>
                                                  <div className="col col-sm-6   " style={{alignItems:'between'}}>
                                                      <div className="friend-list-view" style={{justifyContent:'space-between'}}>
                                                          <div className="profile-thumb">
                                                                  <figure class="profile-thumb-middle">
                                                                      <img src={e.logoPicture} alt="profile "  />
                                                                  </figure>
                                                          </div>

                                                          <div className="posted-author">
                                                              <h6 className="author">{e.name}</h6>
                                                              <button className="add-frnd">{moment(e.foundationDate).format('MM/DD/YYYY')}</button>
                                                          </div>
                                                          <div className='d-flex justify-content-end' style={{paddingLeft:"100px"}}>
                                                          <button className='btn btn-danger' onClick={()=>{navigate(`/association/${e._id}`)}}> Visit Profile </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                                </div>
                                             </div>
                                       </div>     )})}   
                              </div>
                              </div>
                              </div>




                                    <br/>

                              <div className="row g-0">

                        <div className="justify-content-center d-flex">

                            <div className="card widget-item  justify-content-center d-flex " style={{width:"75%"}}>

                                    <h5 className=" text-uppercase justify-content-center d-flex">Tomorrow's NGO anniversary </h5>   
                                    <hr />
                                    {handleFilterByTimePeriodTomorrow(event).length === 0 ? (
                                                                     <p className='d-flex justify-content-center'>No Anniversaries Tomorrow !</p>
                                                                     ) :null}                        

              {handleFilterByTimePeriodTomorrow(event).map((e) => {
                                                          return (

                                  <div className="row " style={{width:"900px" }} >
                                      <div className="col "  key={e._id}  >
                                              <div className="row" style={{justifyContent:'center'}}>
                                                  <div className="col col-sm-6   " style={{alignItems:'between'}}>
                                                      <div className="friend-list-view" style={{justifyContent:'space-between'}}>
                                                          <div className="profile-thumb">
                                                                  <figure class="profile-thumb-middle">
                                                                      <img src={e.logoPicture} alt="profile "  />
                                                                  </figure>
                                                          </div>

                                                          <div className="posted-author">
                                                              <h6 className="author">{e.name}</h6>
                                                              <button className="add-frnd">{moment(e.foundationDate).format('MM/DD/YYYY')}</button>
                                                          </div>
                                                          <div className='d-flex justify-content-end' style={{paddingLeft:"100px"}}>
                                                          <button className='btn btn-danger' onClick={()=>{navigate(`/association/${e._id}`)}}> Visit Profile </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                                </div>
                                             </div>
                                       </div>     )})}   
                                    </div>
                                    </div>




                                   
                            
                              <div className="row g-0" style={{  marginTop:'20px'}}>
                        <div className="justify-content-center d-flex">

                            <div className="card widget-item  justify-content-center d-flex " style={{width:"75%"}}>

                                    <h5 className=" text-uppercase justify-content-center d-flex">Upcoming NGO's anniversary </h5>   
                                    <hr />
                                    {handleFilterByTimePeriodUpcoming(event).length === 0 ? (
                                                                     <p className='d-flex justify-content-center'>No Upcoming Anniversaries !</p>
                                                                     ) :null}                        

{handleFilterByTimePeriodUpcoming(event).map((e) => {
                                                          return (

                                  <div className="row " style={{width:"900px" }} >
                                      <div className="col "  key={e._id}  >
                                              <div className="row" style={{justifyContent:'center'}}>
                                                  <div className="col col-sm-6   " style={{alignItems:'between'}}>
                                                      <div className="friend-list-view" style={{justifyContent:'space-between'}}>
                                                          <div className="profile-thumb">
                                                                  <figure class="profile-thumb-middle">
                                                                      <img src={e.logoPicture} alt="profile "  />
                                                                  </figure>
                                                          </div>

                                                          <div className="posted-author">
                                                              <h6 className="author">{e.name}</h6>
                                                              <button className="add-frnd">{moment(e.foundationDate).format('MM/DD/YYYY')}</button>
                                                          </div>
                                                          <div className='d-flex justify-content-end' style={{paddingLeft:"100px"}}>
                                                          <button className='btn btn-danger' onClick={()=>{navigate(`/association/${e._id}`)}}> Visit Profile </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                                </div>
                                             </div>
                                       </div>     )})}   
                                                         </div>
                                    </div>
                                    </div>



                          <div className="row g-0" style={{  marginTop:'20px'}}>
                          <div className="justify-content-center d-flex">

                          <div className="card widget-item  justify-content-center d-flex " style={{width:"75%"}}>

                                <h5 className=" text-uppercase justify-content-center d-flex">Passed NGO's anniversary </h5>   
                                <hr />
                                {handleFilterByTimePeriodPassed(event).length === 0 ? (
                                                                     <p className='d-flex justify-content-center'>No Passed Anniversaries !</p>
                                                                     ) :null}                        

            {handleFilterByTimePeriodPassed(event).map((e) => {
                                                          return (

                                  <div className="row " style={{width:"900px" }} >
                                      <div className="col "  key={e._id}  >
                                              <div className="row" style={{justifyContent:'center'}}>
                                                  <div className="col col-sm-6   " style={{alignItems:'between'}}>
                                                      <div className="friend-list-view" style={{justifyContent:'space-between'}}>
                                                          <div className="profile-thumb">
                                                                  <figure class="profile-thumb-middle">
                                                                      <img src={e.logoPicture} alt="profile "  />
                                                                  </figure>
                                                          </div>

                                                          <div className="posted-author">
                                                              <h6 className="author">{e.name}</h6>
                                                              <button className="add-frnd">{moment(e.foundationDate).format('MM/DD/YYYY')}</button>
                                                          </div>
                                                          <div className='d-flex justify-content-end' style={{paddingLeft:"100px"}}>
                                                          <button className='btn btn-danger'  onClick={()=>{navigate(`/association/${e._id}`)}}> Visit Profile </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                                </div>
                                             </div>
                                       </div>     )})}                                                     
                                                  </div>                                                          

                                                  </div>
                                                  </div>
                                


            </div>                                                          

          
         
            </div>
        </>
    
    
)
}

export default Birthdays