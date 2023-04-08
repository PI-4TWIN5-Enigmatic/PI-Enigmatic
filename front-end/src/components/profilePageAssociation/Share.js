import React, { useRef } from 'react'
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import moment from "moment";
import InputEmoji from 'react-input-emoji'


import {

    Divider
} from "@mui/material";

import { FaPhotoVideo, FaCalendarAlt, FaNewspaper, FaVideo, } from 'react-icons/fa';
import { ImStatsBars, ImPlay, ImLink, ImImage } from "react-icons/im";

import { Modal } from "react-bootstrap";
import "./share.css";
import { toast } from 'react-toastify';
import axios from 'axios';

import { Cookies, useCookies } from 'react-cookie';


const Share = () => {

    const [association, setAssociation] = useState(null);
    const { id } = useParams();
    const [showModal, setShow] = useState(false);
    const [showModall, setShoww] = useState(false);
    const handleClosee = () => setShoww(false);
    const handleShoww = () => setShoww(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [cookies, _] = useCookies(['access_token'])


    const postid = useParams();
    const idCurrentUser = window.localStorage.getItem("id");

    const [inputValue, setInputValue] = useState('');


    const [file, setfile] = useState(null)

    const messagee = useRef();




    const { idd } = useParams();

    const [currentEvent, setCurrentEvent] = useState('');
    const [image, setimg] = useState('');
    const [posterId, setposterid] = useState('');
    const [iddd, setid] = useState(null);

    const [locationEvent, setLocationEvent] = useState('');
    const [message, setmessage] = useState('');
    const [posts, setData] = useState("");


    const [liked, setlikes] = useState("");

    const [showModalme, setShowme] = useState(false);
    const handleCloseme = () => setShowme(false);
    const handleshowme = () => setShowme(true);


    const getpostbyid = async () => {
        const response = await fetch(`http://localhost:8000/api/post/getpostsassociation/${id}`, {
            method: "GET", headers: {
                "Content-Type": "application/json",

            },

        });

        const data = await response.json();
        setData(data);
        console.log(data);
    };
    useEffect(() => {
        getpostbyid();
    }, []);



    const handlecomment = (text, e) => {

        // Send a POST request to the backend API
        fetch(`http://localhost:8000/api/post/comment-post/${e}`, {
            method: "PUT", headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                text: text,
                commenterpseudo: association.name,
                commenterid: association._id,
            })

        }).then(response => response.json())

            .then((result) => console.log(result));

    }





    const submitHandeler = (e) => {
        e.preventDefault();

        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', "siwarse");
        axios.post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
            .then((result) => {


                const newPost = {
                    posterId: association._id,
                    message: messagee.current.value,
                    img: result.data.secure_url,
                    likers: [],
                    comments: [],

                };
                // Send a POST request to the backend API

                axios.post("http://localhost:8000/api/post", newPost)
                    .then(response => {
                        console.log(response);
                        window.location.reload();
                        // Handle success response
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle error response
                    });

            })
    }


    const uploadimage = () => {
        //dxououehj
        //siwarse
        //https://api.cloudinary.com/v1_1/
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', "siwarse");
        axios.post("https://api.cloudinary.com/v1_1/dxououehj/upload", form)
            .then((result) => console.log(result));
    };

    const likePost = (e) => {
        fetch(`http://localhost:8000/api/post/like-post/${e}`, {
            method: "PUT", headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                id: association._id,
            })

        }).then(response => response.json())

            .then((result) => console.log(result));
        window.location.reload()


    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/post/${id}`)
            .then(response => {
                console.log('Post deleted successfully');
                toast.info("Post have been deleted")
                window.location.reload();

            })
            .catch(error => {
                console.error('Error deleting item', error);
            });
    };







    const unlikePost = (e) => {
        fetch(`http://localhost:8000/api/post/unlike-post/${e}`, {
            method: "PUT", headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                id: idCurrentUser,
            })

        }).then(response => response.json())

            .then((result) => console.log(result));
        window.location.reload()


    }














    const getAssociation = async () => {
        const response = await fetch(`http://localhost:8000/association/get/${id}`, {
            method: "GET",

        });

        const data = await response.json();
        setAssociation(data);
        console.log(data);
    };
    useEffect(() => {
        getAssociation();
    }, []);


    if (!association) return null;


    const {
        logoPicture, name, _id
    } = association;


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const isButtonDisabled = inputValue === '';





    return (
        <>




            <div className="col-lg-6 order-1 order-lg-2">
                <div className="card card-small">
                    <div className="share-box-inner">
                        <div className="profile-thumb">
                            <a href="#">
                                <figure className="profile-thumb-middle">
                                    <img src={logoPicture} alt="profile picture" />
                                </figure>
                            </a>
                        </div>

                        <div className="share-content-box w-100" onClick={handleShoww}>

                            <form className="share-text-box">
                                <InputEmoji name="share" className="share-text-field"
                                    aria-disabled="true" placeholder={"what's on your mind " + name + " ? "}
                                    data-toggle="modal" data-target="#textbox" id="email"
                                >

                                </InputEmoji>

                            </form>


                        </div>



                       
                        {cookies.access_token && (<Modal class="modal fade" id="textbox" aria-labelledby="textbox" style={{ width: '1900px', marginTop: '150px' }} show={showModall} onHide={handleClosee}>
                            <div class="modal-content" style={{
                                height: '150%',
                                width: '150%'
                            }}>
                                <Modal.Header class="modal-header" closeButton>
                                    <h5 class="modal-title">Share Your Mood</h5>
                                </Modal.Header>
                                <Modal.Body class="modal-body custom-scroll">


                                    <div className='class="share-creation-state__member-info'>
                                        <div className="profile-thumb">
                                            <a href="#">
                                                <figure className="profile-thumb-middle">
                                                    <img src={logoPicture} alt="profile picture" />
                                                </figure>
                                            </a>
                                        </div>




                                        <textarea class="share-field-big custom-scroll" placeholder="De quoi souhaitez vous discutez?"
                                            onChange={handleInputChange} data-target="#textbox" id="email"
                                            ref={messagee}   ></textarea>  </div>
                                </Modal.Body>




                                <Modal.Footer class="modal-footer" >
                                    <div className='margin'>
                                        <div className="icon-containerr" >


                                            <label className="iconn-wrapper" >
                                                <FaPhotoVideo className="icon-bluee" />

                                                <span className="label">Photo </span>
                                                <input style={{ display: 'none' }} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setfile(e.target.files[0])} />

                                            </label>
                                            <button className="iconn-wrapper" onClick={handleShow}>
                                                <FaCalendarAlt className="icon-bluee" />
                                                <span className="label">Event</span>
                                            </button>
                                            <button className="iconn-wrapper" onClick={handleShow}>
                                                <FaNewspaper className="icon-bluee" />
                                                <span className="label">Article</span>
                                            </button>

                                            <button onClick={submitHandeler} disabled={isButtonDisabled} class="post-share-btn" >

                                                upload
                                            </button>




                                        </div>    </div>
                                </Modal.Footer>
                            </div>     </Modal>)}
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header className='modelheader' closeButton>


                            </Modal.Header>
                            <Modal.Body className='modelcontent'>



                                <label type="file" htmlFor="file" id="ember1142" class="input">select images here


                                    <input style={{ display: 'none' }} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setfile(e.target.files[0])} />
                                </label>





                            </Modal.Body>
                            <Modal.Footer className='modelfooterr'>
                                <button className='buttonfooter' onClick={handleClose}>
                                    Close
                                </button>
                                <button className='buttonfooter' onClick={uploadimage}>upload</button>
                            </Modal.Footer>
                        </Modal>









                    </div>
                    <Divider sx={{ margin: "0.90rem 0" }} />

                    <div>
                        <div className="icon-container" >

                            <button className="icon-wrapper" onClick={handleShow} >
                                <ImImage className="icon-blue" />
                                <span className="label" style={{ marginLeft: "8px" }}><strong>Photo </strong></span>
                                <input style={{ display: 'none' }} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setfile(e.target.files[0])} />

                            </button>
                            <button className="icon-wrapper" onClick={handleShow}>
                                <ImStatsBars className="icon-green" />
                                <span className="label" style={{ marginLeft: "8px" }}><strong>Sondage</strong></span>
                            </button>
                            <button className="icon-wrapper" onClick={handleShow}>
                                <ImLink className="icon-orange" />
                                <span className="label" style={{ marginLeft: "8px" }} ><strong>Link</strong></span>
                            </button>
                            <button className="icon-wrapper" onClick={handleShow}>
                                <ImPlay className="icon-red" />
                                <span className="label" style={{ marginLeft: "8px" }}><strong>Video</strong></span>
                            </button>
                        </div>  </div></div>



                {Array.from(posts).map((e) =>

                    <div className="card" key={e._id}>




                        <div className="post-title d-flex align-items-center">
                            <div className="profile-thumb">
                                <a href="#">
                                    <figure className="profile-thumb-middle">
                                        <img src={logoPicture} alt="profile picture" />
                                    </figure>
                                </a>
                            </div>


                            <div className="posted-author">
                                <h6 className="author"><a href="profile.html">{name} </a></h6>
                                <span className="date">{moment(e.createdAt).fromNow()}</span>

                            </div>

                            <div className="post-settings-bar">
                                <span></span>
                                <span></span>
                                <span></span>
                                <div className="post-settings arrow-shape">
                                    <ul>

                                        <li><button onClick={handleshowme}>edit post</button ></li>
                                        <Modal className='sharebox' show={showModalme} onHide={handleCloseme} >
                                            <Modal.Header className='modelheader2' closeButton>  </Modal.Header>
                                            <Modal.Body className='modelcontentt'>


                                                <div className='class="share-creation-state__member-info'>
                                                    <div className="profile-thumb">
                                                        <a href="#">
                                                            <figure className="profile-thumb-middle">
                                                                <img src={logoPicture} alt="profile picture" />
                                                            </figure>
                                                        </a>
                                                    </div>

                                                    <input value={message}
                                                        onChange={(e) => setmessage(e.target.value)} />
                                                </div>
                                            </Modal.Body></Modal>


                                        <li><button onClick={() => handleDelete(e._id)}>delete post </button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="post-content">
                            <p className="post-desc">
                                {e.message}
                            </p>
                            <div className="post-thumb-gallery img-gallery">
                                <div className="row no-gutters">
                                    <div className="col-8">
                                        <figure className="post-thumb">
                                            <a className="gallery-selector" >
                                                <img src={e.img} alt="postpicture" style={{ marginLeft: "80px" }} />
                                            </a>
                                        </figure>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="post-meta">


                            {!e.likers.includes(association._id) ? (

  <button class="post-meta-like" style={{ color: "black" }}>
                               {cookies.access_token &&( <i class="bi bi-heart-beat" style={{ color: "black" }}

                                        onClick={() => { likePost(e._id) }}  ></i>)}
                                  {cookies.access_token &&(   <span> {e.likers.length}   </span>)}
                                </button>
                            ) : (
                                <button class="post-meta-like" style={{ color: "red" }}>
                                   {cookies.access_token &&(  <i class="bi bi-heart-beat" style={{ color: "red" }}
                                        onClick={() => { unlikePost(e._id) }}></i>)}
                                    {cookies.access_token &&( <span> {e.likers.length}   </span>)}
                                </button>)}






                                   <ul className="comment-share-meta" onClick={toggleVisibility}> 

                                <li>
                                    <button className="post-comment">
                                        <i className="bi bi-chat-bubble"></i>
                                        <span>{e.comments.length}</span>



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
                        <Divider sx={{ margin: "0.90rem 0" }} />


                        {(cookies.access_token && <div className="share-box-inner">
                             <div className="profile-thumbb">
                                <a href="#">
                                    <figure className="profile-thumb-middlee">
                                        <img src={logoPicture} alt="profile picture" className='taswira' />
                                    </figure>
                                </a>
                            </div>


                           <div className="comment-containerrrrr">
                              <form onSubmit={(event) => {
                                    handlecomment(event.target[0].value, e._id)
                                }}>

                                    <input type="text" placeholder="add a comment" className='form' />
                                </form>
                                {/* <InputEmoji     ></InputEmoji> */}


                            </div>
                            <br></br>





                        </div>  )}                      <Divider sx={{ margin: "0.90rem 0" }} />

                        {isVisible && (<div>

                            {e.comments.map(record => {

                                return (

                                    <div class="card">
                                        <div class="post-title d-flex align-items-center">
                                            <div class="profile-thumb">
                                                <a href="#">
                                                    <figure class="profile-thumb-middle">
                                                        <img src={logoPicture} alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div class="posted-author">
                                                <h6 class="author">{record.commenterpseudo}</h6>
                                                <span class="post-time">{moment(record.createdAt).fromNow()}</span>
                                            </div>

                                            <div class="post-settings-bar">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <div class="post-settings arrow-shape">
                                                    <ul>
                                                        <li><button>edit post</button></li>
                                                        <li><button>embed adda</button></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-content">
                                            <p class="post-desc">
                                                {record.text}
                                            </p></div></div>)
                            })}</div>)}
































                        <div >







                        </div></div>





                )}





            </div>













        </>

    )
}

export default Share