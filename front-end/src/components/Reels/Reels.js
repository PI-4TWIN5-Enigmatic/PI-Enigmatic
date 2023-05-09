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

   useEffect(() => {
     axios
       .get("http://localhost:8000/reels/getAll")
       .then((response) => {
         setReels(response.data.reels);
       })
       .catch((error) => {
         console.error(error);
       });
   }, []);


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
                  likes="44"
                  comment="55"
                  shares="66"
                />
              ))}

            {/*  */}
          </div>
        </center>
      </div>
    </>
  );
}
