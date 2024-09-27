import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CourseOutline.css";
import { useTheme } from "../../Teheme";

const CourseOutline = ({ courseId }) => {
  const [courseOutline, setCourseOutline] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const navigate = useNavigate();

  const { theme } = useTheme();
  // console.log("courseId", courseId);

  const fetchCourseOutlines = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://web-production-ddef.up.railway.app/api/course-outlines/`
      );

      // Convert courseId to a number (assuming courseId from URL is a string)
      const filteredOutlines = response.data.filter(
        (outline) => outline.course === Number(courseId)
      );

      setCourseOutline(filteredOutlines);
      console.log(filteredOutlines);
    } catch (error) {
      console.error("Error fetching course outlines:", error);
    }
    const toggleContent = (id) => {
      setIsExpanded((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseOutlines();
    }
  }, [courseId]);
  const navigateToVideos = (outlineId) => {
    navigate(`/videos/${courseId}/${outlineId}`);
  };
  return (
    <div className="course-outline">
      <h1 className="main-heading">Dominate.</h1>
      <h2 className="subTitle">From Start to Victory.</h2>

      {courseOutline.length > 0 ? (
        courseOutline.map((outline) => (
          <div key={outline.id} className={`dropdown-container ${theme}`}>
            <h2
              className={`dropdown-heading ${theme}`}
              onClick={() => navigateToVideos(outline.id)} // Use outline_id for navigation
              style={{ cursor: "pointer" }}>
              {outline.outline_heading}
            </h2>
            <button
              className={`dropdown-toggle ${theme}`}
              onClick={() => toggleContent(outline.id)}>
              {isExpanded[outline.id] ? "Collapse" : "Expand"}
            </button>
            <div
              className={`dropdown-content ${theme} ${
                isExpanded[outline.id] ? "expanded" : ""
              } `}>
              <p className={`dropdown-title ${theme}`}>
                {outline.outline_desc}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No outlines available for this course.</p>
      )}
    </div>
  );
};

export default CourseOutline;
