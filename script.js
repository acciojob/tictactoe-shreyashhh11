//your JS code here. If required.
// Game State Variables
let player1 = "";
let player2 = "";
let currentPlayer = 1; // 1 for Player 1 ('x'), 2 for Player 2 ('o')
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

// Winning combinations based on array indices (0-8)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// DOM Elements
const submitBtn = document.getElementById("submit");
const setupSection = document.getElementById("setup-section");
const gameSection = document.getElementById("game-section");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Handle Submit Button Click
submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value || "Player 1";
    player2 = document.getElementById("player-2").value || "Player 2";
    
    // Hide inputs, show board
    setupSection.style.display = "none";
    gameSection.style.display = "block";
    
    // Start game
    gameActive = true;
    updateMessage(`${player1}, you're up`);
});

// Handle Cell Clicks
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const clickedCell = event.target;
    // The id is "1" to "9", so we subtract 1 to get array index "0" to "8"
    const cellIndex = parseInt(clickedCell.id) - 1;

    // Ignore click if cell is already filled or game is over
    if (boardState[cellIndex] !== "" || !gameActive) {
        return;
    }

    // Process the move
    const currentMark = currentPlayer === 1 ? "x" : "o";
    boardState[cellIndex] = currentMark;
    clickedCell.textContent = currentMark;

    // Check if the current move resulted in a win
    checkWinCondition();
}

function checkWinCondition() {
    let roundWon = false;

    // Iterate through all 8 possible winning combinations
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue; // Not a win, move to next condition
        }
        if (a === b && b === c) {
            roundWon = true; // All three match
            break;
        }
    }

    if (roundWon) {
        // Declare winner based on currentPlayer
        const winnerName = currentPlayer === 1 ? player1 : player2;
        updateMessage(`${winnerName} congratulations you won!`);
        gameActive = false;
        return;
    }

    // Check for a draw (if no empty spaces are left)
    if (!boardState.includes("")) {
        updateMessage("It's a draw!");
        gameActive = false;
        return;
    }

    // If no win and no draw, switch turns
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    const nextPlayerName = currentPlayer === 1 ? player1 : player2;
    updateMessage(`${nextPlayerName}, you're up`);
}

function updateMessage(text) {
    messageDiv.textContent = text;
}