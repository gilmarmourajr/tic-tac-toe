const gameboard = (function () {
  const board = [];
  
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
        if (board[i][j] == "") {
          isFull = false;
        }
      }
    }

    return isFull;
  };

  const resetBoard = function() {
    for (let i = 0; i < 3; i++) {
      board[i] = ["", "", ""];
    }
  }

  return { getBoard, mark, checkWin, resetBoard };
})();

function createPlayer(name, symbol) {
    return { name, symbol };
  }

const player1 = createPlayer("Gil", "X");
const player2 = createPlayer("Julia", "O");

const gameDisplay = (function() {
    const gameDiv = document.getElementById("gameDiv");

    const addArrayToDisplay = function() {
        let board = gameboard.getBoard();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let newDiv = document.createElement("div");
                newDiv.textContent = board[i][j];
                
                if(newDiv.textContent == "") {
                  newDiv.addEventListener("click", markerButton);
                  newDiv.dataset.row = i;
                  newDiv.dataset.column = j;
                }

                gameDiv.appendChild(newDiv);
            }
        }
    }

    const deleteCurrentDisplay = function() {
        while(gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.lastChild);
        }
    }

    const addResults = function(result) {
        document.getElementById("resultText").innerText = result;
    }

    const markerButton = function(event) {
        let row = event.target.dataset.row;
        let column = event.target.dataset.column;
        game.playRound(row, column);
    }
    
    return {addArrayToDisplay, deleteCurrentDisplay, addResults};
})();

const game = (function () {
  let currentPlayer = player1;
  let gameFinished = false;
  let isFirstRound = true;

  const startGame = function() {
    currentPlayer = player1;
    gameFinished = false;
    gameboard.resetBoard();
    gameDisplay.deleteCurrentDisplay();
    gameDisplay.addArrayToDisplay();
    isFirstRound = false;
    gameDisplay.addResults("");
  }

  const playRound = function(row, column) {
    if(isFirstRound) {

    }

    if(gameFinished) {
        return;
    }

    gameboard.mark(currentPlayer, row, column);

    gameDisplay.deleteCurrentDisplay();
    gameDisplay.addArrayToDisplay();

    let winnerStatus = gameboard.checkWin();
    if(winnerStatus) {
        gameFinished = true;

        if(winnerStatus === "tie") {
            gameDisplay.addResults("Game over! Tie.");
        } else {
            gameDisplay.addResults(`Game over! ${currentPlayer.name} wins!`);
        }

        return;
    }

    switchPlayerTurn();
  }

  const switchPlayerTurn = function() {
    if(currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
  }
  return {playRound, startGame};
})();