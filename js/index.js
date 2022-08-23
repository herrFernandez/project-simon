const greenBtn = document.getElementById("green-btn");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const yellowBtn = document.getElementById("yellow-btn");
const simonGame = [greenBtn, redBtn, blueBtn, yellowBtn];
let simonChoices = [];
const startButton = document.querySelector(".btn-start");
const pointCounter = document.querySelector("#count-points");
let points = 0;

// click event that triggers startGame and sets the counter to 0
startButton.addEventListener("click", () => {
  playGame();
  pointCounter.innerHTML = `Your score is: ${points} points`;
  setInterval(() => {
    const randomChoice =
      simonGame[Math.floor(Math.random() * simonGame.length)];
    blinkingEffect(randomChoice);
  }, 1000);
});

function playGame() {
  const toDo = document.getElementById("to-do");
  toDo.innerHTML = "Watch and memorize the sequence first!"; // Player gets the instruction

  let randomSimonChoice;
  for (let i = 0; i <= 19; i++) {
    // loop through the array - You win when you reach 20 combinations
    randomSimonChoice = simonGame[Math.floor(Math.random() * simonGame.length)]; // get the random item
    simonChoices.push(randomSimonChoice); // push the item into the new array
  }

  setTimeout(playerChoices, 10000);
  console.log(simonChoices);
}

function playerChoices() {
  const toDo = document.getElementById("to-do");
  toDo.innerHTML = "Now its your turn. Play!"; // Player gets the instruction
  let buttonClicked = []; // userChoice array

  for (let choice = 0; choice <= buttonClicked.lenght; choice++) {
    simonGame.addEventListener("click", () => {
      buttonClicked.push();
    });
  }

  if (
    JSON.stringify(buttonClicked) ===
    JSON.stringify(simonChoices.slice(0, simonChoices.length))
  ) {
    // KEEP ON PLAYING
  } else {
    endGame();
  }
}

function blinkingEffect(simonChoice) {
  // let glow the random choices by toggleing the class 0'5 seconds
  simonChoice.classList.toggle("glow");
  setTimeout(() => {
    simonChoice.classList.toggle("glow");
  }, 500);
}

function endGame() {
  const endGameMessage = document.querySelector("#points-counted");
  if (points < 3) {
    endGameMessage.innerHTML = `Dude, you did ${points} rounds. Get a deep breath and concentrate. You got it!`;
  } else if (3 <= points < 5) {
    endGameMessage.innerHTML = ` ${points} rounds. You still have a big way to win the game. Keep trying!`;
  } else if (5 <= points < 10) {
    endGameMessage.innerHTML = `Now we are talking >>  ${points} rounds. You are getting in the flow!`;
  } else if (10 <= points < 15) {
    endGameMessage.innerHTML = `Half the way done! >>  ${points} rounds. Just put some more focus and it's yours!`;
  } else if (15 <= points < 19) {
    endGameMessage.innerHTML = `Uuuuh ${points} rounds! You are closer than ever. Let's go for the last round!`;
  } else {
    endGameMessage.innerHTML = `Wow ${points} rounds! Simon says you are the winner!`;
  }
  console.log("hola");
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
