import React, { useState , useEffect } from 'react'
import {
  CButton,
    CCard,
    CCardHeader,
    CCardTitle,
  } from '@coreui/react'
  import { MDBCol} from "mdbreact";
  import {  useCookies } from "react-cookie";
  import { Pie } from '@ant-design/plots';
  import { BsPersonPlusFill ,BsPersonHeart , BsFillPersonLinesFill  , BsFillDice2Fill,BsFillFileTextFill , BsFillSignpost2Fill} from "react-icons/bs";
  import { Column } from '@ant-design/plots';
  import { Bar } from '@ant-design/plots';
  import { Gauge } from '@ant-design/plots';
  import { Rose } from '@ant-design/plots';
  import { useNavigate } from 'react-router-dom';

const Statistics = () => {
    const [cookies,setCookies] = useCookies(["access_token"]);
    const[events,setEvents]=useState('')
    const [dataParticipants, setDataParticipants] = useState([{type:"", value:""}]);
    const [dataInterested, setDataInterested] = useState([{type:"", value:""}]);
    const [dataReviews, setDataReviews] = useState([{type:"", value:""}]);
    const [dataType, setDataType] = useState([{type:"", value:""}]);
    const [dataLocation, setDataLocation] = useState([{type:"", value:""}]);
    const [dataTypeP, setDataTypeP] = useState([{type:"", value:""}]);
    const [isCardVisible , setIsCardVisible]=useState(false)
    const [variantU, setVariantU] = useState("");
    const [variantA, setVariantA] = useState("ghost");
    const [P, setP] = useState("");
    const navigate=useNavigate();


   const onClickUsers=()=>{
    setIsCardVisible(true);
    setVariantU('ghost');
    setVariantA('')
   }

   const onClickAsso=()=>{
    setIsCardVisible(false);
    setVariantU('');
    setVariantA('ghost')   }

 


   
    const goBack=()=>{
      navigate(-1)
    }


      function populateDataP(data) {
        const newData = data.map((e) => ({
          type: e.nameEvent,
          value:Object.keys(e.participants).length,
        }));
        setDataParticipants(newData);
      }

      function populateDataI(data) {
        const newData = data.map((e) => ({
          type: e.nameEvent,
          value:Object.keys(e.interested).length,
        }));
        setDataInterested(newData);
      }

      function populateDataR(data) {
        const newData = data.map((e) => ({
          type: e.nameEvent,
          value:e.reviews.length,
        }));
        setDataReviews(newData);
      }

      function populateDataT(data) {
        const typeF = data.filter((e)=>e.typeEvent==="Free Event").length
        const typeP = data.filter((e)=>e.typeEvent==="Paid Event").length
        const newData = [{
          type:'Free Events',
          value:typeF ,
        },{
          type:'Paid Events',
          value:typeP ,
        }]
        setDataType(newData);
      }

      
      function populateDataTLocation(data) {
        const typeNabeul =  data.filter((e) => e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0] === "Nabeul").length
        const typeSousse = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Sousse").length
        const typeAriana = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Ariana").length
        const typeBeja = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Beja").length
        const typeBenArous = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Ben Arous").length
        const typeBizerte = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Bizerte").length
        const typeGabes = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Gabes").length
        const typeGafsa = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Gafsa").length
        const typeJendouba = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Jendouba").length
        const typeKairouan = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Kairouan").length
        const typeKasserine = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Kasserine").length
        const typeKebili = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Kebili").length
        const typeKef = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Kef").length
        const typeMahdia = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Mahdia").length
        const typeManouba= data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Manouba").length
        const typeMednine = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Mednine").length
        const typeMonastir = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Monastir").length
        const typeSfax = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Sfax").length
        const typeSidiBouzid = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Sidi Bouzid").length
        const typeSiliana = data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Siliana").length
        const typeTataouine= data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Tataouine").length
        const typeTozeur= data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Tozeur").length
        const typeTunis= data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Tunis").length
        const typeZaghouan= data.filter((e)=>e.locationEvent?.split(", Gouvernorat ")[1]?.split(",")[0]==="Zaghouan").length





        const newData = [{
          type:'Nabeul',
          value:typeNabeul ,
        },{
          type:'Sousse',
          value:typeSousse ,
        },{
          type:'Ariana',
          value:typeAriana ,
        },{
          type:'Beja',
          value:typeBeja ,
        },{
          type:'Ben Arous',
          value:typeBenArous ,
        },{
          type:'Bizerte',
          value:typeBizerte ,
        },{
          type:'Gabes',
          value:typeGabes ,
        },{
          type:'Gafsa',
          value:typeGafsa ,
        },{
          type:'Jendouba',
          value:typeJendouba ,
        },{
          type:'Kairouan',
          value:typeKairouan ,
        },{
          type:'Kasserine',
          value:typeKasserine ,
        },{
          type:'Kebili',
          value:typeKebili ,
        },{
          type:'Kef',
          value:typeKef ,
        },{
          type:'Mahdia',
          value:typeMahdia ,
        },{
          type:'Manouba',
          value:typeManouba ,
        },{
          type:'Mednine',
          value:typeMednine ,
        },{
          type:'Monastir',
          value:typeMonastir ,
        },{
          type:'Sfax',
          value:typeSfax ,
        },{
          type:'Sidi Bouzid',
          value:typeSidiBouzid ,
        },{
          type:'Siliana',
          value:typeSiliana ,
        },{
          type:'Tataouine',
          value:typeTataouine ,
        },{
          type:'Tozeur',
          value:typeTozeur ,
        },{
          type:'Tunis',
          value:typeTunis ,
        },{
          type:'Zaghouan',
          value:typeZaghouan ,
        }]
        setDataLocation(newData);
      }

    

      function populateDataPresenceP(data) {
        const typeF = data.filter((e)=>Object.keys(e.participants).length).length
        const typeP = data.filter((e)=>Object.keys(e.attendeesList).length).length
        const newData = [{
          type:'People Who said they will attend',
          value:typeF ,
        },{
          type:'People who actually showed up',
          value:typeP ,
        }]
        setDataTypeP(newData);
        setP(((typeP / typeF)*100 ).toFixed(2))
      }

      const configPresence = {
        appendPadding: 10,
        data:dataTypeP,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'Presence %',
          },
        },
      };
      const configLocation = {
        data:dataLocation,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        legend: {
          position: 'bottom',
        },
      };
      

    useEffect(() => {
        fetch(`http://localhost:8000/event/getAllEvent`, 
        {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setEvents(data)
            populateDataP(data);
            populateDataI(data);
            populateDataR(data)
            populateDataT(data);
            populateDataPresenceP(data);
            populateDataTLocation(data);
            ;})
          .catch(error => console.error(error));

      
      
      }, []);


      const config = {
                appendPadding: 10,
                data: dataParticipants,
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

            
      const configg = {
        appendPadding: 10,
        data: dataInterested,
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

    
    const configgg = {
        appendPadding: 10,
        data: dataReviews,
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


    const configType = {
      appendPadding: 10,
      data: dataType,
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

    const confiig = {
        data: dataParticipants,
        xField: 'type',
        yField: 'value',
        conversionTag: {},
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
      };

      const conffig = {
        data: dataInterested,
        xField: 'type',
        yField: 'value',
        conversionTag: {},
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
      };


      const coonfig = {
        data: dataReviews,
        xField: 'type',
        yField: 'value',
        conversionTag: {},
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
      };

      const configT = {
        data:dataType,
        xField: 'value',
        yField: 'type',
        seriesField: 'type',
        legend: {
          position: 'top-left',
        },
      };



      const configPr = {
        percent: P/100,
        range: {
          color: 'l(0) 0:#B8E1FF 1:#3D76DD',
        },
        startAngle: Math.PI,
        endAngle: 2 * Math.PI,
        indicator: null,
        statistic: {
          title: {
            offsetY: -36,
            style: {
              fontSize: '36px',
              color: '#4B535E',
            },
            formatter: () => `${P} %` ,
          },
          content: {
            style: {
              fontSize: '24px',
              lineHeight: '44px',
              color: '#4B535E',
            },
            formatter: () => 'Attendees ',
          },
        },
      };


     
      return (


    <>
  
  <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
          </span>
        </div>
      </div>
    </MDBCol>
    <div className='d-flex justify-content-end'>
    <CButton className='mr-2' color="secondary" onClick={goBack}>Go Back</CButton> 

    </div>

   <br></br>
       <CCard className="text-center">
  <CCardHeader  > <CCardTitle style={{color:"#3622e8"}}>Events Statistics Management<hr /> </CCardTitle></CCardHeader>
<br/>    
{/* <BsArrowBarRight /> */}

<div style={{ display: isCardVisible ? 'block' : 'none' }}>
  <CCard className="mx-auto" style={{width:"70%"}}>
        <CCardHeader  > <CCardTitle style={{color:"rgb(47 35 159)"}}> 
        <CButton color="primary" variant={variantA} onClick={onClickAsso} > Associations Interactions With Events </CButton> 
        <CButton color="primary" variant={variantU} onClick={onClickUsers}> Users Interactions With Events </CButton> 

        <hr /> </CCardTitle></CCardHeader>
                    <div className='d-flex'>
                        <Pie {...config} style={{width:"50%"}}/>  
                        <Column {...confiig}  style={{width:"50%"}}/>
                    </div>
                      <br/>
                    <h4> Participants <BsPersonPlusFill/>  </h4>
                    <hr/>

                    <div className='d-flex'>

                    <Pie {...configg} style={{width:"50%"}} />
                    <Column {...conffig}  style={{width:"50%"}}/>

                    </div>
                    <h4>Intrested  <BsPersonHeart/></h4>
                    <hr/>
                    <br/>

                    <div className='d-flex'>

                    <Pie {...configgg} style={{width:"50%"}} />
                    <Column {...coonfig}  style={{width:"50%"}}/>

                    </div>
                    <br/>
                  
                    <h4>Reviews <BsFillPersonLinesFill/> </h4>
                    <br/>
    </CCard>
    </div>




    <div style={{ display: isCardVisible ? 'none' : 'block' }}>
  <CCard className="mx-auto" style={{width:"70%"}}>
        <CCardHeader  > <CCardTitle style={{color:"rgb(47 35 159)"}}> 
        <CButton color="primary" variant={variantA} onClick={onClickAsso} > Associations Interactions With Events </CButton> 
        <CButton color="primary" variant={variantU} onClick={onClickUsers}> Users Interactions With Events </CButton> 

        <hr /> </CCardTitle></CCardHeader>
                    <div className='d-flex'>
                        <Pie {...configType} style={{width:"50%"}}/> 
                        <Bar {...configT} style={{width:"50%"}}/>
                    </div>
                      <br/>
                    <h4> Type Events <BsFillDice2Fill/>  </h4>
                    <hr/>
                    <div className='d-flex'>

                    <Pie {...configPresence} style={{width:"50%"}}/> 
                    <Gauge {...configPr} style={{width:"50%"}} />
                    </div>

                    <h4>Presence List  <BsFillFileTextFill/></h4>
                    <hr/>
                    <br/>
                    <div className='d-flex '>

                    <Rose {...configLocation} style={{width:"50%"}} />
                    <Column {...configLocation}  />

                    </div>
                    <br/>
                    <h4>Events Location  <BsFillSignpost2Fill/></h4>

                                      
    </CCard>
    <CCard className="mx-auto" style={{width:"70%"}}>

    </CCard>


    </div>


    </CCard>

            </>
  )
}

export default Statistics