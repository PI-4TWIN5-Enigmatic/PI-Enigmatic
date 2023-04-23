    import React, { useEffect, useState } from 'react'
    import Navbar from '../Navbar/Navbar';
import { async } from 'react-input-emoji';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserID } from '../../hooks/useGetUserID';
import { toast } from "react-toastify";


    function DetailDonation() {
        const idd = useGetUserID();
        const [entities, setEntities] = useState([]);
        const navigate = useNavigate()
        const { id } = useParams();


        const getdetailNotification = async () => {
            const response = await fetch(
            `http://localhost:8000/notifications/detailNotification/${id}?populate=related_donation`,
            {
                method: "GET",
            }
            );
            const data = await response.json();
            setEntities(data);
            console.log(data);
        };

        useEffect(() => {
            getdetailNotification();
        }, []);

        const handleAccept = async () => {
            try {
              await fetch(`http://localhost:8000/association/addDonationToUserAssociation/${idd}/${entities.related_donation._id}`, {
                method: 'POST'
              });
              await fetch(`http://localhost:8000/notifications/deleteNotification/${entities._id}`, {
                  method: 'DELETE'
                });
              toast.info("Donation associated with successfully "); 
              navigate(`/donnation/request/${idd}`)
              
            } catch (error) {
              console.error(error);
            }
           
          };

          const handleReject = async () => {
            try {
              // Vérifier si l'utilisateur actuel correspond à l'utilisateur qui a créé la donation
              if (idd === entities.related_donation.requester) {
                await fetch(`http://localhost:8000/donnation/deleteDonnation/${entities.related_donation._id}`, {
                  method: 'DELETE'
                });
                await fetch(`http://localhost:8000/notifications/deleteNotification/${entities._id}`, {
                  method: 'DELETE'
                });
                toast.info("Donation deleted successfully ");
                navigate(`/donnation/request/${idd}`);
              } else {
                toast.error("You can only delete your own donations");
              }
            } catch (error) {
              console.error(error);
            }
          };

        
          
    return (

        <>
        
        <div>
            <Navbar   />

            <div
                class="main-wrapper pt-80"
                style={{ backgroundColor: "#bcbcbc42", marginTop: "30px" }}
            >
                <div className="container">
                <div className="row">
                    <div class="col-lg-3 order-2 order-lg-1"></div>

                    <div className="col-lg-6 order-1 order-lg-2">
                    <center>
                    
                    </center>
                    

                    {entities && entities.related_donation && (
            <div className="card" key={entities.related_donation._id}>
            
            {/* <span className="date">{moment(entities.related_donation.createdAt).fromNow()}</span> */}
            <div className="post-content">
                <h5
                style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                }}
                >
                Sector : {entities.related_donation.sector}
                </h5>
                <h6
                style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                }}
                >
                Type : {entities.related_donation.type}
                </h6>
                {entities.related_donation.type === "Money" ? (
                <h6
                    style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                    }}
                >
                    Goal : {entities.related_donation.goal} DT
                </h6>
                ) : entities.related_donation.type === "Food" ? (
                <h6
                    style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                    }}
                >
                    Goal : {entities.related_donation.goal} Meal
                </h6>
                ) : entities.related_donation.type === "Clothes" ? (
                <h6
                    style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                    }}
                >
                    Goal : {entities.related_donation.goal} Clothes
                </h6>
                ) : entities.related_donation.type === "Blood" ? (
                <h6
                    style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                    }}
                >
                    Goal : {entities.related_donation.goal} ml{" "}
                </h6>
                ) : (
                <h6
                    style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    color: "rgb(220,71,52)",
                    }}
                >
                    Goal : {entities.related_donation.goal}{" "}
                </h6>
                )}

                <p className="post-desc">
                Description : <br></br>
                {entities.related_donation.description}
                </p>
                <div className="post-thumb-gallery">
                <figure className="post-thumb img-popup">
                    {entities.related_donation.picture ? (
                    <img src={entities.related_donation.picture} alt="post image" />
                    ) : (
                    <div></div>
                    )}
                </figure>
                </div>
                <div className="post-meta">
                <button
                    className="post-meta-like"
                    style={{
                        backgroundColor: 'rgb(220,71,52)',
                        color: '#fff',
                        marginRight: '60px',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={()=>{handleReject(entities._id)}}>
                    Supprimer
                </button>
                <button
                    className="post-meta-like"
                    style={{
                        backgroundColor: 'green',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleAccept}
                >
                    Accepter
                </button>
            </div>            </div>    
            </div>
        )}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    
        )
    }

    export default DetailDonation