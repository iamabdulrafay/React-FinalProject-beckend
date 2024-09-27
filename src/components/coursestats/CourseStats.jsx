import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CourseStats.css";

const CourseStats = ({ courseId }) => {
  // const { id: courseId } = useParams(); // Extract courseId from URL parameters
  const [courseDets, setCourseDets] = useState(null);
  const fetchCourseDets = useCallback(async () => {
    if (courseId) {
      // Ensure courseId is valid
      try {
        const response = await axios.get(
          "https://web-production-ddef.up.railway.app/api/course-related-content/"
        );
        const filteredStats = response.data.filter(
          (stats) => stats.course === Number(courseId)
        );
        setCourseDets(filteredStats); // Assuming response data is an array
        console.log(filteredStats);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    } else {
      console.error("Course ID is not provided");
    }
  });
  useEffect(() => {
    fetchCourseDets();
  }, [courseId]);

  if (!courseDets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="coursestats">
      {courseDets.map((e) => (
        <div key={e.id} className="course-item">
          <img
            src={e.course_related_image}
            alt={e.course_short_title}
            className="poster-theme"
          />
          <h1 className="sub-heading">{e.course_short_title}</h1>
          <h2 className="image-text">{e.course_level}</h2>
        </div>
      ))}
    </div>
  );
};

export default CourseStats;
