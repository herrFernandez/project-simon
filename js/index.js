const greenBtn = document.getElementById("green-btn");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const yellowBtn = document.getElementById("yellow-btn");
const simonGame = [greenBtn, redBtn, blueBtn, yellowBtn];
const startButton = document.querySelector(".btn-start");
const pointCounter = document.querySelector("#count-points");
let points = 0;

// click event that triggers startGame and sets the counter to -
// startButton.addEventListener("click", () => {
//   playGame();
//   pointCounter.innerHTML = `Your score is: ${points} points`;
// });

function playGame() {
  const toDo = document.getElementById("to-do");
  toDo.innerHTML = "Watch and memorize the sequence first!"; // Player gets the instruction
  let simonChoices = [];
  let randomSimonChoice;
  for (let counter = 0; counter <= 19; counter++) {
    // loop through the array - You win when you reach 20 combinations
    randomSimonChoice = simonGame[Math.floor(Math.random() * simonGame.length)]; // get the random item
    simonChoices.push(randomSimonChoice); // push the item into the new array
  }

  console.log(simonChoices);
}

function playerChoices() {}

// let playerChoices = [];
// if (playerChoices === simonChoices) {
//   continueplaying
// } else {
//   game over
// }

function blinkingEffect(simonChoice) {
  if (simonChoice === "green") {
    greenBtn.style.backgroundColor = "#49e48a";
    setTimeout(() => {
      greenBtn.style.backgroundColor = "green";
    }, 500);
  } else if (simonChoice === "red") {
    redBtn.style.backgroundColor = "#e74c3c";

    setTimeout(() => {
      redBtn.style.backgroundColor = "red";
    }, 500);
  } else if (simonChoice === "yellow") {
    yellowBtn.style.backgroundColor = "#f1c40f";
    setTimeout(() => {
      yellowBtn.style.backgroundColor = "yellow";
    }, 500);
  } else if (simonChoice === "blue") {
    blueBtn.style.backgroundColor = "#3498db";
    setTimeout(() => {
      blueBtn.style.backgroundColor = "blue";
    }, 500);
  }
}

startButton.addEventListener("click", () => {
  const colors = ["green", "red", "blue", "yellow"];
  const randomChoice = colors[Math.floor(Math.random() * colors.length)];
  blinkingEffect(randomChoice);
});
