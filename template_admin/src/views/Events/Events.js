import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { MDBCol} from "mdbreact";
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { Link } from 'react-router-dom';


const Events = () => {
  const [cookies, _]=useCookies(['access_token'])

  const [banDate, setBanDate] = useState("");

  const  [Events,setEvents]=useState([]);

  const  [association,setAssociation]=useState([]);


  const[query,setQuery]=useState('')

    const [data, setData] = useState(null);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/event/getAllEvent").then((response) => {
        setEvents(response.data);
    });
  }, []);




return (
  <>
  
  <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
          </span>
        </div>
        <input
          className="form-control my-0 py-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e)=>setQuery(e.target.value)}
        />
      </div>
    </MDBCol>
     
   <br></br>
       <CCard className="text-center">
  <CCardHeader  > <CCardTitle>Event Management</CCardTitle></CCardHeader>
  <CCardBody>
   
  <CTable hover>
 <CTableHead>
   <CTableRow>
<CTableHeaderCell scope="col">Name</CTableHeaderCell>
<CTableHeaderCell scope="col">Description</CTableHeaderCell>

     <CTableHeaderCell scope="col">Type</CTableHeaderCell>
     <CTableHeaderCell scope="col">Location</CTableHeaderCell>
     <CTableHeaderCell scope="col">Date</CTableHeaderCell>
     <CTableHeaderCell scope="col">Association</CTableHeaderCell>

        </CTableRow>
 </CTableHead>
 <CTableBody >
      {cookies.access_token &&
        Events.filter((e)=>e.nameEvent.toLowerCase().includes(query)).map((e) => (
       <CTableRow key={e._id}>
           <CTableDataCell  >{e.nameEvent}</CTableDataCell>
           <CTableDataCell  >{e.descriptionEvent}</CTableDataCell>

           <CTableDataCell  >{e.typeEvent}</CTableDataCell>

           <CTableDataCell  >{e.locationEvent}</CTableDataCell>
           <CTableDataCell  >{e.dateEvent}</CTableDataCell>
           <CTableDataCell  >

           <Link to={`/association/${e.organisateurEvent}`}><CButton   color="info" variant="ghost">Details Association</CButton></Link>

           </CTableDataCell>


         </CTableRow>
      ))}
   </CTableBody>
   </CTable>
   </CCardBody>
  
  </CCard>
        </>
            
    )
    
 
}

export default Events;