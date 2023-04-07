

import React , { useState,useEffect } from 'react'


import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";
import { FaPhotoVideo, FaCalendarAlt, FaNewspaper, FaVideo, falocation } from 'react-icons/fa';



const Updatepost = () => {


    const { id } = useParams();
   
    const [message,setmessage]=useState('');
    const [img, setimage] = useState('');
    const [posts, setData] = useState("");


    const [file, setfile] = useState(null)

    const [user, setUser] = useState(null);
      const [showModalme, setShowme] = useState(false);
    const handleCloseme = () => setShowme(false);
    const handleshowme = () => setShowme(true);


    const getpostbyid = async () => {
        const response = await fetch(`http://localhost:8000/api/post/getposts/${id}`, {
            method: "GET", headers: {
                "Content-Type": "application/json",

            },

        });

        const data = await response.json();
        setmessage(data.message)

        setData(data);
        console.log(data);
    };
    useEffect(() => {
        getpostbyid();
    }, []);

    
    const {
        mes
    } = posts;


    


    const handleupdate = (id) => {



        const data = {

            message,


        }

        axios.put(`http://localhost:8000/api/post/updatepost/${id}`, data)
            .then(response => {
                console.log(response);
                toast.info("Post have been updated")
                // Handle success response
            })
            .catch(error => {
                console.error(error);
                // Handle error response
            });
    }





    


    const getUser = async () => {
        const response = await fetch(`http://localhost:8000/api/getuser/${id}`, {
            method: "GET",

        });

        const data = await response.json();
        setUser(data);
        console.log(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;


    const {
    profilePicture,
    } = user;


  





    return (
        <>


{Array.from(posts).map((e) =>
<div key={e._id}>
<li><button onClick={handleshowme} >edit post</button ></li>


<Modal class="modal fade" show={showModalme} onHide={handleCloseme} >
    
                                            <div class="modal-content" style={{
                                                height: '150%',
                                                width: '150%'
                                            }}>
                                                <Modal.Header class="modal-header" closeButton>
                                                </Modal.Header>
                                                <Modal.Body class="modal-body custom-scroll">


                                                    <div className='class="share-creation-state__member-info'>
                                                        <div className="profile-thumb">
                                                            <a href="#">
                                                                <figure className="profile-thumb-middle">
                                                                    <img src={profilePicture} alt="profile picture" />

                                                                </figure>
                                                            </a>
                                                        </div>



                                                        <div className="row">
                                                        <input type="email" defaultValue={e.message} onChange={(e) => setmessage(e.target.value)}  className="single-field" placeholder="Email"/>
                            <button onClick={() => handleupdate(e._id)}>hi</button>
                        

                                                        </div>















                                                    </div>

                                                    <Modal.Footer class="modal-footer" >
                                                        <div className='margin'>
                                                            <div className="icon-containerr" >

                                                                <div className="form-outline mb-4">
                                                                    <div className="mb-3">
                                                                        <input className="form-control" type="file" id="formFile" onChange={(e) => setimage(e.target.files[0])} />
                                                                        <label className="form-label">Choose a Picture</label>

                                                                    </div>
                                                                </div>








                                                                <button onClick={() => handleupdate(e._id)}class="post-share-btn" >

                                                                    Edit
                                                                </button>




                                                            </div>    </div>
                                                    </Modal.Footer>
                                                </Modal.Body></div></Modal>





        </div>

        
)}
        
        
        
        
        
        </>
    )
}



export default Updatepost;