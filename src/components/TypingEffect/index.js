import "./typingeffect.css";
import React, { useState, useEffect } from "react";

const TypingEffect = ({
  message,
  speed,
  avatar,
  eraseSpeed = 50,
  shouldErase = false,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer;
    if (typing) {
      timer = setTimeout(() => {
        setCurrentMessage(message.slice(0, currentMessage.length + 1));
        if (currentMessage.length === message.length) {
          setTyping(false);
          if (shouldErase) {
            setTimeout(() => {
              setTyping(true);
              setCurrentMessage("");
            }, eraseSpeed);
          }
        }
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [currentMessage, message, speed, typing, eraseSpeed, shouldErase]);

  useEffect(() => {
    if (message !== currentMessage) {
      setCurrentMessage("");
      setTyping(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <div className="typing-effect-container">
      {avatar && (
        <div className="typing-effect-avatar">
          <img src={avatar} alt="Avatar" />
        </div>
      )}
      <div className="typing-effect-message">
        {currentMessage}
        <span style={{ visibility: typing ? "visible" : "hidden" }}>|</span>
      </div>
    </div>
  );
};

export default TypingEffect;
