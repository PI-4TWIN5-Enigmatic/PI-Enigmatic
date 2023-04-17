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
    });

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
        if (date === "") {
            localError.date = " Date required";
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
                    picture: result.data.secure_url,
                };

                axios
                    .post(`http://localhost:8000/donnation/requestDonnation/${id}`, data)
                    .then((response) => {
                      socket.current.emit('requestDonnation', data);
                      
                      toast.info("Donnation have been created"); 
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
                };

                axios
                  .post(
                    `http://localhost:8000/donnation/requestDonnation/${id}`,
                    data
                  )
                  .then((response) => {
                    console.log(response);
                    socket.current.emit('requestDonnation', data);
                   
                    toast.info("Donnation have been created");
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
          <Navbar  donation={donation}  />

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
                        <form className="share-text-box">
                          <div>
                            <select
                              className="share-text-field"
                              name="sector"
                              onChange={(event) =>
                                setSector(event.target.value)
                              }
                              value={sector}
                            >
                              <option value="">Sector</option>
                              <option value="Health">Health</option>
                              <option value="Nature">Nature</option>
                              <option value="Education">Education</option>
                              <option value="Poverty">Poverty</option>
                            </select>
                            {errors.sector !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.sector}{" "}
                              </div>
                            ) : (
                              ""
                            )}
                            <br></br>
                          </div>

                          <div>
                            <select
                              className="share-text-field"
                              name="type"
                              onChange={(event) => setType(event.target.value)}
                              value={type}
                            >
                              <option value="">Type</option>
                              <option value="Money">Money</option>
                              <option value="Clothes">Clothes</option>
                              <option value="Blood">Blood</option>
                              <option value="Food">Food</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.type !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.type}{" "}
                              </div>
                            ) : (
                              ""
                            )}
                            <br></br>
                          </div>

                          <div>
                            <input
                              onChange={(event) => setGoal(event.target.value)}
                              value={goal}
                              type="number"
                              className="share-text-field"
                              placeholder="Goal"
                            />
                            {errors.goal !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.goal}{" "}
                              </div>
                            ) : (
                              ""
                            )}
                            <br></br>
                          </div>
                          <div>
                            <input
                              onChange={(event) =>
                                setLocation(event.target.value)
                              }
                              value={location}
                              type="text"
                              className="share-text-field"
                              placeholder="Location"
                            />
                            {errors.location !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.location}{" "}
                              </div>
                            ) : (
                              ""
                            )}

                            <br></br>
                          </div>
                          <div>
                            <textarea
                              onChange={(event) =>
                                setDescription(event.target.value)
                              }
                              value={description}
                              name="share"
                              className="share-text-field"
                              aria-disabled="true"
                              placeholder="Description"
                              id="description"
                            ></textarea>
                            {errors.description !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.description}{" "}
                              </div>
                            ) : (
                              ""
                            )}
                            <br></br>
                          </div>
                          <div>
                            <input
                              onChange={(event) => setDate(event.target.value)}
                              value={date}
                              type="date"
                              className="share-text-field"
                            />
                            {errors.date !== " " ? (
                              <div
                                style={{
                                  textAlign: "left",
                                  paddingBottom: "10px",
                                  color: "rgb(220,71,52)",
                                }}
                              >
                                {errors.date}{" "}
                              </div>
                            ) : (
                              ""
                            )}
                            <br></br>
                          </div>
                          <div>
                            <label className="form-label">
                              Choose a Picture
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={(event) =>
                                setPicture(event.target.files[0])
                              }
                            />
                          </div>
                          <br></br>

                          <button
                            onClick={handleSubmit}
                            className="edit-btn"
                            type="submit"
                          >
                            Request
                          </button>
                        </form>
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
