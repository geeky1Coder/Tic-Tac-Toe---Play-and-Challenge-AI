import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board';

function App() {
  const [gameBoard, setGameBoard] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]); // Game board as a state

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Congratulations!");
  const [popupMessage, setPopupMessage] = useState("You've done it!");
  const [numPoppers, setNumPoppers] = useState(10);
  const [gameState, setGameState] = React.useState(0);
  const [turn, setTurn] = React.useState(0); // 0 for 'X', 1 for 'O'

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRestart = () => {
    setGameBoard([
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ]); // Reset the board to initial state

    setGameState(0);
    setTurn(0);
  };

  return (
    <div className="App">
      <div className="header">
        <div className='name_of_game'>TIC TAC TOE</div>
        <div
          className={`turn_message ${turn === 0 ? 'x-turn' : 'o-turn'}`}
        >
          {turn === 0 ? 'X Playing' : 'O Playing (AI)'}
        </div>
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
      <div className="board_style">
        {/* Pass gameBoard and setGameBoard as props */}
        <Board gameBoard={gameBoard} setGameBoard={setGameBoard} show={showPopup}
          handleClosePopup={handleClosePopup}
          title={popupTitle}
          message={popupMessage}
          poppers={numPoppers}
          gameState={gameState}
          setGameState={setGameState}
          setShowPopup={setShowPopup}
          setPopupMessage={setPopupMessage}
          turn={turn}
          setTurn={setTurn}
        />
      </div>
    </div>
  );
}

export default App;
