const greenBtn = document.getElementById("green-btn");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const yellowBtn = document.getElementById("yellow-btn");
const simonGame = [greenBtn, redBtn, blueBtn, yellowBtn];
let simonChoices = [];
let playerChoices = [];
const startButton = document.querySelector(".btn-start");
const pointCounter = document.querySelector("#count-points");
let points = 0;
let round = 1;

// click event that triggers startGame and sets the counter to 0
startButton.addEventListener("click", () => {
  startGame();
});

function startGame() {
  // Reset Simon Choices (in case the user restartes the game)
  simonChoices = [];

  // Creates random choices (just refactored in a separate function to have a better overview)
  createSimonsRandomChoices();

  // Bind the events for the user to click on
  setupPlayerEvents();

  // Starts the game with round 1
  nextRound();

  // Show score counter
  pointCounter.innerHTML = `Your score is: ${points} points`;
}

function createSimonsRandomChoices() {
  for (let i = 0; i <= 19; i++) {
    // loop through the array - You win when you reach 20 combinations
    const randomSimonChoice =
      simonGame[Math.floor(Math.random() * simonGame.length)]; // get the random item

    simonChoices.push(randomSimonChoice.getAttribute("id")); // push the item id into the new simon choices array
  }
}

function setupPlayerEvents() {
  simonGame.forEach((simonButton) => {
    simonButton.addEventListener("click", handlePlayerButtonClick);
  });
}

function handlePlayerButtonClick(e) {
  const clickedChoice = e.target.getAttribute("id");

  playerChoices.push(clickedChoice);

  if (playerChoices.length !== round) {
    return;
  }

  if (
    JSON.stringify(playerChoices) ===
    JSON.stringify(simonChoices.slice(0, round))
  ) {
    // Raise round number
    round++;

    // Raise points and show updated
    points++;
    pointCounter.innerHTML = `Your score is: ${points} points`;

    // Start next round
    nextRound();
  } else {
    endGame();
  }
}

function nextRound() {
  const toDo = document.getElementById("to-do");
  toDo.innerHTML = "Watch and memorize the sequence first!"; // Player gets the instruction

  // Wait 1 seconds before beginning the user to show the pattern
  setTimeout(() => {
    // Loops over the simon choices from 0 to the number of rounds
    simonChoices.slice(0, round).forEach((simonChoicesRound, idx) => {
      // Makes a 1 second break between multiple simon choices pattern for the user to see the visual blink
      setTimeout(() => blinkingEffect(simonChoicesRound), (idx + 1) * 1000);
    });

    // Reset player choices
    playerChoices = [];

    toDo.innerHTML = "Now its your turn. Play!"; // Player gets the instruction
  }, 1000);
}

function blinkingEffect(simonChoiceId) {
  const simonChoice = document.getElementById(simonChoiceId);

  // let glow the random choices by toggleing the class 0'5 seconds
  simonChoice.classList.toggle("glow");

  setTimeout(() => {
    simonChoice.classList.toggle("glow");
  }, 500);
}

function endGame() {
  const endGameMessage = document.querySelector("#points-counted");

  if (points < 3) {
    pointCounter.innerHTML = `Dude, you did ${points} rounds. Get a deep breath and concentrate. You got it!`;
  } else if (3 <= points < 5) {
    pointCounter.innerHTML = ` ${points} rounds. You still have a big way to win the game. Keep trying!`;
  } else if (5 <= points < 10) {
    pointCounter.innerHTML = `Now we are talking >>  ${points} rounds. You are getting in the flow!`;
  } else if (10 <= points < 15) {
    pointCounter.innerHTML = `Half the way done! >>  ${points} rounds. Just put some more focus and it's yours!`;
  } else if (15 <= points < 19) {
    pointCounter.innerHTML = `Uuuuh ${points} rounds! You are closer than ever. Let's go for the last round!`;
  } else {
    pointCounter.innerHTML = `Wow ${points} rounds! Simon says you are the winner!`;
  }
}

// POPUP functions and events: add a class that opnes the popup + remove the class to close the popup
// startButton.classList.remove("open-popup");??
// How to connect the end game with the open popup function??

const closePopupButton = document.querySelector("#close-button");
const overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  const popups = document.querySelectorAll(".popup.active");
  popups.forEach((popup) => {
    closeModal(popup);
  });
});

closePopupButton.forEach((popup) => {
  popup.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

function openPopup(popup) {
  if (popup == null) return;
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closePopup(popup) {
  if (popup == null) return;
  popup.classList.remove("active");
  overlay.classList.remove("active");
}
