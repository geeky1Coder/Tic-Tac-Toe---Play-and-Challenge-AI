export function CheckWinState(board) {
    // Check rows for a winner
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== -1 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0]; // Winner found in a row
      }
    }
  
    // Check columns for a winner
    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== -1 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i]; // Winner found in a column
      }
    }
  
    // Check diagonals for a winner
    if (board[0][0] !== -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0]; // Winner found in the main diagonal
    }
    if (board[0][2] !== -1 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2]; // Winner found in the anti-diagonal
    }
  
    // Check for an ongoing game or a draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === -1) {
          return 'Ongoing'; // Game is still ongoing
        }
      }
    }
  
    return 'Draw'; // No winner and no empty spaces
}