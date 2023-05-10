import React ,{useState} from 'react'
import Navbar from '../../Navbar/Navbar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EventsList from './EventsList';
import Participation from './Participation';
import Intrested from './Intrested';
import EventCss from './Event.css'
import PassedEvents from './PassedEvents';
import Birthdays from './Birthdays';
const EventsHomePage = () => {
    const[visible,setVisible]=useState('none')
    const[visiblee,setVisiblee]=useState('block')
    const[visibilityy,setVisibility]=useState('block')
    const[visibilityyy,setVisibilityy]=useState('none')
    const[intrested,setIntrested]=useState('none')
    const[organizer,setOrganizer]=useState('none')
    const[vBirthday,setV]=useState('none')
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
    <div className="d-flex flex-row justify-content-between align-items-start"  >

    <aside className='homeevent'  >
                <p style={{fontSize:"40px"}}> Events </p>
                <a href="javascript:void(0) " onClick={()=>{ 
                    setVisibility('block')
                    setVisibilityy('none')
                    setOrganizer('none')
                    setIntrested('none')
                    setV('none')

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
                setV('none')

                }}>
                    Participated
                </a>
                <a href="javascript:void(0)" style={{ display: visible }}
                onClick={()=>{
                    setVisibility('none')
                    setVisibilityy('none')
                    setOrganizer('none')
                    setIntrested('block')
                    setV('none')

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
                        setV('none')


                }}
                >
                    Passed Event
                </a>
                <a href="javascript:void(0)" onClick={()=>{ 
                    setVisibility('none')
                    setVisibilityy('none')
                    setOrganizer('none')
                    setIntrested('none')
                    setV('block')
                    }}>
                    Celebrating NGO's Anniversary

                </a>
                </aside>

                <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" , display:visibilityy , width:"96%"}}>

            <EventsList  />

            </div>
            <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" , display:visibilityyy}}>

                <Participation  />

                </div>

                <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" ,display:intrested}}>

                    <Intrested  />

                    </div>

                    <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" ,display:organizer , width:"96%"}}>

                        <PassedEvents  />

                        </div>
                        <div className="flex-grow-1  align-items-start" style={{paddingLeft:"20px" ,marginTop: "118px" ,paddingRight:"25px" ,display:vBirthday , width:"88%"}}>

                        <Birthdays  />

                        </div>

                    </div>

        
</>
   

  )
}

export default EventsHomePage