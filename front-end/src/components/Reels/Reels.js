import React, { useEffect, useState } from "react";



import Vid1 from "../../assets/reels/reel1.mp4"
import Vid2 from "../../assets/reels/reel2.mp4";
import Vid3 from "../../assets/reels/reel3.mp4";

import "./Reels.css";
import Video from "../ReelsVideo/ReelsVideo";
import Navbar from "../Navbar/Navbar";
import axios from "axios";


export default function Reels() {
   const [reels, setReels] = useState([]);
   const [reelViews, setReelViews] = useState({});
    const [like,setLikes] = useState({});
    const [reelLikes, setReelLikes] = useState({});
    const userId = localStorage.getItem('id') // Remplacez par l'ID de l'utilisateur actuel



   useEffect(() => {
     axios
       .get("http://localhost:8000/reels/getAll")
       .then((response) => {
         setReels(response.data.reels);
         const views = response.data.reels.reduce(
          (acc, reel) => ({ ...acc, [reel._id]: reel.views }),
          {}
        );
        setReelViews(views);
       })
       .catch((error) => {
         console.error(error);
       });
   }, []);

   const handleIncrementViews = (reelId) => {
    axios
      .post(`http://localhost:8000/reels/increment/${reelId}`)
      .then((response) => {
        setReelViews((prevViews) => ({
          ...prevViews,
          [reelId]: prevViews[reelId] + 1
        }));
      })
      .catch((error) => {
        console.error(error);
        // Gestion de l'erreur
      });
  };

  const handleLike = (reelId) => {
    axios
      .post(`http://localhost:8000/reels/like/${reelId}/${userId}`)
      .then((response) => {
        const updatedLikes = response.data.likes;
        setLikes((prevLikes) => ({
          ...prevLikes,
          [reelId]: !prevLikes[reelId]
        }));
        setReelLikes((prevReelLikes) => ({
          ...prevReelLikes,
          [reelId]: updatedLikes
        }));
      })
      .catch((error) => {
        console.error(error);
        // Gestion de l'erreur
      });
  };

  useEffect(() => {
    const fetchReelLikes = async () => {
      try {
        const likesPromises = reels.map((reel) =>
          axios.get(`http://localhost:8000/reels/affichage/${reel._id}`)
        );
        const likesResponses = await Promise.all(likesPromises);
        const likesData = likesResponses.reduce(
          (acc, response, index) => ({
            ...acc,
            [reels[index]._id]: response.data.likes
          }),
          {}
        );
        setReelLikes(likesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReelLikes();
  }, [reels]);

 

  return (
    <>
      <Navbar />

      <div className="Reels">
        <center>
          {/*  */}

          <div className="video-container" id="video-container">
            {/*  */}

            {Array.isArray(reels) &&
              reels.map((reel, i) => (
                <Video
                  key={i}
                  channel="Channel"
                  song="Song"
                  url={reel.reelUrl}
                  likes={reelLikes[reel._id]}
                  comment="3"
                  shares={reelViews[reel._id]}
                  IncrementVue={() => handleIncrementViews(reel._id)}
                  onLike={() => handleLike(reel._id)}
                  isLiked={like[reel._id]} 
                 
                />
              ))}

            {/*  */}
          </div>
        </center>
      </div>
    </>
  );
}
