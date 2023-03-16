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
import axios from 'axios';


const Users = () => {
  const [banDate, setBanDate] = useState("");
  const  [User,setUsers]=useState([]);
  const[query,setQuery]=useState('')
    
    const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users/getAll").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const filteredUsers = User
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
     filteredUsers = User.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  };



const handleBan = async (userId) => {
  await axios.put("http://127.0.0.1:8000/api/banuser", { userId, banDate });
  const updatedUsers = User.map((user) => {
    if (user._id === userId) {
      user.isBanned = new Date(banDate);
    }
    return user;
  });
  setUsers(updatedUsers);
};

const handleUnban = async (userId) => {
  await axios.put("http://127.0.0.1:8000/api/unbanuser", { userId });
  const updatedUsers = User.map((user) => {
    if (user._id === userId) {
      return { ...user, isBanned: null };
    }
    return user;
  });
  setUsers(updatedUsers);
};

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
      {User.filter((user)=>user.firstName.toLowerCase().includes(query)).map((user) => (
       <CTableRow key={user._id}>
           <CTableDataCell  >{user.firstName}</CTableDataCell>
           <CTableDataCell  >{user.email}</CTableDataCell>

           <CTableDataCell  >{user.occupation}</CTableDataCell>


           <CTableDataCell  >{new Date(user.isBanned) > new Date() ? "Banned" : "Active"}</CTableDataCell>
           <CTableDataCell  >
            {new Date(user.isBanned) > new Date() ? (
              <button onClick={() => handleUnban(user._id)}>Unban</button>
            ) : (
              <>
              <div key={user._id}>
              <input type="date" id={user._id}  value={new Date(user.isBanned) > new Date() ? new Date(user.isBanned) : null} onChange={(e) => setBanDate(e.target.value)} />
              </div>
                <button onClick={() => handleBan(user._id)}>Ban</button>
              </>
            )}
         </CTableDataCell>
         </CTableRow>
      ))}
   </CTableBody>
   </CTable>
   </CCardBody>
  
  </CCard>
        </>
            
    )
    
 
}

export default Users;
