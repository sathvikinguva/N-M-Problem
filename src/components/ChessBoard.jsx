import React from 'react';
import './ChessBoard.css';

export default function ChessBoard({ n, m, updateQueenPosition }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("text");
    const row = Math.floor(event.target.dataset.index / m);
    const col = event.target.dataset.index % m;
    const queenElement = document.getElementById(`queen-${index}`);

    if (event.target && event.target.classList.contains('square')) {
      event.target.appendChild(queenElement);
      updateQueenPosition(index, row, col);

      const squareColor = event.target.classList.contains('white') ? 'black' : 'white';
      queenElement.querySelector('.queen').style.color = squareColor;
    }
  };

  const getSquareClass = (index) => {
    const row = Math.floor(index / m);
    const col = index % m;
    return (row + col) % 2 === 0 ? 'white' : 'black';
  };

  return (
    <div className="chessboard" style={{ gridTemplateColumns: `repeat(${m}, 1fr)` }}>
      {Array.from({ length: n * m }).map((_, index) => (
        <div
          key={index}
          data-index={index}
          className={`square ${getSquareClass(index)}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
