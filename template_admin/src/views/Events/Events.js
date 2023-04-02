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
import ReactPaginate from 'react-paginate';
import './Event.css'


const Events = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cookies, _]=useCookies(['access_token'])

  const [banDate, setBanDate] = useState("");

  const  [Events,setEvents]=useState([]);

  const  [association,setAssociation]=useState([]);


  const[query,setQuery]=useState('')

    const [data, setData] = useState(null);


    useEffect(() => {
      axios.get("http://127.0.0.1:8000/event/getAllEvent", {headers:{Authorization:cookies.access_token}}).then((response) => {
          setEvents(response.data);
      });
    }, []);


    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };


    const pageCount = Math.ceil(
      Events.filter(
        (u) =>
        u.nameEvent.toLowerCase().includes(query)
      ).length / itemsPerPage
    );





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
  <CCardHeader  > <CCardTitle style={{color:"#3622e8"}}>Event Management<hr /> </CCardTitle></CCardHeader>
  <CCardBody>
   
  <CTable hover>
 <CTableHead>
   <CTableRow>
<CTableHeaderCell scope="col">Name</CTableHeaderCell>
<CTableHeaderCell scope="col">Description</CTableHeaderCell>

     <CTableHeaderCell scope="col">Type</CTableHeaderCell>
     <CTableHeaderCell scope="col">Location</CTableHeaderCell>
     <CTableHeaderCell scope="col">Date</CTableHeaderCell>
     <CTableHeaderCell scope="col">Poster</CTableHeaderCell>

     <CTableHeaderCell scope="col">Association</CTableHeaderCell>

        </CTableRow>
 </CTableHead>
 <CTableBody >
      {cookies.access_token &&
        Events.filter((e)=>e.nameEvent.toLowerCase().includes(query))
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((e) => (
       <CTableRow key={e._id}>
           <CTableDataCell  >{e.nameEvent}</CTableDataCell>
           <CTableDataCell style={{  maxWidth: "200px"}} >{e.descriptionEvent}</CTableDataCell>

           <CTableDataCell  >{e.typeEvent}</CTableDataCell>

           <CTableDataCell  >{e.locationEvent}</CTableDataCell>

           <CTableDataCell  >{e.dateEvent}</CTableDataCell>
           <CTableDataCell  >< img src={e.eventPicture} style={{width:"50%"}}/> </CTableDataCell>

           <CTableDataCell  >

           <Link to={`/association/${e.organisateurEvent}`}><CButton   color="info" variant="ghost">Details Association</CButton></Link>

           </CTableDataCell>


         </CTableRow>
      ))}
   </CTableBody>
   </CTable>

   <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                disabledClassName={'disabled'}
                                activeClassName={'active'}
                              />
   </CCardBody>
  
  </CCard>
        </>
            
    )
    
 
}

export default Events;