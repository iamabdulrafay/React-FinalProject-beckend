import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link, useNavigate } from "react-router-dom"; // For navigation after login
import { Alert } from "react-bootstrap"; // Import Alert from React Bootstrap
// Adjust the path as needed
import "./LoginForm.css";
import ButtonCustom from "../button/ButtonCustom";
import { useTheme } from "../../Teheme";

const LoginForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); // To store error messages
  const [alert, setAlert] = useState(false); // For showing alert
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://web-production-ddef.up.railway.app/api/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { CSRFToken } = response.data;

      // Store CSRFToken in localStorage
      localStorage.setItem("access_CSRFToken", CSRFToken);

      console.log("Login successful:", response.data);
      navigate("/"); // Redirect to another page after login
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "An error occurred");
      setAlert(true); // Show alert on error
    }
  };

  return (
    <div className="main-form">
      <div className="r_form">
        <div className={`form ${theme}`}>
          <h1>Login Here.</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Show alert if there is an error */}
            {alert && (
              <Alert
                variant="danger"
                onClose={() => setAlert(false)}
                dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
              </Alert>
            )}
            <span className="asking">Donot have an account?</span>
            <Link className="asking" to="/register">
              Signup
            </Link>
            <br />
            <ButtonCustom
              width="100%"
              height="6vh"
              text="Confirm"
              type="submit"
              // color="blue"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
