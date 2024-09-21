import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/codersnippets.png";
import { useTheme } from "../../Teheme";

const Navbar = () => {
  let routes = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/about",
      name: "About Us",
    },
    {
      route: "/courses",
      name: "courses",
    },
    {
      route: "/login",
      name: "login",
    },
    {
      route: "/register",
      name: "resgiter",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`navbar-container sticky`}>
        <div className="navbar-logo">
          <img className="logo" src={logo} alt="Logo" />
          <Link className={` ${theme}`} to="/">
            Coderz Snippets
          </Link>
        </div>
        <div className="right">
          <button className={`theme-btn ${theme}`} onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          <span className={`openbtn-right ${theme}`} onClick={toggleNav}>
            &#9776;
          </span>
        </div>
      </div>

      <div
        className={`navbar-right ${theme} ${isOpen ? "open" : ""}`}
        id="navbarRight">
        <Link to="/" className={`${theme} closebtn-right`} onClick={toggleNav}>
          &#10006;
        </Link>

        {routes.map((e) => (
          <Link className={`${theme} `} to={e.route} onClick={toggleNav}>
            {e.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
