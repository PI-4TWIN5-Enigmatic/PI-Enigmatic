import React from "react";



import Vid1 from "../../assets/reels/reel1.mp4"
import Vid2 from "../../assets/reels/reel2.mp4";
import Vid3 from "../../assets/reels/reel3.mp4";

import "./Reels.css";
import Video from "../Video/Video";
import Navbar from "../Navbar/Navbar";


export default function Reels() {
  const data = [
    {
      channel: "aaa",
      song: "song-1",
      url: Vid1,
      likes: "32",
      comment: "2",
      shares: "23",
    },
    {
      channel: "bbb",
      song: "song-2",
      url: Vid2,
      likes: "3",
      comment: "22",
      shares: "23",
    },
    {
      channel: "ccc",
      song: "song-3",
      url: Vid3,
      likes: "89",
      comment: "23",
      shares: "29",
    },
  ];

  return (
    <>
      <Navbar />
      
      <div className="Reels">
        <center>
          {/*  */}

          <div className="video-container" id="video-container">
            {/*  */}

            {data.map((list, i) => (
              <Video
                key={i}
                channel={list.channel}
                song={list.song}
                url={list.url}
                likes={list.likes}
                comment={list.comment}
                shares={list.shares}
              />
            ))}

            {/*  */}
          </div>
        </center>
      </div>
    </>
  );
}
