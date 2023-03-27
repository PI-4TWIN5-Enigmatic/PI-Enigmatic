import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom';
import { MDBCol, MDBIcon } from "mdbreact";

import { Cookies, useCookies } from "react-cookie";



const Associations = () => {
  const [cookies, _]=useCookies(['token'])

    const[query,setQuery]=useState('')
    const  [association,setAssociation]=useState([]);
    const verifiedAssociations = [];
    const unverifiedAssociations = [];
    useEffect( ()=>{
        async function fetchData() {
        const result = await fetch("http://127.0.0.1:8000/association/getAll");
        const data = await result.json();
        setAssociation(data)
        }
        fetchData();
      
    },[]);
function organizeAsso(){
    association.forEach(asso => {
      if(asso.isVerified){
        verifiedAssociations.push(asso);
      }else{
        unverifiedAssociations.push(asso)
      }
    })}
    organizeAsso()

    async function verifierAssociation(id) {
      if (window.confirm(`Are you sure you want to verify this association  ?`)) {
      await axios.get(`http://127.0.0.1:8000/association/verifier/${id}`)
      .then(()=> {
       
     
      
    }) };
      
    }
    return(
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
  <CCardHeader  > <CCardTitle>Associations Non Verifié</CCardTitle></CCardHeader>
  <CCardBody>
   
  <CTable hover>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">Association name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Sector</CTableHeaderCell>
      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {cookies.token &&

        unverifiedAssociations.filter((association)=>association.name.toLowerCase().includes(query))
        .map((item, index)=>
        <CTableRow key={index} >
      <CTableDataCell >{item.name}</CTableDataCell>
      <CTableDataCell>{item.sector}</CTableDataCell>
      <CTableDataCell>{item.email}</CTableDataCell>
      <CTableDataCell>
        
        <Link to={`/association/${item._id}`}><CButton   color="info" variant="ghost">Details</CButton></Link>
        
        
        
        </CTableDataCell>
    </CTableRow>
        )
}
    
  </CTableBody>
</CTable>
    
  </CCardBody>
 
</CCard>

<br></br>
<br></br>
<br></br>

<CCard className="text-center">
  <CCardHeader  > <CCardTitle>Associations Verifié</CCardTitle></CCardHeader>
  <CCardBody>
   
   
  <CTable hover>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">Association name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Sector</CTableHeaderCell>
      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {    cookies.token &&


        verifiedAssociations.filter((association)=>association.name.toLowerCase().includes(query))
        .map((item, index)=>
        <CTableRow key={index} >
      <CTableDataCell >{item.name}</CTableDataCell>
      <CTableDataCell>{item.sector}</CTableDataCell>
      <CTableDataCell>{item.email}</CTableDataCell>
      <CTableDataCell><Link to={`/association/${item._id}`}><CButton   color="info" variant="ghost">Details</CButton></Link></CTableDataCell>
        
      
    </CTableRow>
        )
}
    
  </CTableBody>
</CTable>
    
  </CCardBody>
 
</CCard>
        </>
            
    )
}
export default Associations;