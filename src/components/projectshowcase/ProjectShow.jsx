import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectShow.css";
import { useNavigate } from "react-router-dom";

const ProjectShow = ({ courseId }) => {
  const [courseOutline, setCourseOutline] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseOutlines = async () => {
      try {
        const response = await axios.get(
          "https://web-production-ddef.up.railway.app/api/course-project/"
        );
        // Filter the outlines based on courseId
        const filteredOutlines = response.data.filter(
          (outline) => outline.course === Number(courseId)
        );
        setCourseOutline(filteredOutlines);
        console.log(filteredOutlines);
      } catch (error) {
        console.error("Error fetching course outlines:", error);
      }
    };

    if (courseId) {
      fetchCourseOutlines();
    }
  }, [courseId]);

  return (
    <div className="project-show-container">
      {courseOutline.length > 0 ? (
        courseOutline.map((e) => (
          <div key={e.id} className="ProjectShow">
            <div className="project-num">
              <div className="line"></div>
              <h1>Project {e.course_project_num}</h1>
            </div>
            <div className="project-image">
              <img
                key={e.id}
                src={e.course_related_images}
                alt={`Project ${e.course_project_num}`}
                className="project-gif"
              />
            </div>
          </div>
        ))
      ) : (
        <p>No projects available for this course.</p>
      )}
    </div>
  );
};

export default ProjectShow;
