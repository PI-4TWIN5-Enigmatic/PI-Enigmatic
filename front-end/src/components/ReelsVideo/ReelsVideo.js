import React, { useRef, useState, useEffect } from "react";

// import components


import "./ReelsVideo.css";
import Header from "../ReelsHeader/Header";
import Footer from "../ReelsFooter/Footer";


export default function ReelsVideo({ channel, song, url, likes, comment, shares }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className="video-cards">
      <Header />
      <video onClick={onVideoClick} className="video-player" ref={vidRef} loop>
        <source src={url} type="video/mp4" />
      </video>
      <Footer
        channel={channel}
        song={song}
        likes={likes}
        comment={comment}
        shares={shares}
      />
    </div>
  );
}
