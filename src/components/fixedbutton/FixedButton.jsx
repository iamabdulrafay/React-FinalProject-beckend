import React from "react";
import image from "../../assets/chat.png";
import "./FixedButton.css";
const FixedButton = ({ onClick, top }) => {
  return (
    <div onClick={onClick}>
      <img src={image} style={{ top: top }} className="chat-img" alt="" />
    </div>
  );
};

export default FixedButton;
