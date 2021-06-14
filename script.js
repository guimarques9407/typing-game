const word = document.getElementById("word");
const text = document.getElementById("text");
const timeLeft = document.getElementById("time-left");
const score = document.getElementById("score");
const endGame = document.querySelector(".end-game-container");
const difficulty = document.getElementById("difficulty");
const settingsBtn = document.getElementById("settings-btn");
const difficultySettings = document.getElementById("settings");

const level = {
  hard: 1,
  medium: 2,
  easy: 4,
};

// Init time
let time = 10;

const words = [
  "bad",
  "view",
  "world",
  "release",
  "caracteristic",
  "grass",
  "homeland",
  "building",
  "juice",
  "illness",
  "eight",
  "drag",
  'superficial',
  'north',
  'ball',
  'sigh',
  'tense',
  'airplane',
  'silver',
  'admit'
];

text.focus();

function chooseWord() {
  var randomIndex = Math.floor(Math.random() * words.length);
  word.textContent = words[randomIndex];
  text.value = "";
}

function countdown() {
  time--;
  timeLeft.textContent = time + 's';
  if (time == 0) {
    lostTheGame();
  } else setTimeout(countdown, 1000);
}

function lostTheGame() {
  endGame.style.display = "flex";
  endGame.innerHTML = `<h1>Time ran out</h1>
   <p> Your final score is ${score.innerHTML}</p> 
   <button onclick="location.reload()">Reload</button>`;
}
function addTime(seconds) {
  time += seconds;
  timeLeft.textContent = time + 's';
}

function getValueFromStorage() {
  let currentIndex = JSON.parse(localStorage.getItem("selectedIndex"));
  difficulty.selectedIndex = currentIndex;
}

text.addEventListener("keyup", function () {
  if (text.value == word.textContent) {
    addTime(level[difficulty.value]);
    chooseWord();
    score.innerHTML = parseInt(score.innerHTML) + 1;
  }
});

difficulty.addEventListener("change", () => {
  if (localStorage.getItem("selectedIndex") != null) {
    localStorage.clear("selectedIndex");
  }
  localStorage.setItem(
    "selectedIndex",
    JSON.stringify(difficulty.selectedIndex)
  );
});

settingsBtn.addEventListener("click", () => {
  difficultySettings.classList.toggle("hide");
});

getValueFromStorage();
chooseWord();
setTimeout(countdown, 1000);

