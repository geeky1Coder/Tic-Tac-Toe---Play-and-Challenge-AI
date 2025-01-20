import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import './CheckWinState.js';
import { CheckWinState } from './CheckWinState.js';
import PartyPopper from './PartyPopper/PartyPopper.js';
import { getBestMove } from './ComputerLogic.js';

const Board = ({ gameBoard, setGameBoard, turn, setTurn, show, onClose, title, setPopupMessage, message, poppers, handleClosePopup, gameState, setGameState, setShowPopup }) => {
  const [gridSize, setGridSize] = useState(100); // Initial grid size
  const [boardSize, setBoardSize] = useState(300); // Initial board size

  // Dynamically calculate grid and board size
  useEffect(() => {
    const calculateSizes = () => {
      const maxWidth = Math.min(window.innerWidth, window.innerHeight) * 0.8; // Board fits 80% of smaller dimension
      const newBoardSize = Math.floor(maxWidth / 3) * 3; // Ensure divisible by 3
      const newGridSize = newBoardSize / 3;
      setBoardSize(newBoardSize);
      setGridSize(newGridSize);
    };

    calculateSizes(); // Calculate on component mount
    window.addEventListener('resize', calculateSizes); // Recalculate on window resize
    return () => window.removeEventListener('resize', calculateSizes); // Cleanup listener
  }, []);

  const getFillColor = (row, col) => {
    if (gameBoard[row][col] === -1) {
      return 'white';
    } else if (gameBoard[row][col] === 0) {
      return 'lightblue';
    } else {
      return 'red';
    }
  };

  const handleClick = (row, col) => {
    if (gameBoard[row][col] === -1 && gameState === 0) {
      // Create a deep copy of the gameBoard
      const updatedBoard = gameBoard.map(row => [...row]);
      // Update the clicked cell with the current player's turn
      updatedBoard[row][col] = turn === 0 ? 0 : 1;
      setGameBoard(updatedBoard); // Update the gameBoard state

      const tempTurn = turn === 0 ? 1 : 0; // Predict the next turn
      setTurn(tempTurn); // Toggle the turn

      // Check the win state after the player's move
      const winState = CheckWinState(updatedBoard);

      if (winState === 'Ongoing') {
        console.log("Player move:", turn, updatedBoard);

        // If it's the AI's turn, calculate the best move with a delay
        if (tempTurn === 1) {
          setTimeout(() => {
            const predictedMove = getBestMove(updatedBoard); // AI calculates the best move
            if (predictedMove) {
              const aiUpdatedBoard = updatedBoard.map(row => [...row]); // Deep copy for AI move
              aiUpdatedBoard[predictedMove[0]][predictedMove[1]] = 1; // AI plays its move
              setGameBoard(aiUpdatedBoard); // Update the state after AI move
              setTurn(0); // Switch back to player's turn

              // Re-check the win state after the AI move
              const aiWinState = CheckWinState(aiUpdatedBoard);
              if (aiWinState === 'Draw') {
                // Game ends in a draw
                setPopupMessage("Game Drawn");
                setShowPopup(true);
              } else if (aiWinState === 1) {
                // AI wins
                setGameState(1);
                setPopupMessage("O Won the game");
                setShowPopup(true);
              }
            }
          }, 300); // Delay of 300ms for AI move
        }
      } else if (winState === 'Draw') {
        // Game ends in a draw
        setPopupMessage("Game Drawn");
        setShowPopup(true);
      } else {
        // Player wins
        setGameState(1);
        setShowPopup(true);
        if (turn === 0) {
          setPopupMessage("X Won the game");
        } else {
          setPopupMessage("O Won the game");
        }
      }
    }
  };

  const renderShape = (row, col) => {
    if (gameBoard[row][col] !== -1) {
      const isX = gameBoard[row][col];
      return isX === 0 ? (
        <>
          <Line
            points={[col * gridSize + gridSize * 0.2, row * gridSize + gridSize * 0.2, col * gridSize + gridSize * 0.8, row * gridSize + gridSize * 0.8]}
            stroke="red"
            strokeWidth={4}
          />
          <Line
            points={[col * gridSize + gridSize * 0.8, row * gridSize + gridSize * 0.2, col * gridSize + gridSize * 0.2, row * gridSize + gridSize * 0.8]}
            stroke="red"
            strokeWidth={4}
          />
        </>
      ) : (
        <Circle
          x={col * gridSize + gridSize / 2}
          y={row * gridSize + gridSize / 2}
          radius={gridSize / 3}
          stroke="blue"
          strokeWidth={4}
        />
      );
    }
    return null;
  };

  const cells = [];
  for (let row = 0; row < boardSize / gridSize; row++) {
    for (let col = 0; col < boardSize / gridSize; col++) {
      cells.push(
        <React.Fragment key={`cell-${row}-${col}`}>
          <Rect
            x={col * gridSize}
            y={row * gridSize}
            width={gridSize}
            height={gridSize}
            fill={getFillColor(row, col)} // Highlight clicked cell
            stroke="black"
            strokeWidth={1}
            onTap={() => handleClick(row, col)}  // Mobile-compatible
            onClick={() => handleClick(row, col)} // Desktop-compatible
          />
          {renderShape(row, col)}
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <PartyPopper show={show}
        onClose={handleClosePopup}
        title={title}
        message={message}
        poppers={poppers}></PartyPopper>
        
      <Stage width={boardSize} height={boardSize}>
        <Layer hitGraphEnabled={true}>{cells}</Layer>
      </Stage>
    </React.Fragment>
  );
};

export default Board;
