import React from "react";
import { useNavigate} from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/register')
  }

  return (
    <>
      <div className="main-container">
        <div className="left-container">
          <div className="title-container">
            <h1 className="title">LingoLab</h1>
            <h3 className="caption">"Your Journey to Fluency Begins Here"</h3>
          </div>
          <div>
            <h4>Join our global community of language enthusiasts</h4>
            <button onClick={handleClick} className="register-button">Register</button>
          </div>
          <div>
            <h4>Languages we offer</h4>
            <div className="lang-list">
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/english.png" alt="english" />
                </button>
                <h5>English</h5>
              </div>
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/french.png" alt="french" />
                </button>
                <h5>French</h5>
              </div>
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/hindi.png" alt="hindi" />
                </button>
                <h5>Hindi</h5>
              </div>
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/spanish.png" alt="spanish" />
                </button>
                <h5>Spanish</h5>
              </div>
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/italian.png" alt="italian" />
                </button>
                <h5>Italian</h5>
              </div>
              <div>
                <button onClick={handleClick} className="language">
                  <img src="images/portugese.png" alt="portugese" />
                </button>
                <h5>Portugese</h5>
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="right-container">
          <div>
            <img className="mascot" src="image1.png" alt="mascot" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
