import axios from "axios";
import { useEffect, useState } from "react";
import {format} from "timeago.js"

const Messages = ({message,own}) => {


    

    return(
        <>
        <li className = {own ? "text-author" : "text-friends"}>
        <p>{message.text}</p>
        <div className ="message-time">{format(message.createdAt)}</div>
    </li>
  
   
    </>
    )

}


export default Messages