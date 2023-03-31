import axios from "axios";
import { useEffect, useState } from "react";

const Conversation = ({conversation , currentUser}) => {

    const [user , setUser] = useState(null);
    useEffect(()=>
    {
        const friendId = conversation.members.find((m)=> m !== currentUser._id);
        const getUser = async ()=>{
            try{
            const res = await axios.get("http://127.0.0.1:8000/api/getuser/"+friendId)
            setUser(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getUser()

    },[currentUser,conversation]
    )

    return (

        <li className="msg-list-item d-flex flex-container">
                                                 
        <div className="profile-thumb">
            <figure className="profile-thumb-middle">
         
            {user?    <img src={user.profilePicture} alt="profile picture" /> : null}
            </figure>
        </div>

        <div className="msg-content ">
        {user?      <h6 className="author " style={{ marginTop: '15px' }} >{user.lastName} {user.firstName}</h6>: null}
          
        </div>
      
        
      
    </li>

    )


}


export default Conversation