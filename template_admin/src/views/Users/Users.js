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



const Users = () => {

    const  [User,setUser]=useState([]);
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('http://127.0.0.1:8000/api/users/getAll');
        const data = await response.json();
        setUser(data);
      }
  
      fetchData();
    }, []);
    return(
        <>
     
       <CCard className="text-center">
  <CCardHeader  > <CCardTitle>User Management</CCardTitle></CCardHeader>
  <CCardBody>
   
  <CTable hover>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">First name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Last name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
      <CTableHeaderCell scope="col">Occupation</CTableHeaderCell>
      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody >
    {
  
        User.map((item, index)=>
        <CTableRow key={item._id}  >
      <CTableDataCell  >{item.firstName}</CTableDataCell>
      <CTableDataCell>{item.lastName}</CTableDataCell>
      <CTableDataCell>{item.email}</CTableDataCell>
      <CTableDataCell>{item.occupation}</CTableDataCell>
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
export default Users;