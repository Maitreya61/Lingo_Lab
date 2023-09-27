import React, { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";

const HomePage = () => {

  const language = localStorage.getItem('language');
  const Language = language[0].toUpperCase() + language.substring(1);
  const [userData, setUserData] = useState({score:{}});

  useEffect(() => {
    const userID = localStorage.getItem('id');
    axios.get(`http://localhost:3001/api/users/${userID}`)
      .then((response) => {
        setUserData(response.data);
      });
  }, []);

  

  const navigate = useNavigate();
  const [resetOpen, setResetIsOpen] = useState(false);
  const [logoutOpen, setLogOutOpen] = useState(false);
  const logout = ()=>{
    localStorage.removeItem('id');
    localStorage.removeItem('language');
    navigate('/');
  }

  

  return (
    <div>
      <div className="homepage-navbar">
        <div>
          <h1>LingoLab</h1>
        </div>
        <div>
          <button onClick={() => setLogOutOpen(true)}>
            <img className="image" src="images/user1.png" alt="avatar" />
          </button>
        </div>
      </div>
      <div className="homepage">
        <div>
          <Modal isOpen={resetOpen}>
            <div className="center" style={{ width: "100%", height: "100%" }}>
              <div>
                <h1>"Are you sure you want to reset your progress? 🔄"</h1>
                <div className="center-row">
                  <button
                    className="std-btn"
                    style={{ backgroundColor: "green" }}
                  >
                    Yes! I am Sure
                  </button>
                  <button
                    className="std-btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => setResetIsOpen(false)}
                  >
                    No! Take Me Back
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <Modal isOpen={logoutOpen}>
            <div className="center" style={{ width: "100%", height: "100%" }}>
              <div>
                <h1>"Are you sure you want to log out? 🚪"</h1>
                <div className="center-row">
                  <button
                    className="std-btn"
                    style={{ backgroundColor: "green" }}
                    onClick={()=>logout()}
                  >
                    Yes! I am Sure
                  </button>
                  <button
                    className="std-btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => setLogOutOpen(false)}
                  >
                    No! Take Me Back
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="center">
          <div className="progress">
            <div className="progress-title">
              <span>
                <h2>{userData.name} - Progress</h2>
              </span>
            </div>
            <div className="progress-bar">
              <ProgressBar
                completed={20}
                bgColor="orange"
                animateOnRender={true}
              />
            </div>
            <div className="score-lang">
              <div className="score-lang-ele">
                <h3>Score</h3>
                <h1>{userData.score[language]}</h1>
              </div>
              <div className="score-lang-ele">
                <h3>Language</h3>
                <img src={`images/${language}.png`} alt="italy" />
                <h4>{Language}</h4>
              </div>
            </div>
            <div>
              <button onClick={() => navigate("/quiz")}>
                Continue Learning
              </button>
            </div>
          </div>
          <div className="center-row">
            <div>
              <button className="std-btn" onClick={() => navigate("/language")}>
                Change Language
              </button>
            </div>
            <div>
              <button className="std-btn" onClick={() => setResetIsOpen(true)}>
                Reset Progress
              </button>
            </div>
          </div>
        </div>
        <div><Leaderboard/></div>
      </div>
    </div>
  );
};

export default HomePage;
