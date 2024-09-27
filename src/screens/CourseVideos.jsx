import React, { useState } from "react";
import VidoesContainer from "../components/videosContainer/VideosContainer";
import FixedButton from "../components/fixedbutton/FixedButton";
import ChatComponent from "../components/chat/Chat";

const CourseVideos = () => {
  const [showChat, setShowChat] = useState(false); // Manage chat modal visibility

  const handleChatOpen = () => {
    setShowChat(true); // Open chat modal
  };

  const handleChatClose = () => {
    setShowChat(false); // Close chat modal
  };
  return (
    <>
      <VidoesContainer></VidoesContainer>
      {/* <FixedButton top={"47%"} onClick={handleChatOpen} />

      <ChatComponent show={showChat} handleClose={handleChatClose} /> */}
    </>
  );
};

export default CourseVideos;
