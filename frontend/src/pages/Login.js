import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const language = localStorage.getItem('language')
  //These are used for getting and setting the email and password 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://lingo-lab.vercel.app/api/login", {
        email,
        password,
      });
      if (response.data.message === "Auth") {
        localStorage.setItem("id", response.data.id);
        if (!language || language==null) {
          navigate("/language");//If they are new user it takes to select language page first
        } else {
          navigate("/homepage");//If they are existing user it takes directly to homepage
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
      {/* Login and Register Form has same style so reused the same style */}
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
              required={true}
            />
            <input
              type="password"
              className="register-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required={true}
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
