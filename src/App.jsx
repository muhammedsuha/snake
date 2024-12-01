// src/App.jsx
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import Leaderboard from './components/Leaderboard';

const App = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="app">
      <h1>Snake Game</h1>
      <ScoreBoard score={score} />
      <GameBoard score={score} setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} />
      {gameOver && <Leaderboard score={score} />}
      {gameOver && (
        <button onClick={() => { setGameOver(false); setScore(0); }}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
