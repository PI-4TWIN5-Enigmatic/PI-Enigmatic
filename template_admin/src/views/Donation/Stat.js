import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { MDBCol } from 'mdbreact';
import { CButton, CCard, CCardHeader, CCardTitle } from '@coreui/react';
import { BsFillFileTextFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Stat = () => {
  const [data, setData] = useState([]);
  const navigate=useNavigate();


  function transformData(data) {
    return Object.entries(data).map(([type, value]) => ({
      type,
      value
    }));
  }


  useEffect(() => {
    async function fetchDonationData() {
      const response = await fetch('http://localhost:8000/donnation/stat-donation');
      const data = await response.json();
    const transformedData = transformData(data);
    setData(transformedData);
    console.log(data)
    }
    fetchDonationData();
  }, []);



  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };



    const goBack=()=>{
      navigate(-1)
    }


  return (
    <div>
     <MDBCol md="6">
    <div className="input-group md-form form-sm form-1 pl-0">
      <div className="input-group-prepend">
        <span className="input-group-text purple lighten-3" id="basic-text1"></span>
      </div>
    </div>
  </MDBCol>
  <div className='d-flex justify-content-end'>
    <CButton className='mr-2' color="secondary" onClick={goBack}>Go Back</CButton>
  </div>
  <br></br>
  <CCard className="text-center">
    <CCardHeader>
      <CCardTitle style={{color:"#3622e8"}}>Donation Statistics Management<hr /></CCardTitle>
    </CCardHeader>
    <br/>
    {/* <BsArrowBarRight /> */}
    <div style={{}}>
      <CCard className="mx-auto" style={{width:"70%"}}>

        <div className='d-flex'>
          <Pie {...config} style={{width:"100%"}}/>
        </div>
        <br/>
        <h4> Donations by type <BsFillFileTextFill/>  </h4>
        <hr/>
      </CCard>
    </div>

  </CCard>
    </div>
  );
};

export default Stat;
