import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const selectedLanguage = localStorage.getItem('language');
  const Language = selectedLanguage[0].toUpperCase() + selectedLanguage.substring(1);
  const [topUsers, setTopUsers] = useState([]); // Store top 10 users for the selected language

  useEffect(() => {
    // Fetch the user data from the server 
    axios.get('https://lingo-lab.vercel.app/api/leaderboard')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  useEffect(() => {
    // Filter and rank top 10 users based on the selected language score
    const sortedUsers = [...users].sort((a, b) => b.score[selectedLanguage] - a.score[selectedLanguage]);
    const top10 = sortedUsers.slice(0, 10);
    setTopUsers(top10);
  }, [selectedLanguage, users]);

  return (
    <div>
    <div className="leaderboard">
      <div>
        <h2>Leaderboard ({Language})</h2>
      </div>
      {topUsers.map((user, index) => (
        <div key={user.name} className={`rank-${index + 1} leaderboard-list`}>
          <h3>{index + 1}</h3>
          <h3>{user.name}</h3>
          <h3>{user.score[selectedLanguage]}</h3>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Leaderboard;



