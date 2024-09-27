import React, { useState } from "react";
import CourseDesc from "../components/coursedec/CourseDesc";
import CourseStats from "../components/coursestats/CourseStats";
import CourseOutline from "../components/courseoutline/CourseOutline";
import CourseValid from "../components/morevalue/CourseValid";
import ProjectShow from "../components/projectshowcase/ProjectShow";
import ChatComponent from "../components/chat/Chat";
import { useParams } from "react-router-dom";
import "../index.css";

import FixedButton from "../components/fixedbutton/FixedButton";

const CourseDets = () => {
  const { id } = useParams(); // Extract the course ID from the URL
  const [showChat, setShowChat] = useState(false); // Manage chat modal visibility

  const handleChatOpen = () => {
    setShowChat(true); // Open chat modal
  };

  const handleChatClose = () => {
    setShowChat(false); // Close chat modal
  };

  return (
    <>
      <FixedButton onClick={handleChatOpen} />
      <CourseDesc courseId={id} />
      <ChatComponent show={showChat} handleClose={handleChatClose} />
      <CourseStats courseId={id} />
      <ProjectShow courseId={id} />
      <CourseOutline courseId={id} />
      <CourseValid />
    </>
  );
};

export default CourseDets;
