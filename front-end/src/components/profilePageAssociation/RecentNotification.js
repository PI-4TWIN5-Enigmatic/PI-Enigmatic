import React from 'react'
import { useEffect, useState } from 'react';

const RecentNotifications = () => {


  return (
<>

<div className ="card widget-item">
                                <h4 className ="widget-title">Non-profit organisation you may add</h4>
                                <div className ="widget-body">
                                    <ul className ="like-page-list-wrapper">
                                    <li class="unorder-list">
                                   
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-9.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p className="list-subtitle">5 min ago</p>
                                            </div>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-35.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p className="list-subtitle">10 min ago</p>
                                            </div>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-15.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p className="list-subtitle">18 min ago</p>
                                            </div>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-6.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p className="list-subtitle">25 min ago</p>
                                            </div>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-34.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Any one can join with us if you want</a></h3>
                                                <p className="list-subtitle">39 min ago</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                           
                            <div className="card widget-item">
                                <h4 className="widget-title">Advertizement</h4>
                                <div className="widget-body">
                                    <div className="add-thumb">
                                        <a href="#">
                                            <img src="../assets/images/banner/advertise.jpg" alt="advertisement" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                          
                            <div className="card widget-item">
                                <h4 className="widget-title">Friends Zone</h4>
                                <div className="widget-body">
                                    <ul className="like-page-list-wrapper">
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="../assets/images/profile/profile-small-10.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">arfim bolt</a></h3>
                                                <p className="list-subtitle"><a href="#">10 mutual</a></p>
                                            </div>
                                            <button className="like-button">
                                                <img className="heart" src="assets/images/icons/heart.png" alt="" />
                                                <img className="heart-color" src="assets/images/icons/heart-color.png" alt="" />
                                            </button>
                                        </li>

                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-2.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">marry wither</a></h3>
                                                <p className="list-subtitle"><a href="#">02 mutual</a></p>
                                            </div>
                                            <button className="like-button active">
                                                <img className="heart" src="assets/images/icons/heart.png" alt="" />
                                                <img className="heart-color" src="assets/images/icons/heart-color.png" alt="" />
                                            </button>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-5.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Rolin Theitar</a></h3>
                                                <p className="list-subtitle"><a href="#">drama</a></p>
                                            </div>
                                            <button className="like-button">
                                                <img className="heart" src="assets/images/icons/heart.png" alt="" />
                                                <img className="heart-color" src="assets/images/icons/heart-color.png" alt="" />
                                            </button>
                                        </li>
                                        <li className="unorder-list">
                                            <div className="profile-thumb">
                                                <a href="#">
                                                    <figure className="profile-thumb-small">
                                                        <img src="assets/images/profile/profile-small-14.jpg" alt="profile picture" />
                                                    </figure>
                                                </a>
                                            </div>

                                            <div className="unorder-list-info">
                                                <h3 className="list-title"><a href="#">Active Mind</a></h3>
                                                <p className="list-subtitle"><a href="#">fitness</a></p>
                                            </div>
                                            <button className="like-button">
                                                <img className="heart" src="assets/images/icons/heart.png" alt="" />
                                                <img className="heart-color" src="assets/images/icons/heart-color.png" alt="" />
                                            </button>
                                        </li>


                                 
                                    </ul>
                                </div>
                            </div>



</>  )
}

export default RecentNotifications