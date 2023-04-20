import React from 'react';
import Filter from 'bad-words';
import { useEffect, useState } from "react";
import { format } from "timeago.js"

const Messages = ({ message, own }) => {
  const [filteredMessage, setFilteredMessage] = useState("");
  const emojiRegex = new RegExp('^([\u{1F000}-\u{1FFFF}]+|:[a-z_]+:)+$', 'u');

  useEffect(() => {
    const filterMessage = () => {
      const filter = new Filter();
      const isEmojiOnly = message.text && emojiRegex.test(message.text.trim());
      const filteredText = isEmojiOnly ? message.text : filter.clean(message.text);
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
