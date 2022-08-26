const greenBtn = document.getElementById("green-btn");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const yellowBtn = document.getElementById("yellow-btn");
const simonGame = [greenBtn, redBtn, blueBtn, yellowBtn];
let simonChoices = [];
let playerChoices = [];
const startButton = document.querySelector("#start-game-btn");
const pointCounter = document.querySelector(".count-points");
let points = 0;
let round = 1;
const endGameMessage = document.querySelector(".end-game-message");
const openPopup = document.querySelector(".popup");
const overlayPopup = document.querySelector("#overlay");
const hideScores = document.querySelector("#scores");
const closePopupBtn = document.querySelector(".close-button-popup");
const restartGameWithBtn = document.querySelector("#popup-start-btn");

// click event that triggers startGame and sets the counter to 0
startButton.addEventListener("click", () => {
  resetGame();
  startGame();
});

function resetGame() {
  // Reset Simon & Player Choices (in case the user restarts the game)
  simonChoices = [];
  playerChoices = [];
  points = 0;
  round = 1;
}

function startGame() {
  // Creates random choices (just refactored in a separate function to have a better overview)
  createSimonsRandomChoices();

  // Bind the events for the user to click on
  setupPlayerEvents();

  // Starts the game with round 1
  nextRound();

  // Show score counter
  pointCounter.innerHTML = `${points} rounds completed`;
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
  playSound(clickedChoice);
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
    pointCounter.innerHTML = `${points} rounds completed`;

    // Start next round
    nextRound();
  } else {
    endGame();
  }
}

function nextRound() {
  const toDo = document.getElementById("to-do");
  toDo.innerHTML = "Watch and memorize the sequence first!"; // Player gets the instruction

  // Loops over the simon choices from 0 to the number of rounds
  simonChoices.slice(0, round).forEach((simonChoiceId, idx) => {
    // Makes a 1 second break between multiple simon choices pattern for the user to see the visual blink
    setTimeout(() => blinkingEffect(simonChoiceId), (idx + 1) * 1000);
  });

  // Time for the user. Wait 3 seconds or until the user does the clicks to let simon play again
  setTimeout(() => {
    // Reset player choices
    playerChoices = [];
    setupPlayerEvents();
    toDo.innerHTML = "Now its your turn. Play!"; // Player gets the instruction
  }, 3000);
}

function blinkingEffect(simonChoiceId) {
  const simonChoice = document.getElementById(simonChoiceId);

  // let glow the random choices by toggleing the class 0'5 seconds
  simonChoice.classList.toggle("glow");
  playSound(simonChoiceId);
  setTimeout(() => {
    simonChoice.classList.toggle("glow");
  }, 500);
}

function playSound(simonChoiceId) {
  const choiceAudio = document.getElementById("audio-" + simonChoiceId);
  choiceAudio.play();
}

function endGame() {
  if (openPopup == null) return;
  openPopup.classList.add("active");
  overlay.classList.add("active");
  hideScores.classList.toggle("hidden");

  if (points < 3) {
    endGameMessage.innerHTML = `"Dude, you did ${points} rounds. Get a deep breath and concentrate. You got it!"`;
  } else if (3 <= points < 5) {
    endGameMessage.innerHTML = ` "${points} rounds. You still have a big way to win the game. Keep trying!"`;
  } else if (5 <= points < 10) {
    endGameMessage.innerHTML = `"Now we are talking >>  ${points} rounds. You are getting in the flow!"`;
  } else if (10 <= points < 15) {
    endGameMessage.innerHTML = `"Half the way done! >>  ${points} rounds. Just put some more focus and it's yours!"`;
  } else if (15 <= points < 19) {
    endGameMessage.innerHTML = `"Uuuuh ${points} rounds! You are closer than ever. Let's go for the last round!"`;
  } else {
    endGameMessage.innerHTML = `"Wow ${points} rounds! Simon says you are the winner!"`;
  }
}

// POPUP functions and events: add a class that opnes the popup + remove the class to close the popup
closePopupBtn.addEventListener("click", () => {
  closePopup();
  console.log("hola");
});

overlayPopup.addEventListener("click", () => {
  closePopup();
  console.log("hola");
});

restartGameWithBtn.addEventListener("click", () => {
  closePopupStartGame();
  console.log("hola");
});

function closePopup() {
  openPopup.classList.remove("active");
  overlayPopup.classList.remove("active");
  hideScores.classList.remove("hidden");
  resetGame();
}

function closePopupStartGame() {
  openPopup.classList.remove("active");
  overlayPopup.classList.remove("active");
  hideScores.classList.remove("hidden");
  resetGame();
  setTimeout(() => {
    startGame();
  }, 500);
}
