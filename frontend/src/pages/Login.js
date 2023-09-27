import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const language = localStorage.getItem('language')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      if (response.data.message === "Auth") {
        localStorage.setItem("id", response.data.id);
        if (!language || language==null) {
          navigate("/language");
        } else {
          navigate("/homepage");
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="title-mascot">
        <div>
          <h1 className="title">LingoLab</h1>
          <h3 className="caption">"Your Journey to Fluency Begins Here"</h3>
        </div>
        <div>
          <img className="mascot" src="image1.png" alt="mascot" />
        </div>
      </div>
      <div className="register-form-box">
        <form className="register-form" onSubmit={handleSubmit}>
          <span className="register-title">Login</span>
          <span className="register-subtitle">Login and Explore!</span>
          <div className="register-form-container">
            <input
              type="email"
              className="register-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="register-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        <div className="register-form-section">
          <p>
            New User?{" "}
            <span onClick={() => navigate("/register")}>Register</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
