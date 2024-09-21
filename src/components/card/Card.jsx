import React, { useEffect, useState } from "react";
import "./Card.css";
import logo from "../../assets/bg.jpg";
// import Button from '../button/Button'
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonCustom from "../button/ButtonCustom";
import { useTheme } from "../../Teheme";

const Card = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://web-production-ddef.up.railway.app/api/courses/"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {data.map((e) => (
        <div className="card-main">
          <div className={`card ${theme}`}>
            <div className="top">
              <img src={e.course_thumbnail} alt={e.title} />
            </div>
            <div className="bottom">
              <h1>{e.course_heading}</h1>
              <p className="desc">{e.course_description}</p>

              {e.course_tags.split(",").map((tag, index) => (
                <button key={index} className={`btn  ${theme}`}>
                  {tag.trim()} {/* Trim to remove extra spaces */}
                </button>
              ))}
              {/* <button className='btn'>Logic Building</button>
<button className='btn'>Designing </button> */}
              <div className={`instructor  ${theme}`}>
                <div className="left">
                  <p>
                    by <span>{e.course_instructor}</span>{" "}
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
      ))}
    </div>
  );
};

export default Card;
