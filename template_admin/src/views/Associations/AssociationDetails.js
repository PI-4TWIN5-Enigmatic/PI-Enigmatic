import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Cookies, useCookies } from "react-cookie";


const AssociationDetails = ( ) => {
  const [cookies, _]=useCookies(['access_token'])

  const Navigate = useNavigate();
  const { id} = useParams();
  const [association, setAssociation] = useState({});

  useEffect(() => {
    async function fetchAssociation() {
      const response = await fetch(`http://127.0.0.1:8000/association/get/${id}`);
      const data = await response.json();
      setAssociation(data);
    }
    fetchAssociation();
  }, [id]);

  async function verifierAssociation(id) {
    if (window.confirm(`Are you sure you want to verify this association  ?`)) {
    await axios.get(`http://127.0.0.1:8000/association/verifier/${id}`)
    .then((response)=> { toast.info(response.data) 
      
        if(response.data==="Account updated successfully"){
          Navigate('/associations');
      }
   
    
  }) };}



  if (!association ) {
    return <div>Association NOT FOUND</div>;
  }

  
  return(

    <CCard className="text-center">
    <CCardHeader  > <CCardTitle>Association Details</CCardTitle></CCardHeader>
    <CCardBody>

    <CListGroup>
  <CListGroupItem component="a"  active>
    <b>{association.name}</b>
  </CListGroupItem>
  <CListGroupItem component="a" >
    <b>Email :</b> {association.email}
  </CListGroupItem>
  <CListGroupItem component="a" >
    <b>Location :</b> {association.location}
  </CListGroupItem>
  <CListGroupItem component="a" >
   <b>Validator :</b> {association.validator}
  </CListGroupItem>
  <CListGroupItem component="a"  >
   <b>Sector :</b> {association.sector}
  </CListGroupItem>
  <CListGroupItem component="a"  >
   <b>Phone :</b> {association.phone}
  </CListGroupItem>
</CListGroup>

<br></br>
{association.isVerified === false && <CButton onClick={() => verifierAssociation(association._id)} color="success" variant="ghost">Verifier</CButton>}

<Link to={`/associations`}><CButton color="dark">Go Back</CButton></Link>


    </CCardBody>
  
  </CCard>
  )

}
export default AssociationDetails;

