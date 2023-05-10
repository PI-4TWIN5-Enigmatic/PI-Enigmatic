import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { MDBCol} from "mdbreact";
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Donation.css'


const Donation = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cookies, _]=useCookies(['token'])

  const  [Donation,setDonation]=useState([]);
  const navigate = useNavigate();
  const[query,setQuery]=useState('')

    const [data, setData] = useState(null);

    useEffect(() => {
      axios.get('http://localhost:8000/api/users/getAll').then((response) => {
        setUsers(response.data);
      });
    }, []);

    const getRequesterName = (donation) => {
      const user = users.find((user) => user._id === donation.requester);
      if (user) {
        return `${user.firstName} ${user.lastName}`;
      } else {
        return 'Unknown';
      }
    };

    const handleDelete = (id) => {
      if (window.confirm(`Are you sure you want to delete this donation?`)) {
        axios.delete(`http://localhost:8000/donnation/deleteDonnation/${id}`)
          .then(response => {
            console.log('Donation deleted successfully');
            // Now delete the notification
            axios.delete(`http://localhost:8000/notifications/deleteNotificationwith/${id}`)
              .then(response => {
                console.log('Notification deleted successfully');
              })
              .catch(error => {
                console.error('Error deleting notification', error);
              });
          })
          .catch(error => {
            console.error('Error deleting donation', error);
          });
      }
    };




    useEffect(() => {
      axios.get("http://localhost:8000/donnation/getAllDonnations" ).then((response) => {
          setDonation(response.data);
      });
    }, [handleDelete] );


    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };


    const pageCount = Math.ceil(
      Donation.filter(
        (u) =>
        u.sector.toLowerCase().includes(query)
      ).length / itemsPerPage
    );

    const goStatistic=()=>{
      navigate('/stat')
    }






return (
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
         <div className="ml-auto d-flex align-items-center">
         <CButton className='mr-2' color="primary" onClick={goStatistic} >View Statistics</CButton>
    </div>
      </div>

    </MDBCol>

   <br></br>
       <CCard className="text-center">
  <CCardHeader  > <CCardTitle style={{color:"#3622e8"}}>Donation Management<hr /> </CCardTitle></CCardHeader>
  <CCardBody>

  <CTable hover>
 <CTableHead>
   <CTableRow>
<CTableHeaderCell scope="col">Sector</CTableHeaderCell>
<CTableHeaderCell scope="col">Description</CTableHeaderCell>

     <CTableHeaderCell scope="col">Type</CTableHeaderCell>
     <CTableHeaderCell scope="col">Goal</CTableHeaderCell>
     <CTableHeaderCell scope="col">Poster</CTableHeaderCell>
     <CTableHeaderCell scope="col">Requester</CTableHeaderCell>
     <CTableHeaderCell scope="col">Options</CTableHeaderCell>

        </CTableRow>
 </CTableHead>
 <CTableBody >
 {    cookies.token &&
        Donation.filter((e)=>e.sector.toLowerCase().includes(query))
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((e) => (
       <CTableRow key={e._id}>
           <CTableDataCell  >{e.sector}</CTableDataCell>
           <CTableDataCell style={{  maxWidth: "2000px"}} >{e.description}</CTableDataCell>

           <CTableDataCell  >{e.type}</CTableDataCell>

           <CTableDataCell  >{e.goal}</CTableDataCell>

           <CTableDataCell>
                    {e.picture ? (
                      <img
                        src={e.picture}
                        style={{ width: "100%" }}
                        alt="image_donation"
                      />
                    ) : (
                      "No photo"
                    )}
                  </CTableDataCell>
           <CTableDataCell>{getRequesterName(e)}</CTableDataCell>
           <CTableDataCell  ><CButton   color="danger" variant="ghost" onClick={() =>
                                          handleDelete(e._id)} >Delete donation</CButton> </CTableDataCell>





         </CTableRow>
      ))}
   </CTableBody>
   </CTable>

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
   </CCardBody>

  </CCard>
        </>

    )


}

export default Donation;
