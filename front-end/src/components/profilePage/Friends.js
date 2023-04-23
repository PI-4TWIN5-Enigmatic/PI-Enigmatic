import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"





const Friends = () => {
// const user = JSON.parse(localStorage.getItem('user'))
// const socket = useRef()
// const [onlineUsers, setOnlineUsers] = useState([]);
// const [friends , setFriends] = useState([]);
// const [onlineFriends , setOnlineFriends]= useState([]);


// useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.emit("addUser", user?._id);
//     socket.current.on("getUsers", users => {
//         console.log(users)
//       setOnlineUsers(user.followingProfil.filter(f => users.some(u=> u.userId === f)))
     
//     })
// }, []
// );

// useEffect(()=>{
// const getFriends = async () =>{
//     const res = await axios.get(`http://127.0.0.1:8000/api/${user._id}/followedProfiles`)
//     setFriends(res.data)
// }
// getFriends()
// },[]
// )

// useEffect(()=>{

// setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));

// },[friends,onlineFriends])


//   return (
// <>

// <div className="card widget-item">
//                                 <h4 className="widget-title">Online Friends</h4>
//                                 <div className="widget-body">
//                                     <ul className="like-page-list-wrapper">
//                                         {onlineFriends.map((o)=>(
//                                         <li className="unorder-list">

//                                             <div className="profile-thumb active">
//                                                 <a href="#">
//                                                     <figure className="profile-thumb-small">
//                                                         <img src={o?.profilePicture} alt="profile picture" />
//                                                     </figure>
//                                                 </a>
//                                             </div>

//                                             <div className="unorder-list-info">
//                                                 <h3 className="list-title"><a href="#">{o?.firstName} {o?.lastName}</a></h3>
                                                
//                                             </div>
                                            
//                                         </li>
//                                         ))}
                                       
//                                     </ul>
//                                 </div>
//                             </div>



// </>  )
}

export default Friends