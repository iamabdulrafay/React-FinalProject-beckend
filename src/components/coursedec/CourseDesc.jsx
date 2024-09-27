import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CourseDesc.css";

import ButtonCustom from "../button/ButtonCustom";

const CourseDesc = () => {
  const { id } = useParams(); // Get id from route params
  const [course, setCourse] = useState(null);
  const fetchCourseDets = useCallback(async () => {
    if (id) {
      // Ensure courseId is valid
      try {
        const response = await axios.get(
          `https://web-production-ddef.up.railway.app/api/courses/${id}/`
        );
        setCourse(response.data); // Assuming response data is an object
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    } else {
      console.error("Course ID is not provided");
    }
  }, [id]);
  useEffect(() => {
    fetchCourseDets();

    return () => {
      fetchCourseDets();
    };
  }, [id, course]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="classes">
      <div className="flex">
        <div className="left">
          <h1>{course.course_heading}</h1>
          <div className="tags-div">
            {course.course_tags.split(",").map((tag, index) => (
              <span key={index} className="tags">
                {tag.trim()}
              </span>
            ))}
          </div>
          <p className="price">
            <strong>
              Only <span>${course.course_price}</span>
            </strong>
          </p>
          <ButtonCustom
            width="70%"
            color="#009560"
            height="8vh"
            text="Buy Now"
          />
          <p className="ques">{course.course_description}</p>
        </div>
        <div className="right">
          <img src={course.course_thumbnail} alt={course.title} />
        </div>
      </div>
    </div>
  );
};

export default CourseDesc;
