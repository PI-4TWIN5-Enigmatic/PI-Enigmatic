import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Case(props) {
  const { entity } = props;

  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const getUser = async (id) => {
    const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const userId = entity.requester;
    getUser(userId)
      .then((userData) => {
        if (userData) {
            setUserImage(userData.profilePicture);
          setUserName(`${userData.firstName} ${userData.lastName}`);
          setUserEmail(userData.email);
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
          <h4 class="author"><a href="profile.html">{userName}</a>
          </h4>
        </div>
      </>
    );
}

function ListDonnation(props) {
  const [entities, setEntities] = useState([]);

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

  return (
    <>
      {entities.map((d) => (
        <div className="card" key={d._id}>
          <div className="post-title d-flex align-items-center">
            <Case key={d._id} entity={d} />

            <div className="post-settings-bar">
              <span></span>
              <span></span>
              <span></span>

              <div className="post-settings arrow-shape">
                {d.requester == window.localStorage.getItem("id") ? (
                  <ul>
                    <li>
                      <button>
                        <Link
                          to={`http://localhost:3000/donnation/update/${d._id}`}
                        >
                          {" "}
                          Edit donnation{" "}
                        </Link>
                      </button>
                      <button>Delete donnation</button>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <button></button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <span className="post-time">{d.createdAt}</span>
          <div className="post-content">
            <h5
              style={{
                textAlign: "left",
                paddingBottom: "10px",
                color: "rgb(220,71,52)",
              }}
            >
              Sector : {d.sector}
            </h5>
            <h6
              style={{
                textAlign: "left",
                paddingBottom: "10px",
                color: "rgb(220,71,52)",
              }}
            >
              Type : {d.type}
            </h6>
            <h6
              style={{
                textAlign: "left",
                paddingBottom: "10px",
                color: "rgb(220,71,52)",
              }}
            >
              {" "}
              Goal : {d.goal}
            </h6>
            <p className="post-desc">
              Description : <br></br>
              {d.description}
            </p>
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
