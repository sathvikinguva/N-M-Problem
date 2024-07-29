import React from 'react';
import './Queen.css';

export default function Queen({ id, index }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", index);
  };

  return (
    <div
      id={id}
      className="queen-container"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <span className="queen">♛</span>
    </div>
  );
}
