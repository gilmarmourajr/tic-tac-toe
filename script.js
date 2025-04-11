const gameboard = (function () {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = ["", "", ""];
  }

  const getBoard = () => board;

  const mark = function (player, row, column) {
    board[row][column] = player.symbol;
  };

  const checkWin = function () {
    //check if there are equal diagonals
    if (
      ((board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
        (board[2][0] === board[1][1] && board[2][0] === board[0][2])) &&
      board[1][1] != null
    ) {
      return board[1][1];
    }

    for (let i = 0; i < 3; i++) {
      //check if there are equal rows
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] != null
      ) {
        return board[i][0];
      }

      //check if there are equal columns
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] != null
      ) {
        return board[0][i];
      }
    }

    if (checkFullBoard()) return "tie";

    //if theres no winner nor tie, return false
    return false;
  };

  const checkFullBoard = function () {
    let isFull = true;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == undefined) {
          isFull = false;
        }
      }
    }

    return isFull;
  };

  return { getBoard, mark, checkWin };
})();

function createPlayer(name, symbol) {
    return { name, symbol };
  }

const player1 = createPlayer("Gil", "X");
const player2 = createPlayer("Julia", "O");

const game = (function () {
  let currentPlayer = player1;
  let gameFinished = false;

  const playRound = function(row, column) {
    if(gameFinished) {
        return;
    }

    gameboard.mark(currentPlayer, row, column);

    let winnerStatus = gameboard.checkWin();
    if(winnerStatus) {
        gameFinished = true;

        if(winnerStatus === "tie") {
            console.log("Game over! Tie.");
        } else {
            console.log(`Game over! ${currentPlayer.name} wins!`)
        }

        return;
    }
    console.log(gameboard.getBoard());
    switchPlayerTurn();
  }

  const switchPlayerTurn = function() {
    if(currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
  }
  return {playRound};
})();