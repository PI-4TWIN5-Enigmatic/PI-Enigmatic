import React, { useEffect, useState } from 'react'
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



const Associations = () => {
    const  [association,setAssociation]=useState([]);
    useEffect( ()=>{
        async function fetchData() {
        const result = await fetch("http://127.0.0.1:8000/association/getAll");
        const data = await result.json();
        setAssociation(data)
        }
        fetchData();
    },[])
    return(
        <>
       
       <CCard className="text-center">
  <CCardHeader  > <CCardTitle>Associations Management</CCardTitle></CCardHeader>
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

        association.map((item, index)=>
        <CTableRow key={index} >
      <CTableDataCell >{item.name}</CTableDataCell>
      <CTableDataCell>{item.sector}</CTableDataCell>
      <CTableDataCell>{item.email}</CTableDataCell>
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