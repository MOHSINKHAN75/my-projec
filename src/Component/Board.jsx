import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);

  useEffect(() => {
    if (!isXNext && !isGameOver) {
      const timeoutId = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isGameOver, isXNext]);

  const handleClick = (i) => {
    if (isGameOver || squares[i] || (!isXNext && !isGameOver)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = "X";
    setSquares(newSquares);
    setIsXNext(false);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setIsGameOver(false);
  };
  const makeComputerMove = () => {
    const emptySquares = squares
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);
    const randomMove =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    if (randomMove !== undefined) {
      const newSquares = squares.slice();
      newSquares[randomMove] = "O";
      setSquares(newSquares);
      setIsXNext(true);
    }
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  const draw = calculateDraw(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    if (!isGameOver) {
      setIsGameOver(true);
      if (winner === "X") {
        setPlayerWins(playerWins + 1);
      } else if (winner === "O") {
        setComputerWins(computerWins + 1);
      }
    }
  } else if (draw) {
    status = "Draw!";
    if (!isGameOver) setIsGameOver(true);
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }
  return (
    <div className="w-full flex flex-col items-center">
      <p className="flex justify-between w-full">
        <span className="text-xl text-violet-500">X Player:</span>{" "}
        <span className="px-5 py-2 rounded-md border">{playerWins}</span>
      </p>

      <div className="text-xl font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="py-5">
        <button
          onClick={handleRestart}
          className="px-5 py-2 rounded-md bg-violet-500 text-white"
        >
          Restart Game
        </button>
      </div>
      <p className="flex justify-between w-full">
        <span className="text-xl text-red-500">O Player:</span>{" "}
        <span className="px-5 py-2 rounded-md border">{computerWins}</span>
      </p>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
};

const calculateDraw = (squares) => {
  return (
    squares.every((square) => square !== null) && !calculateWinner(squares)
  );
};

export default Board;
