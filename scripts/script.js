let selectedWord = "";
let guessedLetters = [];
let remainingGuesses = 10;
let gameOver = false; // Track the state of the game

const wordDisplay = document.getElementById("word-display");
const alphabetButtons = document.getElementById("alphabet-buttons");
const hangmanImage = document.getElementById("hangman-img");
const message = document.getElementById("message");
const finalImage = document.getElementById("final-image");
const playAgainButton = document.getElementById("play-again");

function startGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  remainingGuesses = 10;
  gameOver = false; // Reset game state
  updateWordDisplay();
  createAlphabetButtons();
  message.textContent = "";
  finalImage.innerHTML = "";
  hangmanImage.src = `images/h-0.jpg`;
  playAgainButton.style.display = "none";
}

function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter.toUpperCase()) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;
}

function createAlphabetButtons() {
  alphabetButtons.innerHTML = "";
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.disabled = guessedLetters.includes(letter) || gameOver; // Disable buttons if game is over
    button.addEventListener("click", () => handleGuess(letter));
    alphabetButtons.appendChild(button);
  });
}

function handleGuess(letter) {
  if (gameOver) return; // Prevent guesses if the game is over

  guessedLetters.push(letter);
  if (selectedWord.toUpperCase().includes(letter)) {
    updateWordDisplay();
    if (!wordDisplay.textContent.includes("_")) {
      message.textContent = "You Win!";
      finalImage.innerHTML = `<img src="images/victory.gif" alt="Victory">`;
      endGame();
    }
  } else {
    remainingGuesses--;
    hangmanImage.src = `images/h-${10 - remainingGuesses}.jpg`;
    if (remainingGuesses === 0) {
      message.textContent = `You Lose! The word was: ${selectedWord}`;
      finalImage.innerHTML = `<img src="images/lost.gif" alt="Lost">`;
      endGame();
    }
  }
  createAlphabetButtons();
}

function endGame() {
  gameOver = true; // Set game state to over
  playAgainButton.style.display = "block";
  const buttons = alphabetButtons.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true; // Disable all buttons
  });
}

playAgainButton.addEventListener("click", startGame);

startGame();
