function isSafe(board, row, col, N, M) {
  // Check this column on the upper side
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') {
      return false;
    }
  }

  // Check upper left diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') {
      return false;
    }
  }

  // Check upper right diagonal
  for (let i = row, j = col; i >= 0 && j < M; i--, j++) {
    if (board[i][j] === 'Q') {
      return false;
    }
  }

  return true;
}

function solveNQueensUtil(board, row, N, M, result) {
  // If all queens are placed
  if (row === N) {
    const solution = board.map(row => row.slice());
    result.push(solution);
    return true;
  }

  let res = false;
  for (let i = 0; i < M; i++) {
    if (isSafe(board, row, i, N, M)) {
      board[row][i] = 'Q';
      res = solveNQueensUtil(board, row + 1, N, M, result) || res;
      board[row][i] = 'X'; // backtrack
    }
  }

  return res;
}

function solveNQueens(N, M) {
  const board = Array.from({ length: N }, () => Array(M).fill('X'));
  const result = [];
  solveNQueensUtil(board, 0, N, M, result);
  return result;
}

export { isSafe, solveNQueens };
