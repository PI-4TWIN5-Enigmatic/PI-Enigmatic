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

const PresenceList = () => {

    const [cookies, _]=useCookies(['token'])
    const token = useSelector((state) => state.token);
    const[query,setQuery]=useState('')
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    const [currentPagee, setCurrentPagee] = useState(0);
    const [itemsPerPagee, setItemsPerPagee] = useState(1);

    const {id} = useParams();
    const[event,setEvent]=useState("");
    const[part,setPart]=useState("");
    const[confirmedUsers,setConfirmedUsers]=useState("");
    const[usersData,setUsersData]=useState("");



    useEffect(() => {
        fetch(`http://localhost:8000/event/getEventById/${id}`, {headers:{Authorization:cookies.access_token}})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setEvent(data);
            setPart(Object.keys(data.participants));
            fetch(`http://localhost:8000/api/getUsersById` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ids: Object.keys(data.participants) }),
            })
            .then(response => response.json())
            .then(dataa => {
              console.log(dataa);
              setUsersData(dataa);
            })
            .catch(error => console.error(error));
            fetch(`http://localhost:8000/api/getUsersById` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ids: Object.keys(data.attendeesList) }),
            })
            .then(response => response.json())
            .then(dataa => {
              console.log(dataa);
              setConfirmedUsers(dataa);
            })
            .catch(error => console.error(error));


        
        })
        
          .catch(error => console.error(error));
      }, []);


      

     const Accept=(u)=>{
        if (window.confirm(`Are you sure you want to confirm this user's presence ?`)){

        fetch(`http://localhost:8000/event/attendeesList/${id}` ,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: u }),
        })    
        .catch(error => console.error(error));}
        window.location.reload();

        
     }


     const refuse =(u)=>{

        if (window.confirm(`Are you sure you want to unconfirm this user's presence ?`)){

            fetch(`http://localhost:8000/event/unconfirm/${id}` ,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userId: u }),
            })    
            .catch(error => console.error(error));}
    
            window.location.reload();

         }

         const lookOut = (u) => {
          for (const userId in confirmedUsers) {
            if (confirmedUsers.hasOwnProperty(userId) && confirmedUsers[userId]._id === u._id) {
              return true;
            }
          }
          return false ;
        };


        const handlePageClick = ({ selected }) => {
          setCurrentPage(selected);
        };

        
        const handlePageClickk = ({ selected }) => {
          setCurrentPagee(selected);
        };
        
        const usersArray = Object.values(usersData);

        const pageCount = Math.ceil(
          usersArray.filter(
            (u) =>
              u.firstName.toLowerCase().includes(query) ||
              u.lastName.toLowerCase().includes(query) ||
              u.occupation.toLowerCase().includes(query) ||
              u.email.toLowerCase().includes(query)
          ).length / itemsPerPage
        );

        const usersArrayy = Object.values(confirmedUsers);


        const pageCountt = Math.ceil(
          usersArrayy.filter(
            (u) =>
              u.firstName.toLowerCase().includes(query) ||
              u.lastName.toLowerCase().includes(query) ||
              u.occupation.toLowerCase().includes(query) ||
              u.email.toLowerCase().includes(query)
          ).length / itemsPerPage
        );

        const goBack=()=>{
          window.location.replace(`http://localhost:3000/EventDetails/${id}`)
        }
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

              <h2>Attendees List</h2>
                <hr />
                </Col>
                </Container>
                <div class="form-outline mb-4">
                  <input type="search" class="form-control" id="datatable-search-input" placeholder='Search ...' onChange={(e)=>setQuery(e.target.value)}
/>
                </div>
              <div className="card card-registration my-4">
                


            <CCardBody>
                      <CTable hover  >
                      <CTableHead>
                        <CTableRow >
                      <CTableHeaderCell scope="col">FirstName</CTableHeaderCell>
                      <CTableHeaderCell scope="col">LastName</CTableHeaderCell>

                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Occupation</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Confirm Presence</CTableHeaderCell>

                            </CTableRow>
                      </CTableHead>
                      <CTableBody >
                      {usersData && usersData
                                .filter((u) => u.firstName.toLowerCase().includes(query) || 
                                u.lastName.toLowerCase().includes(query) || 
                                u.occupation.toLowerCase().includes(query) || 
                                u.email.toLowerCase().includes(query))
                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                .map((u)=>

                            <CTableRow key={u._id}>
                                <CTableDataCell  >{u.firstName}</CTableDataCell>
                                <CTableDataCell  >{u.lastName}</CTableDataCell>

                                <CTableDataCell  >{u.email}</CTableDataCell>
                                <CTableDataCell  >{u.occupation}</CTableDataCell>

                                <CTableDataCell  >{u.phone}</CTableDataCell>
                                <CTableDataCell  >

                              {lookOut(u) ? (
                                <Link ><CButton   color="info" variant="ghost" >Already Confirmed </CButton></Link>
                              ) :(
                                <Link ><CButton   color="info"  onClick={()=>{Accept(u._id)}}> Confirm Attendee </CButton></Link>
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

              <h2>Confirmed Attendees</h2>
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
                      <CTableHeaderCell scope="col">FirstName</CTableHeaderCell>
                      <CTableHeaderCell scope="col">LastName</CTableHeaderCell>

                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Occupation</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Accept / Refuse</CTableHeaderCell>

                            </CTableRow>
                      </CTableHead>
                      <CTableBody >
                      { confirmedUsers && confirmedUsers.filter((u) => u.firstName.toLowerCase().includes(query) || 
                                u.lastName.toLowerCase().includes(query) || 
                                u.occupation.toLowerCase().includes(query) || 
                                u.email.toLowerCase().includes(query))
                                .slice(currentPagee * itemsPerPagee, (currentPagee + 1) * itemsPerPagee)

                      .map((u)=>

                            <CTableRow key={u._id}>
                                <CTableDataCell  >{u.firstName}</CTableDataCell>
                                <CTableDataCell  >{u.lastName}</CTableDataCell>

                                <CTableDataCell  >{u.email}</CTableDataCell>
                                <CTableDataCell  >{u.occupation}</CTableDataCell>

                                <CTableDataCell  >{u.phone}</CTableDataCell>
                                <CTableDataCell  >

                                <Link ><CButton   color="danger" onClick={()=>{refuse(u._id)}} > Unconfirm Attendee </CButton></Link>

                                </CTableDataCell>

                            
                              </CTableRow>
                           )}
                        </CTableBody>
                        </CTable>
                      
                        </CCardBody>
                         <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                pageCount={pageCountt}
                                onPageChange={handlePageClickk}
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

export default PresenceList