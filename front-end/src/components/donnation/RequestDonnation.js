import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import About from "../profilePage/About";
import UserWidget from "../profilePage/UserWidget";
import axios from "axios";
import RecentNotifications from "../profilePage/RecentNotifications";
import ListDonnation from "./ListDonnation"
import { toast } from "react-toastify";
import { io } from "socket.io-client"



const RequestDonnation = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [location, setLocation] = useState("");
    const [sector, setSector] = useState("");
    const [type, setType] = useState("");
    const [goal, setGoal] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [picture, setPicture] = useState("");
    const [donation, setDonation] = useState(null);
    const [phone, setPhone] = useState("");

    const socket = useRef();

    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on('donation', (data) => {
        setDonation(data);
        
      });

      
      console.log(donation);

      
      
    }, [donation]);

    const [errors, setErrors] = useState({
      location: "",
      sector: "",
      type: "",
      goal: "",
      description: "",
      date: "",
      picture: "",
      phone:"",
    });
function estNumeroTelephoneValide(telephone) {
  // Vérifier que le numéro de téléphone a une longueur de 8 caractères
  if (telephone.length !== 8) {
    return false;
  }
  
  // Vérifier que le premier chiffre du numéro de téléphone est valide
  const premierChiffre = telephone.charAt(0);
  if (premierChiffre !== '5' && premierChiffre !== '9' && premierChiffre !== '2' && premierChiffre !== '7' && premierChiffre !== '4') {
    return false;
  }
  
  // Vérifier que le numéro de téléphone ne contient que des chiffres
  if (!/^\d+$/.test(telephone)) {
    return false;
  }
  
  // Le numéro de téléphone est valide
  return true;
}

    const formValidation = () => {
        let etat = true;
        let localError = {
          location: "",
          sector: "",
          type: "",
          goal: "",
          description: "",
          date: "",
          picture: "",
          phone: "",
        };
        if (location === "") {
            localError.location = " Location required";
            etat = false;
        }
        if (sector === "") {
            localError.sector = " Sector required";
            etat = false;
        }
        if (type === "") {
            localError.type = " Type required";
            etat = false;
        }
        if (goal === "") {
            localError.goal = " Goal required";
            etat = false;
        }
        if (description === "") {
            localError.description = " Description required";
            etat = false;
        }
      if (phone === "") {
        localError.phone = " Phone required";
        etat = false;
      }
      if (!estNumeroTelephoneValide(phone)) {
        localError.phone = "Please enter a valid phone Number";
        etat = false;
      }
        setErrors(localError);
        return etat;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = formValidation();
        if (isFormValid) {
            if (picture) {
            const dataimg = new FormData();
            dataimg.append("file", picture);
            dataimg.append("upload_preset", "enigmatic");
            dataimg.append("cloud_name", "dtisuumvj");
            axios.post(
                "https://api.cloudinary.com/v1_1/dtisuumvj/image/upload",
                dataimg
            ).then((result) => {
                const data = {
                    location,
                    sector,
                    type,
                    goal,
                    description,
                    date,
                    phone,
                    picture: result.data.secure_url,
                };

                axios
                    .post(`http://localhost:8000/donnation/requestDonnation/${id}`, data)
                    .then((response) => {
                      const donationId = response.data.donationId ; 
                      const datawithId = {related_donation:donationId}
                      console.log(datawithId)
                      socket.current.emit('newNotification', datawithId);
                      toast.info("Donnation have been created"); 

                    // Ajouter la notification
                    axios.post(`http://localhost:8000/notifications/addNotifications/${response.data.donationId}`)
                    .then((response) => {
                     // socket.current.emit('requestDonnation', datawithId);

                    }).catch((error) => {
                      console.error(error);
                    });
                      
                    })
                    .catch((error) => {
                        console.error(error);
                    
                        // Handle error response
                    });
            })
                
            } else {
                const data = {
                  location,
                  sector,
                  type,
                  goal,
                  description,
                  date,
                  phone,
                };

                axios
                  .post(
                    `http://localhost:8000/donnation/requestDonnation/${id}`,
                    data)
                  .then((response) => {
                    const donationId = response.data.donationId ; 
                    const datawithId = {related_donation:donationId}
                    console.log(datawithId)
                    socket.current.emit('newNotification', datawithId);
                   
                    toast.info("Donnation have been created");
                    fetch(`http://localhost:8000/notifications/addNotifications/${response.data.donationId}`, {
                      method: 'POST'
                    })
                    .then(response => response.json())
                    .then(data => {
                      // Envoi de l'événement de notification vers le serveur Socket.io
                  })
                    .catch(error => {
                      console.error(error);
                    });


                     
                  })
                  .catch((error) => {
                    console.error(error);
                  });
            }}
        else {
            console.log("Form invalid");
        }
    };

  const getUser = async () => {
    setIsLoading(true);
    try {const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
            method: "GET",
        });

        const data = await response.json();
        setUser(data);
      
    } catch (error) {
    console.log(error);
  }
  setIsLoading(false);
}
        
       
   

    useEffect(() => {
        getUser();
    }, []);
    if (!user) return null;
    const { profilePicture } = user;

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Navbar donation={donation} />

          <div
            class="main-wrapper pt-80"
            style={{ backgroundColor: "#bcbcbc42", marginTop: "30px" }}
          >
            <div className="container">
              <div className="row">
                <div class="col-lg-3 order-2 order-lg-1"></div>

                <div className="col-lg-6 order-1 order-lg-2">
                  <center>
                    <h3
                      style={{
                        textAlign: "left",
                        paddingBottom: "10px",
                        paddingLeft: "200px",
                        color: "rgb(220,71,52)",
                        fontWeight: "bold",
                      }}
                    >
                      Asking for Donations ?
                    </h3>
                  </center>
                  <div className="card card-small">
                    <div className="share-box-inner">
                      <div className="share-content-box w-100">
                        
                      </div>
                    </div>
                  </div>

                  <ListDonnation />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RequestDonnation;
