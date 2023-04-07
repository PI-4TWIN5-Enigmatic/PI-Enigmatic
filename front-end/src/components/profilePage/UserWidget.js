import React from 'react'
import { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';




const UserWidget = () => {

  // const [user,setUser]= useState(null);


  // useEffect(() => {
  //     fetch(`http://localhost:8000/api/${id}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         setUser(data);})
  //       .catch(error => console.error(error));
  //   }, [id]);


  const [user,setUser]= useState(null);
  const{ id} = useParams() 
  const token = useSelector((state) => state.token);



  const getUser = async () => {

    const response = await fetch (`http://localhost:8000/api/getuser/${id}` , {
    method:"GET",
    headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
    console.log(data);
};


  useEffect(() => {
    getUser();
},[]);

if(!user) return null ;


const{
  firstName,
  lastName,
  sexe,
  occupation,
  email, 
  phone
}=user;

  return (
    <>
      <div className="card widget-item">
        <h4 className="widget-title">
          {firstName} {lastName}
        </h4>
        <div className="widget-body">
          <div className="about-author">
            <h4 className="widget-title">About Me</h4>

            <ul className="author-into-list">
              <li>
                <a href="#">
                  <i className="bi bi-office-bag"></i>
                  {occupation}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-home"></i>
                  {email}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-phone"></i>
                  {phone}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-gender"></i>
                  {sexe}
                </a>
              </li>
            </ul>

            <div className="profile-edit-panel">
              <button>
                <Link
                  className="edit-btn"
                  to={`http://localhost:3000/user/update/${window.localStorage.getItem(
                    "id"
                  )}`}
                >
                  edit profile
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserWidget