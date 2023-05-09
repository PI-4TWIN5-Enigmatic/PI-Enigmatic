import React ,{useState,useEffect} from 'react'
import Navbar from '../../Navbar/Navbar'
import Events from './Event.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EventsList from './EventsList';
import Participation from './Participation';
import Intrested from './Intrested';
import Organizer from './Organizer';
const EventsHomePage = () => {
    const[visible,setVisible]=useState('none')
    const[visiblee,setVisiblee]=useState('block')
    const[visibilityy,setVisibility]=useState('block')
    const[visibilityyy,setVisibilityy]=useState('none')
    const[intrested,setIntrested]=useState('none')
    const[organizer,setOrganizer]=useState('none')

    const visibility=()=>{
        if(visible==='none'){
            setVisible('block') 
            setVisiblee('none') 

        }
        else{
            setVisible('none') 
            setVisiblee('block') 

        }
    }


  return (

<>
<Navbar/>
    <div className="d-flex flex-row justify-content-between align-items-start" >

    <aside className='lol'  >
                <p style={{fontSize:"40px"}}> Events </p>
                <a href="javascript:void(0) " onClick={()=>{ 
                    setVisibility('block')
                    setVisibilityy('none')
                    setOrganizer('none')
                    setIntrested('none')

                    }}>
                    Home Page
                </a>
                <a href="javascript:void(0)"  onClick={visibility}>
                    Your Events
                     <ArrowDownwardIcon style={{fontSize:"15px" , display:visiblee}}/> 
                     <ArrowUpwardIcon style={{fontSize:"15px" , display:visible}}/> 
                </a>               
                <a href="javascript:void(0)" style={{ display: visible }} 
                onClick={()=>{ setVisibility('none')
                setIntrested('none')
                setOrganizer('none')
                setVisibilityy('block')
                }}>
                    Participated
                </a>
                <a href="javascript:void(0)" style={{ display: visible }}
                onClick={()=>{
                    setVisibility('none')
                    setVisibilityy('none')
                    setOrganizer('none')
                    setIntrested('block')
                }}
                >
                    Interested
                </a>
                <a href="javascript:void(0)" style={{ display: visible }} 
                    onClick={()=>{
                            setVisibility('none')
                            setVisibilityy('none')
                            setIntrested('none')
                            setOrganizer('block')

                    }}
                >
                    Organizer
                </a>
                <a href="javascript:void(0)" style={{ display: visible }}>
                    Passed Event
                </a>
                <a href="javascript:void(0)">
                    NGO's Birthday

                </a>
                </aside>

                <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" , display:visibilityy}}>

            <EventsList  />

            </div>
            <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" , display:visibilityyy}}>

                <Participation  />

                </div>

                <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" ,display:intrested}}>

                    <Intrested  />

                    </div>

                    <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" ,display:organizer}}>

                    <Organizer  />

                    </div>

                    </div>

        
</>
   

  )
}

export default EventsHomePage