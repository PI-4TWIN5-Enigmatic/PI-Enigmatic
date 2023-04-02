import React from 'react'
import {
    CButton,
    CCardBody,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import { useParams ,Link } from 'react-router-dom';
  import {  Col ,Container} from 'react-bootstrap'
  import Navbar from '../../Navbar/Navbar'
  import { useEffect, useState } from 'react';
  import { Cookies, useCookies } from "react-cookie";
  import { useSelector } from 'react-redux';
  import ReactPaginate from 'react-paginate';
  import './EventDetails.css'

const Partner = (props) => {
  const [cookies, _]=useCookies(['token'])
  const token = useSelector((state) => state.token);
  const[query,setQuery]=useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const user = JSON.parse(localStorage.getItem('user'));

  const [currentPagee, setCurrentPagee] = useState(0);
  const [itemsPerPagee, setItemsPerPagee] = useState(3);

  const  [association,setAssociation]=useState([]);
  const  [associationUser,setAssociationUser]=useState([]);
  const  [partners,setPart]=useState("");


  const {id} = useParams();
  const[event,setEvent]=useState("");



      const asso =()=>{fetch ("http://127.0.0.1:8000/association/getAll" , {
        method:"GET",
        })
    
        .then(response => response.json())
        .then(data => {
          setAssociation(data);
        console.log(data);})
        .catch(error => console.error(error));
      }



         useEffect(()=>{
          asso();
          fetch (`http://127.0.0.1:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
              .then(data => {
                console.log(data);
                setEvent(data);
                fetch(`http://localhost:8000/association/getAssociationsById` ,{
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ids: Object.keys(data.partnersList) }),
                    })
                    .then(response => response.json())
                    .then(dataa => {
                      console.log(dataa);
                      setPart(dataa);
                    })
                    .catch(error => console.error(error));

                
                if (data && data.hasOwnProperty('organisateurEvent')) {
    
                  fetch(`http://localhost:8000/association/get/${data.organisateurEvent}`)
                  .then(response => response.json())
                  .then(dataa => {
                    console.log(dataa);
                    setAssociationUser(dataa);
                
                
                   } )}})
    
            .catch(error => console.error(error));
          }
         ,[])


        const goBack=()=>{
          window.location.replace(`http://localhost:3000/EventDetails/${id}`)
        }


        //RECHERCHE

        const assoArray = Object.values(association);


        const pageCount = Math.ceil(
          assoArray
                              .filter((a) => a.name.toLowerCase().includes(query) || 
                              a.sector.toLowerCase().includes(query) || 
                              a.country.toLowerCase().includes(query) || 
                              a.email.toLowerCase().includes(query)
                              ).length / itemsPerPage
        );
        const handlePageClick = ({ selected }) => {
          setCurrentPage(selected);
        };

        const partnersArrayy = Object.values(partners);


        const pageCountt = Math.ceil(
          partnersArrayy.filter(
            (u) =>
              u.name.toLowerCase().includes(query) ||
              u.country.toLowerCase().includes(query) ||
              u.sector.toLowerCase().includes(query) ||
              u.email.toLowerCase().includes(query)
          ).length / itemsPerPage
        );


        //endRecherche



        const addPartner=(associationMail , assoName , assoId )=>{
          if (window.confirm(`Are you sure you want to send this association a partnership request ?`)){

            fetch(`http://localhost:8000/event/sendMailEvent` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({eventId:event._id,
                  assoId:assoId,
                  associationMail:associationMail,
                  eventName:event.nameEvent,
                  assoName:assoName
                  ,userName:user.lastName+user.firstName,
                  myAssoName:associationUser.name,
                  eventLocation:event.locationEvent,
                  eventDate:event.dateEvent }),
            })    
            .catch(error => console.error(error));}
            window.location.reload();
    

        }


        const lookOut = (u) => {
          for (const userId in partners) {
            if (partners.hasOwnProperty(userId) && partners[userId]._id === u._id) {
              return true;
            }
          }
          return false;
        };





  return (
<>
    <Navbar />
                <br />
                <section className="h-100"  style={{backgroundColor: '#rgb(217 208 200 / 37%)'   }}   >   


           
    <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            
          <Container className="mt-3 p-4">
            <div className="justify-content-end d-flex">
          <button type="button" className="btn btn-light " data-mdb-ripple-color="dark" onClick={goBack} >
               X 
            </button>
          </div>
              <Col md={4} lg={4} sm={4}>

              <h2>Associations List</h2>
                <hr />
                </Col>
                </Container>
                <div className="form-outline mb-4">
                  <input type="search" className="form-control" id="datatable-search-input" placeholder='Search ...' onChange={(e)=>setQuery(e.target.value)}
/>
                </div>
              <div className="card card-registration my-4">
                


            <CCardBody>
                      <CTable hover  >
                      <CTableHead>
                        <CTableRow >
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>

                          <CTableHeaderCell scope="col">Sector</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Partnership Request</CTableHeaderCell>


                            </CTableRow>
                      </CTableHead>
                      <CTableBody >
                      {assoArray && assoArray
                              .filter((a) => a.name.toLowerCase().includes(query) || 
                              a.sector.toLowerCase().includes(query) || 
                              a.country.toLowerCase().includes(query) || 
                              a.email.toLowerCase().includes(query))
                               .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                               
                                .map((a)=>

                            <CTableRow key={a._id}>
                                <CTableDataCell  >{a.name}</CTableDataCell>
                                <CTableDataCell  >{a.email}</CTableDataCell>

                                <CTableDataCell  >{a.sector}</CTableDataCell>
                                <CTableDataCell  >{a.country}</CTableDataCell>

                                <CTableDataCell  >{a.phone}</CTableDataCell>
                              
                                <CTableDataCell  >
                                
                                {lookOut(a) ? (
                                <Link ><CButton   color="info" variant="ghost" >Already Partner </CButton></Link>
                              ) :(
                                <Link ><CButton   color="info"  onClick={()=>{addPartner(a.email,a.name,a._id)}}> Send An Email </CButton></Link>
                              )}

                               
                                    
                                </CTableDataCell>

                            
                              </CTableRow>
                            )} 
                        </CTableBody>
                        </CTable>
                      
                        </CCardBody>
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
                        </div>
                        </div>
                        </div>
                        </div>



                         <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
          <Container className="mt-3 p-4">
              <Col md={4} lg={4} sm={4}>

              <h2>Confirmed Partnership </h2>
                <hr />
                </Col>
                </Container>


                <div class="form-outline mb-4">
                  <input type="search" class="form-control" id="datatable-search-input" placeholder='Search ...' onChange={(e)=>setQuery(e.target.value)}/>
                </div>
              <div className="card card-registration my-4">
                


            <CCardBody>
                      <CTable hover  >
                      <CTableHead>
                        <CTableRow >
                      <CTableHeaderCell scope="col">name</CTableHeaderCell>

                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Sector</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Contact</CTableHeaderCell>


                            </CTableRow>
                      </CTableHead>
                      <CTableBody >
                      { partnersArrayy && partnersArrayy.filter((u) => u.name.toLowerCase().includes(query) || 
                                u.country.toLowerCase().includes(query) || 
                                u.sector.toLowerCase().includes(query) || 
                                u.email.toLowerCase().includes(query))
                                .slice(currentPagee * itemsPerPagee, (currentPagee + 1) * itemsPerPagee)

                      .map((u)=>

                            <CTableRow key={u._id}>
                                <CTableDataCell  >{u.name}</CTableDataCell>
                                <CTableDataCell  >{u.email}</CTableDataCell>

                                <CTableDataCell  >{u.sector}</CTableDataCell>
                                <CTableDataCell  >{u.country}</CTableDataCell>

                                <CTableDataCell  >{u.phone}</CTableDataCell>
                               

                            
                              </CTableRow>
                           )}
                        </CTableBody>
                        </CTable>
                      
                        </CCardBody>
                         <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                pageCount={pageCountt}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                disabledClassName={'disabled'}
                                activeClassName={'active'}
                              />
                        </div>
                        </div>
                        </div>
                        </div> 



                        </section>
   </>
  )
}

export default Partner