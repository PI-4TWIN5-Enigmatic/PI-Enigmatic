import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from 'src/layout/DefaultLayout';
import '../scss/style.scss'
import { useCookies } from "react-cookie";


const Redirection = () => {
   const navigate=useNavigate();
    const params = useParams();
    console.log("helloooooooo bebsbess ")
    const [_, setCookies] = useCookies(["access_token"]);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tokendata", { headers: { Authorization: params.token } }).then((response) => {
            if(response.data.success){
                setCookies("access_token", params.token);
            localStorage.setItem("token",params.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))

            navigate("/users")
        }});
    }, []);
    return (
        <>
 
 
   <div className="pt-3 text-center">
     <div className="sk-spinner sk-spinner-pulse"></div>
   </div>
 
        </>

    )
};



export default Redirection;