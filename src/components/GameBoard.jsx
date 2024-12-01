// src/components/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/SnakeGame.css';

const GRID_SIZE = 20;
const DIRECTIONS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };

const GameBoard = ({ score, setScore, gameOver, setGameOver }) => {
  const [snake, setSnake] = useState([[8, 8]]);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [food, setFood] = useState([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);

  useEffect(() => {
    if (gameOver) return;

    const handleKeyPress = (e) => {
      if (DIRECTIONS[e.key]) setDirection(DIRECTIONS[e.key]);
    };
    window.addEventListener('keydown', handleKeyPress);

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const [x, y] = newSnake[0];
        const [dx, dy] = direction;
        const newHead = [x + dx, y + dy];

        if (
          newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
          newSnake.some((part) => part[0] === newHead[0] && part[1] === newHead[1])
        ) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(newHead);
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((prevScore) => prevScore + 10);
          setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [direction, food, gameOver]);

  return (
    <div className="game-board">
      {Array(GRID_SIZE).fill().map((_, y) =>
        Array(GRID_SIZE).fill().map((_, x) => (
          <div
            key={`${x}-${y}`}
            className={`cell ${snake.some(([sx, sy]) => sx === x && sy === y) ? 'snake' : ''} ${food[0] === x && food[1] === y ? 'food' : ''}`}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
