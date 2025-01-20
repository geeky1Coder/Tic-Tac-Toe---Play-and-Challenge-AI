//Minimax Algorithm
import { CheckWinState } from './CheckWinState.js';


function evaluateBoard(board, depth) {
    // Assign a score to the board based on the game state
    let gameState = CheckWinState(board);
  
    if (gameState === 0) {
      return 10 - depth; // Maximizer wins, earlier wins are better
    } else if (gameState === 1) {
      return depth - 10; // Minimizer wins, earlier losses are worse
    } else if (gameState === 'Draw') {
      return 0; // Draw
    } else if (gameState === 'Ongoing') {
      // If the game is ongoing, return a neutral score
      return 0;
    }
  }
  
  function minimax(board, depth, isMaximizingPlayer) {
    let gameState = CheckWinState(board);
  
    if (gameState !== "Ongoing") {
      return evaluateBoard(board, depth); // Use depth in evaluation
    }
  
    let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === -1) {
          let player = isMaximizingPlayer ? 0 : 1;
          board[i][j] = player; // Simulate move
          let score = minimax(board, depth + 1, !isMaximizingPlayer);
          board[i][j] = -1; // Undo the move
  
          if (isMaximizingPlayer) {
            bestScore = Math.max(score, bestScore);
          } else {
            bestScore = Math.min(score, bestScore);
          }
        }
      }
    }
  
    return bestScore;
}

function complementBoard(board) {
    // Iterate over each row in the board
    for (let i = 0; i < board.length; i++) {
        // Iterate over each element in the row
        for (let j = 0; j < board[i].length; j++) {
            // Check if the element is 0 or 1
            if (board[i][j] === 0) {
                // Replace 0 with 1
                board[i][j] = 1;
            } else if (board[i][j] === 1) {
                // Replace 1 with 0
                board[i][j] = 0;
            }
        }
    }
    // Return the updated board
    return board;
}

export function getBestMove(tempBoard){
    let tempBoardCopy = [...tempBoard.map(row => [...row])];
    tempBoardCopy=complementBoard(tempBoardCopy);
    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tempBoardCopy[i][j] === -1) {
                tempBoardCopy[i][j] = 0; // Simulate maximizer's move
                let score = minimax(tempBoardCopy, 0, false);
                tempBoardCopy[i][j] = -1; // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }
    return bestMove;
}