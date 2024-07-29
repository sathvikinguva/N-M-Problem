import React, { useState, useEffect } from 'react';
import Queen from "./components/Queen";
import ChessBoard from "./components/ChessBoard";
import './App.css';
import { solveNQueens } from './NQueenSolver';

function App() {
  const [n, setN] = useState(3);
  const [m, setM] = useState(5);
  const [queens, setQueens] = useState([]);
  const [result, setResult] = useState("");
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    setQueens(Array.from({ length: n }, () => null));
    setSolutions([]);
    setResult("");
  }, [n, m]);

  const updateQueenPosition = (index, row, col) => {
    const newQueens = [...queens];
    newQueens[index] = { row, col };
    setQueens(newQueens);

    checkNQueens(newQueens);
  };

  const checkNQueens = (queens) => {
    const board = Array.from({ length: n }, () => Array(m).fill('X'));
    queens.forEach(q => {
      if (q !== null) {
        board[q.row][q.col] = 'Q';
      }
    });

    const isValidSolution = solutions.some(solution => {
      return solution.every((solRow, rowIndex) => {
        return solRow.every((cell, colIndex) => {
          return cell === 'Q' ? board[rowIndex][colIndex] === 'Q' : board[rowIndex][colIndex] !== 'Q';
        });
      });
    });

    if (isValidSolution) {
      setResult("N-Queens Algorithm Satisfied");
    } else {
      setResult("N-Queens Algorithm Not Satisfied");
    }
  };

  const handleSolve = () => {
    const solutions = solveNQueens(n, m);
    setSolutions(solutions);
    setResult(`Number of solutions: ${solutions.length}`);
  };

  const handleInputChange = (setter) => (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 10) {
      alert("The maximum value for rows and columns is 10.");
    } else {
      setter(value);
    }
  };

  return (
    <div className="App">
      <h1>N-Queens Problem</h1>
      <div className="input-container">
        <label>
          Rows (N):
          <input type="number" value={n} onChange={handleInputChange(setN)} />
        </label>
        <label>
          Columns (M):
          <input type="number" value={m} onChange={handleInputChange(setM)} />
        </label>
        <button onClick={handleSolve}>Solve</button>
      </div>
      <div className="container">
        <div className="queens">
          {Array.from({ length: n }).map((_, index) => (
            <Queen key={index} id={`queen-${index}`} index={index} />
          ))}
        </div>
        <ChessBoard n={n} m={m} updateQueenPosition={updateQueenPosition} />
      </div>
      <h2>{result}</h2>
    </div>
  );
}

export default App;
