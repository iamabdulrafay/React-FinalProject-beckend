import React, { useEffect, useState, useCallback, memo } from "react";
import axios from "axios"; // Don't forget to import axios
import { Link } from "react-router-dom"; // Ensure Link is imported
import "./Card.css";
import ButtonCustom from "../button/ButtonCustom";
import { useTheme } from "../../Teheme";

const Card = memo(() => {
  const { theme } = useTheme();
  const [data, setData] = useState([]); // Initialize data state

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token

      const response = await axios.get(
        "https://web-production-ddef.up.railway.app/api/courses/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log("Fetched data:", response.data); // Log the data
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderCards = () => {
    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    return data.map((e) => {
      if (e.course_tags) {
        return (
          <div key={e.id} className="card-main">
            <div className={`card ${theme}`}>
              <div className="top">
                <img src={e.course_thumbnail} alt={e.title} />
              </div>
              <div className="bottom">
                <h1>{e.course_heading}</h1>
                <p className="desc">{e.course_description}</p>
                {e.course_tags.split(",").map((tag, index) => (
                  <button key={index} className={`btn ${theme}`}>
                    {tag.trim()}
                  </button>
                ))}
                <div className={`instructor ${theme}`}>
                  <div className="left">
                    <p>
                      by <span>{e.course_instructor}</span>
                    </p>
                  </div>
                  <div className="right">
                    <p>${e.course_price}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/courses/${e.id}`}>
              <ButtonCustom width="100%" text={"Buy Now"} />
            </Link>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return <div className="card-container">{renderCards()}</div>;
});

export default Card;
