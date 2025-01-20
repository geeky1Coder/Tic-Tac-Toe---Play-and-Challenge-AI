import React, { useState } from "react";
import Confetti from 'react-confetti-boom';
import "./PartyPopper.css"; // Add your CSS styling if needed

const PartyPopper = ({ show, onClose, title, message }) => {
  if (!show) return null; // Don't render if the show prop is false

  return (
    <div className="popup-overlay">
      {/* Confetti Explosion */}
      <Confetti mode="fall" particleCount={67} shapeSize={18} colors={['#3f51b5', '#8bc34a']} fadeOutHeight={1} />
      
      {/* Modal Popup Content */}
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <p className="modal-message">{message}</p>
      </div>
    </div>
  );
};

export default PartyPopper;
