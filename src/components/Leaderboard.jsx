// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import localforage from 'localforage';

const Leaderboard = ({ score }) => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const updateLeaderboard = async () => {
      const scores = (await localforage.getItem('topScores')) || [];
      const newScores = [...scores, score].sort((a, b) => b - a).slice(0, 5);
      await localforage.setItem('topScores', newScores);
      setTopScores(newScores);
    };
    updateLeaderboard();
  }, [score]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {topScores.map((s, index) => (
        <div key={index}>#{index + 1} - {s}</div>
      ))}
    </div>
  );
};

export default Leaderboard;
