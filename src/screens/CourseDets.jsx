import React from "react";
import CourseDesc from "../components/coursedec/CourseDesc";
import CourseStats from "../components/coursestats/CourseStats";
import CourseOutline from "../components/courseoutline/CourseOutline";
import CourseValid from "../components/morevalue/CourseValid";

import { useParams } from "react-router-dom";
import axios from "axios";

import "../index.css";
import ProjectShow from "../components/projectshowcase/ProjectShow";

const CourseDets = () => {
  const { id } = useParams(); // Extract the course ID from the URL
  console.log(id);

  return (
    <div>
      <CourseDesc courseId={id} />
      <CourseStats courseId={id} />
      <ProjectShow courseId={id}> </ProjectShow>
      <CourseOutline courseId={id} />
      <CourseValid />
    </div>
  );
};

export default CourseDets;
