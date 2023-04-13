import React from 'react'
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";

const Memories = () => {


    const { id } = useParams();

    const [posts, setData] = useState("");
    const getpostbyid = async () => {
        const response = await fetch(
          `http://localhost:8000/api/post/getposts/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const data = await response.json();

        setData(data);
        console.log(data);
      };
      useEffect(() => {
        getpostbyid();
       
      }, []);
  return (
<>


               

                            <div className="card widget-item" >
                                <h4 className ="widget-title">Sweets Memories</h4>
                                <div className ="widget-body">
                                    <div className ="sweet-galley img-gallery">
                                        <div className ="row row-5">
                                            <div className ="col-4">
                                                <div className ="gallery-tem"  style={{display:"flex",flexWrap: "nowrap",width:"200px", "marginright": "50px"}}  >{Array.from(posts).map((e) => (

                                                    <figure className ="post-thumb"key={e._id} style={{display:"inline-block",width:"800px", "marginright": "50px"}} >
                                                        <a className ="gallery-selector" href="assets/images/gallery/gallery-1.jpg">
                                                            <img src={e.img} alt="sweet memory" style={{display:"flex",overflow:"auto",width:"1000px",  "margin": "10px"
}} />
                                                        </a>
                                                    </figure>
                                               ))}  </div>
                           </div></div></div></div></div>
                                        
                                           
                           

</>  )
}

export default Memories