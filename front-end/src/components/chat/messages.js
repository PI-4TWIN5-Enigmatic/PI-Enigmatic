import React from 'react';
import Filter from 'bad-words';
import { useEffect, useState } from "react";
import { format } from "timeago.js"

const Messages = ({ message, own }) => {
  const [filteredMessage, setFilteredMessage] = useState("");

  useEffect(() => {
    const filterMessage = () => {
      const filter = new Filter();
      const filteredText = filter.clean(message.text);
      setFilteredMessage(filteredText);
    };
    filterMessage();
  }, [message]);

  return (
    <>
      <li className={own ? "text-author" : "text-friends"}>
        <p>{filteredMessage}</p>
        <div className="message-time">{format(message.createdAt)}</div>
      </li>
    </>
  );
};

export default Messages;
