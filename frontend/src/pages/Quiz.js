import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import questions from "../constants/englishQuestions";
import axios from 'axios';

function Quiz() {

  const [userData, setUserData] = useState({score:{},solvedQuestions:[]});
  const navigate = useNavigate();
  const userID = localStorage.getItem('id');
  const quizData = questions;
  const language = localStorage.getItem('language');
  const Language = language[0].toUpperCase() + language.substring(1);
  const langquiz = quizData.filter((ques)=>ques.language === language);
  const [filteredQuiz, setFilteredQuiz] = useState([]);//Filtered Questions without the completed ones
  const [currentQuestion, setCurrentQuestion] = useState(0);//Keep tracking of the current question
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);//To show the result screen
  const [started, setStarted] = useState(false);//To show the start screen
  const [compQues, setCompQues] = useState('');//To track completed questions
  
  //To get the completed questions by the user
  useEffect(() => {
    const userID = localStorage.getItem('id');
    axios.get(`https://lingo-lab.vercel.app/api/users/${userID}`)
      .then((response) => {
        setUserData(response.data);
        const filteredQuiz = langquiz.filter((ques) => !userData.solvedQuestions.includes(ques.id));
        setFilteredQuiz(filteredQuiz);
      });
  }, [langquiz,userData.solvedQuestions ]);

  //For Updating the score after completing the quiz and also update the completed questions list
  const handleScoreUpdate = () => {
    axios
      .put(`https://lingo-lab.vercel.app/api/update/${userID}/scores/${language}`, { scoreIncrement: score, solved:compQues })
      .then((response) => {
        console.log(`Score updated successfully`);
      })
      .catch((error) => {
        console.error('Error updating score:', error);
      });
  };
  

  const quizEnd = async () => {
    try {
      await handleScoreUpdate(); // Wait for the score update to complete
      navigate('/homepage'); // Navigate to the new route after the update
    } catch (error) {
      console.error('Error during quiz end:', error);
    }
  };

  const handleOptionClick = (selectedOption, quesID, difficulty) => {
    // Check if the selected option is correct
    const isCorrect =
      selectedOption === filteredQuiz[currentQuestion].correctAnswer;

    // Update user answer
    setUserAnswer(selectedOption);

    // Delay showing the result for 1 second
    setTimeout(() => {
      // If the answer is correct, update the score
      if (isCorrect) {
        setScore(score + difficulty);
        setCompQues([...compQues, quesID]);
      }

      // Move to the next question or show the final result
      if (currentQuestion < filteredQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer(null);
      } else {
        // Quiz is finished
        setShowResult(true);
      }
    }, 1000);
  };



  return (
    <div className="quiz-container">
      <div className="quiz">
        <h1>{Language}</h1>
        {/* Checkign whether there are any questions left to be solved and then checking what screen to show next */}
        {filteredQuiz.length !== 0 ?  started ? (
          showResult ? (
            <div className="result">
              <h2>Well Done!</h2>
              <p>
                Your Score: {score}
              </p>
              <button onClick={()=>quizEnd()}>Home</button>
            </div>
          ) : (
            <div className="ques-container">
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <div className="ques-no">
                <p>
                  Question {currentQuestion + 1} of {filteredQuiz.length}
                </p>
                <p>Score: {score}</p>
              </div>
              <div>
                <button className="quit" onClick={()=>setShowResult(true)}>Quit</button>
              </div>
              </div>
              <div className="question">
                <h2>{filteredQuiz[currentQuestion].question}</h2>
              </div>
              <ul>
                {filteredQuiz[currentQuestion].options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option,filteredQuiz[currentQuestion].id,filteredQuiz[currentQuestion].dif)}
                    className={`option ${
                      userAnswer === option
                        ? option === filteredQuiz[currentQuestion].correctAnswer
                          ? "correct"
                          : "wrong"
                        : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <div className="instructions">
            <h2>Instructions</h2>
            <ul>
              <li>Choose the Correct Option</li>
              <li>
                Scoring:{" "}
                <ul>
                  <li>Easy: 1 Point </li>
                  <li>Medium: 3 Points</li>
                  <li>Difficult: 5 Points</li>
                </ul>
              </li>
              <li>Click "Quit" to exit</li>
              <li>Quick answers are key; there's a time limit.</li>
              <li>Enjoy the challenge!</li>
            </ul>
            <button className="quiz-start" onClick={()=>setStarted(true)}>Continue</button>
          </div>
        ) : <div className="center"> <h1>Congratulations! You Have Completed all the Questions</h1>
        <button className="std-btn" onClick={()=>navigate('/homepage')}>Home</button> </div>}
      </div>
    </div>
  );
}

export default Quiz;
