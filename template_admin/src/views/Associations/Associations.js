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



const Associations = () => {
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
    {

        unverifiedAssociations.map((item, index)=>
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
    {

        verifiedAssociations.map((item, index)=>
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