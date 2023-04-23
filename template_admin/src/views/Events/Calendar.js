import React , { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
import {
    CButton } from '@coreui/react'
function Calendar() {
    const [cookies, _]=useCookies(['access_token'])
    const  [Events,setEvents]=useState([]);
    const  [data,setData]=useState([{}]);
    const navigate=useNavigate();
    

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/event/getAllEvent", {headers:{Authorization:cookies.access_token}}).then((response) => {
            setEvents(response.data);
            populateDataR(response.data);
        });
      }, []);

      
      function populateDataR(data) {
        const newData = data.map((e) => ({
          title: e.nameEvent,
          date:e.dateEvent,
        }));
        setData(newData);
      }

      const goBack=()=>{
        navigate(-1)
      }
  return (
    <div>
  <div className='d-flex justify-content-end'>
    <CButton className='mr-2' color="secondary" onClick={goBack}>Go Back</CButton> 

    </div><br/><br/>


      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
       
        events={data}
      />
    </div>
  );
}

export default Calendar;