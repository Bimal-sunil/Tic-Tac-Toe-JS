const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xWon = 0;
let oWon = 0;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("gameBoard");
const modal = document.getElementById("modal");
const gameResult = document.getElementById("gameResult");
const resetButton = document.getElementById("resetBtn");
const restartButton = document.getElementById("restartBtn");
const userScore = document.getElementById("userScore");
const opponentScore = document.getElementById("opponentScore");
let oTurn;
startGame();

function startGame() {
  oTurn = false;
  modal.classList.remove("show");
  gameResult.classList.remove(X_CLASS);
  gameResult.classList.remove(O_CLASS);
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  board.classList.add(X_CLASS);
}

function resetGame() {
  xWon = 0;
  oWon = 0;
  userScore.innerText = xWon;
  opponentScore.innerText = oWon;
  startGame();
}

resetButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  markIcon(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    switchTurn();
    switchBoardHoverClass();
  }
  // Mark the icon
  // Check for x-icon
  // Check for o-icon
  // Switch turns
}

function markIcon(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  oTurn = !oTurn;
}

function switchBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((index) =>
      cellElements[index].classList.contains(currentClass)
    )
  );
}

function checkDraw() {
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

function endGame(draw) {
  modal.classList.add("show");
  if (draw) {
    gameResult.innerText = "Draw!";
  } else {
    if (oTurn) {
      gameResult.classList.add(O_CLASS);
      gameResult.innerText = "You lose the game!";
      oWon++;
      opponentScore.innerText = oWon;
    } else {
      gameResult.classList.add(X_CLASS);
      gameResult.innerText = "You won the game!";
      xWon++;
      userScore.innerText = xWon;
    }
  }
}
