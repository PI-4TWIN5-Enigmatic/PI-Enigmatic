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
import { MDBCol, MDBIcon } from "mdbreact";


const Users = () => {
    const[query,setQuery]=useState('')
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
  
        User.filter((user)=>user.firstName.toLowerCase().includes(query))
        .map((item, index)=>
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