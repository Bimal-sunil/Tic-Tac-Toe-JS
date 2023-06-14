"use strict";
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
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("show");
    gameResult === null || gameResult === void 0 ? void 0 : gameResult.classList.remove(X_CLASS);
    gameResult === null || gameResult === void 0 ? void 0 : gameResult.classList.remove(O_CLASS);
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    board === null || board === void 0 ? void 0 : board.classList.add(X_CLASS);
}
function resetGame() {
    xWon = 0;
    oWon = 0;
    if (userScore !== null)
        userScore.innerText = `${xWon}`;
    if (opponentScore !== null)
        opponentScore.innerText = `${oWon}`;
    startGame();
}
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", resetGame);
restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", startGame);
function handleClick() {
    const cell = this;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    markIcon(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (checkDraw()) {
        endGame(true);
    }
    else {
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
    board === null || board === void 0 ? void 0 : board.classList.remove(X_CLASS);
    board === null || board === void 0 ? void 0 : board.classList.remove(O_CLASS);
    if (oTurn) {
        board === null || board === void 0 ? void 0 : board.classList.add(O_CLASS);
    }
    else {
        board === null || board === void 0 ? void 0 : board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => combination.every((index) => cellElements[index].classList.contains(currentClass)));
}
function checkDraw() {
    return [...cellElements].every((cell) => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
}
function endGame(draw) {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("show");
    if (draw) {
        if (gameResult !== null)
            gameResult.innerText = "Draw!";
    }
    else {
        if (oTurn) {
            gameResult === null || gameResult === void 0 ? void 0 : gameResult.classList.add(O_CLASS);
            if (gameResult !== null)
                gameResult.innerText = "You lose the game!";
            oWon++;
            if (opponentScore !== null)
                opponentScore.innerText = `${oWon}`;
        }
        else {
            gameResult === null || gameResult === void 0 ? void 0 : gameResult.classList.add(X_CLASS);
            if (gameResult !== null)
                gameResult.innerText = "You won the game!";
            xWon++;
            if (userScore !== null)
                userScore.innerText = `${xWon}`;
        }
    }
}
