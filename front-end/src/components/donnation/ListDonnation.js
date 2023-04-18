import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import DonateButton from "./DonateButton";
import ProgressBar from "./ProgressBar";

function Case(props) {
  const { entity } = props;

  const [isLoading, setIsLoading] = useState(false);
  
  const [userId,setUserId] = useState(null)
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const getUser = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    const requesterId = entity.requester;
    setUserId(requesterId);
    getUser(requesterId)
      .then((userData) => {
        if (userData) {
          setUserImage(userData.profilePicture);
          setUserName(`${userData.firstName} ${userData.lastName}`);
          setUserEmail(userData.email);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }, [entity]);
  return (
    <>
      
          <div className="profile-thumb">
            <a href="#">
              <figure className="profile-thumb-middle">
                <img src={userImage} alt="profile picture" />
              </figure>
            </a>
          </div>
          <div className="posted-author">
                <h6 className="author">
                  <a href="profile.html">
                   <Link to={`/profile/${userId}`}>
                <a href="">{userName}</a>
              </Link>
                  </a>
                </h6>
          </div>
      
    </>
  );
}

function ListDonnation(props) {
  const [entities, setEntities] = useState([]);
  const [payment, setPayment] = useState("");

  const navigate = useNavigate();


 
  const getAllDonnations = async () => {
    const response = await fetch(
      `http://localhost:8000/donnation/getAllDonnation`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setEntities(data);
    console.log(data);
  };
  useEffect(() => {
    getAllDonnations();
  }, []);

    async function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete your request ?')) {
            await axios
                .delete(`http://localhost:8000/donnation/deleteDonnation/${id}`)

                .then((response) => {
                    toast.info("Request  has been deleted");
                      navigate(
                        `/donnation/request/${window.localStorage.getItem(
                          "id"
                        )}`
                      );
                })
        };
    
    }
  return (
    <>
      {entities.map((d) => (
        <div className="card" key={d._id}>
          <div className="post-title d-flex align-items-center">
            <Case key={d._id} entity={d} />
            {d.requester == window.localStorage.getItem("id") ? (
              <div className="post-settings-bar">
                <span></span>
                <span></span>
                <span></span>

                <div className="post-settings arrow-shape">
                  <ul>
                    <li>
                      <button>
                        <Link
                          className="author"
                          to={`http://localhost:3000/donnation/update/${d._id}`}
                        >
                          {" "}
                          Edit donnation{" "}
                        </Link>
                      </button>
                      <button
                        type="submit"
                        onClick={() => {
                          handleDelete(d._id);
                        }}
                      >
                        Delete donnation
                      </button>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <button></button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <span className="date">{moment(d.createdAt).fromNow()}</span>
          <div className="post-content">
            <h5>Sector : {d.sector}</h5>
            <h6>Type : {d.type}</h6>
            {d.type === "Money" ? (
              <h6>Goal : {d.goal} DT</h6>
            ) : d.type === "Food" ? (
              <h6>Goal : {d.goal} Meal</h6>
            ) : d.type === "Clothes" ? (
              <h6>Goal : {d.goal} Clothes</h6>
            ) : d.type === "Blood" ? (
              <h6>Goal : {d.goal} ml </h6>
            ) : (
              <h6>Goal : {d.goal} </h6>
            )}
            <br></br>

            <p className="post-desc">
              Description : <br></br>
              {d.description}
            </p>

            <div>
              {d.type === "Money" || d.type === "Other" ? (
                <div>
                  {(() => {
                    const progress =
                      (parseInt(d.benefit) * 100) / parseInt(d.goal);
                    return (
                      <>
                        <h4
                          style={{
                            textAlign: "left",
                            paddingBottom: "10px",
                            color: "rgb(220,71,52)",
                          }}
                        >
                          Donation Progress is {progress.toFixed(2)} %{" "}
                        </h4>
                        <ProgressBar done={progress.toFixed(2)} />
                      </>
                    );
                  })()}
                  <div>
                    <label>You want to help ? &ensp;&ensp;</label>
                    <input
                      onChange={(event) => setPayment(event.target.value)}
                      value={payment}
                      type="number"
                      className="share-text-field"
                    />{" "}
                    DT &ensp;&ensp;
                    <DonateButton donation={d} amount={payment} />
                    <br></br><br></br>
                    <p
                      style={{
                        textAlign: "left",
                        paddingBottom: "10px",
                        color: "rgb(220,71,52)",
                      }}
                    >
                      Please call {d.phone} for more information or donation{" "}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <hr></hr>
            <div className="post-thumb-gallery">
              <figure className="post-thumb img-popup">
                {d.picture ? (
                  <img src={d.picture} alt="post image" />
                ) : (
                  <div></div>
                )}
              </figure>
            </div>
            <div className="post-meta">
              <button className="post-meta-like">
                <i className="bi bi-heart-beat"></i>
                <span>You and 201 people like this</span>
                <strong>201</strong>
              </button>
              <ul className="comment-share-meta">
                <li>
                  <button className="post-comment">
                    <i className="bi bi-chat-bubble"></i>
                    <span>41</span>
                  </button>
                </li>
                <li>
                  <button className="post-share">
                    <i className="bi bi-share"></i>
                    <span>07</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListDonnation;
