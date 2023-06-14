const X_CLASS: string = "x";
const O_CLASS: string = "o";
const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xWon: number = 0;
let oWon: number = 0;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("gameBoard") as HTMLDivElement | null;
const modal = document.getElementById("modal") as HTMLDivElement | null;
const gameResult = document.getElementById(
  "gameResult"
) as HTMLSpanElement | null;
const resetButton = document.getElementById(
  "resetBtn"
) as HTMLButtonElement | null;
const restartButton = document.getElementById(
  "restartBtn"
) as HTMLButtonElement | null;
const userScore = document.getElementById(
  "userScore"
) as HTMLSpanElement | null;
const opponentScore = document.getElementById(
  "opponentScore"
) as HTMLSpanElement | null;
let oTurn: boolean;
startGame();

function startGame() {
  oTurn = false;
  modal?.classList.remove("show");
  gameResult?.classList.remove(X_CLASS);
  gameResult?.classList.remove(O_CLASS);
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  board?.classList.add(X_CLASS);
}

function resetGame() {
  xWon = 0;
  oWon = 0;
  if (userScore !== null) userScore.innerText = `${xWon}`;
  if (opponentScore !== null) opponentScore.innerText = `${oWon}`;
  startGame();
}

resetButton?.addEventListener("click", resetGame);
restartButton?.addEventListener("click", startGame);

function handleClick(this: HTMLDivElement) {
  const cell = this;
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

function markIcon(cell: HTMLDivElement, currentClass: string) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  oTurn = !oTurn;
}

function switchBoardHoverClass() {
  board?.classList.remove(X_CLASS);
  board?.classList.remove(O_CLASS);
  if (oTurn) {
    board?.classList.add(O_CLASS);
  } else {
    board?.classList.add(X_CLASS);
  }
}

function checkWin(currentClass: string) {
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

function endGame(draw: boolean) {
  modal?.classList.add("show");
  if (draw) {
    if (gameResult !== null) gameResult.innerText = "Draw!";
  } else {
    if (oTurn) {
      gameResult?.classList.add(O_CLASS);
      if (gameResult !== null) gameResult.innerText = "You lose the game!";
      oWon++;
      if (opponentScore !== null) opponentScore.innerText = `${oWon}`;
    } else {
      gameResult?.classList.add(X_CLASS);
      if (gameResult !== null) gameResult.innerText = "You won the game!";
      xWon++;
      if (userScore !== null) userScore.innerText = `${xWon}`;
    }
  }
}
