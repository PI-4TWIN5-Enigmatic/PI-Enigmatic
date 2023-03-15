import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';



const AssociationDetails = ( ) => {
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

  if (!association) {
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
<Link to={`/associations`}><CButton color="dark">Go Back</CButton></Link>


    </CCardBody>
  
  </CCard>
  )

}
export default AssociationDetails;

