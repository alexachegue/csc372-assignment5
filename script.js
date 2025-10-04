// Set up variables and event listeners
const playerChoices = document.querySelectorAll('.choice');
const computerImage = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');
const winsCount = document.getElementById('wins');
const lossesCount = document.getElementById('losses');
const tiesCount = document.getElementById('ties');
const resetButton = document.getElementById('reset-button');

// Keep track of score
let wins = 0;
let losses = 0;
let ties = 0;

// State of game
let isGameInProgress = false;

// Add click listeners to player choices
playerChoices.forEach(choice => {
    choice.addEventListener('click', playerTurn);
});

// Add listener to reset button
resetButton.addEventListener('click', resetScore);

// Handle player choice
function playerTurn(event){
    if(isGameInProgress) return;

    isGameInProgress = true;

    // Get the clicked choice
    const clickedImage = event.currentTarget;
    const playerChoice = clickedImage.dataset.choice;

    // Highlight the selected choice
    removeAllBorders();
    clickedImage.classList.add('selected');

    // Start computer turn
    computerTurn(playerChoice);
}

function removeAllBorders(){
    playerChoices.forEach(choice =>{
        choice.classList.remove('selected');
    });
    computerImage.classList.remove('selected');
}

// Computer turn with shuffling
function computerTurn(playerChoice){
    const choices = ['rock', 'paper', 'scissors'];
    let shuffleCount = 0;
    const totalShuffles = 6;

    const shuffleInterval = setInterval(() =>{
        const randomChoice = choices[Math.floor(Math.random() * 3)];
        computerImage.src = `images/${randomChoice}.png`;
        shuffleCount++;

        // After 3 seconds make a final choice
        if(shuffleCount >= totalShuffles){
            clearInterval(shuffleInterval);
            const finalComputerChoice = choices[Math.floor(Math.random() * 3)];
            computerImage.src = `images/${finalComputerChoice}.png`;

            // Highlight the computer's choice
            computerImage.classList.add('selected');

            // Determine the winnder
            determineWinner(playerChoice, finalComputerChoice);
            isGameInProgress = false;
        }
    }, 500);
}

// Determine the winner
function determineWinner(player, computer){
    let result;

    if(player == computer){
        result = "Tie!";
        ties++;
        tiesCount.textContent = ties;
    }else if (
       (player == 'rock' && computer == 'scissors') || (player == 'paper' && computer == 'rock') || (player == 'scissors' && computer == 'paper'))
    {
        result = "YOU WIN!";
        wins++;
        winsCount.textContent = wins;
    } else{
        result = "YOU LOSSED!";
        losses++;
        lossesCount.textContent = losses;
    }
    resultMessage.textContent = result;
    }

// Reset score
function resetScore(){
    wins = 0;
    losses = 0;
    ties = 0;
    winsCount.textContent = wins;
    lossesCount.textContent = losses;
    tiesCount.textContent = ties;
    resultMessage.textContent = "Make your choice!";
    computerImage.src = "images/question-mark.png";
    removeAllBorders();
}