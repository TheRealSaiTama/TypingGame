const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const timeEl = document.querySelector(".time span b");
const mistakesEl = document.querySelector(".mistakes span");
const wpmEl = document.querySelector(".wpm span");
const cpmEl = document.querySelector(".cpm span");
const retryBtn = document.querySelector("#retry-btn");
const settingsEl = document.querySelector("#settings");
const gameAreaEl = document.querySelector("#game-area");
const resultsEl = document.querySelector("#results");
const startGameBtn = document.querySelector("#start-game");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const tryAgainBtn = document.querySelector("#try-again");
const newTestBtn = document.querySelector("#new-test");

const finalWpmEl = document.querySelector("#final-wpm");
const accuracyEl = document.querySelector("#accuracy");
const charactersEl = document.querySelector("#characters");
const errorCountEl = document.querySelector("#error-count");
const motivationQuoteEl = document.querySelector("#motivation-quote");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let totalChars = 0;
let correctChars = 0;

const keyClickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/641");
keyClickSound.volume = 0.2;
const errorSound = new Audio("https://www.fesliyanstudios.com/play-mp3/2883");
errorSound.volume = 0.2;
const successSound = new Audio("https://www.fesliyanstudios.com/play-mp3/6569");
successSound.volume = 0.3;
let soundEnabled = true;

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the alphabet at least once.",
  "A journey of a thousand miles begins with a single step. Patience and perseverance are key virtues when learning to type quickly.",
  "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
  "All that glitters is not gold; often have you heard that told. Many a man his life has sold but to behold the golden shine.",
  "The only thing we have to fear is fear itself. Courage is not the absence of fear but rather the judgment that something else is more important.",
  "I think, therefore I am. The mind is a powerful tool that shapes our reality and perception of the world around us.",
  "The pen is mightier than the sword. Words have the power to change minds, inspire action, and shape the course of history.",
  "That's one small step for man, one giant leap for mankind. Progress often comes in increments, but its impact can be immeasurable.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends. Standing up for what is right matters more than comfort.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. Resilience is the key to long-term success and growth.",
  "Happiness can be found even in the darkest of times, if one only remembers to turn on the light. Optimism is a powerful force in our lives.",
  "It does not do to dwell on dreams and forget to live. The present moment is where life happens, not in our thoughts of the past or future.",
  "It is our choices that show what we truly are, far more than our abilities. Character is defined by the decisions we make every day.",
];

const motivationalQuotes = [
  "Great job! Keep practicing to become even faster!",
  "Practice makes perfect! Your typing skills are improving.",
  "Well done! Regular practice will make you a typing master.",
  "Not bad! Come back tomorrow to beat your record.",
  "Awesome work! You're on your way to becoming a speed typing expert!",
  "Good effort! Remember, consistency is key to improving typing speed.",
];

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randomIndex].split("").forEach((char) => {
    typingText.innerHTML += `<span>${char}</span>`;
  });
  const firstChar = typingText.querySelector("span");
  if (firstChar) {
    firstChar.classList.add("active");
  }
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
  inputField.value = "";
  inputField.focus();
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inputField.value;
  if (!isTyping && typedChar.length > 0) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }
  if (charIndex < characters.length && timeLeft > 0) {
    if (typedChar.length === 0) {
      return;
    }
    totalChars++;
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
      characters[charIndex].classList.remove("incorrect", "active");
      correctChars++;
      playSound(keyClickSound);
    } else {
      characters[charIndex].classList.add("incorrect");
      characters[charIndex].classList.remove("correct", "active");
      mistakes++;
      playSound(errorSound);
    }
    charIndex++;
    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    } else {
      finishGame();
    }
    mistakesEl.innerText = mistakes;
    cpmEl.innerText = charIndex - mistakes;
    const elapsedMinutes = (maxTime - timeLeft) / 60;
    let wpmVal = Math.round((charIndex - mistakes) / 5 / (elapsedMinutes || 1));
    wpmVal = wpmVal < 0 || isNaN(wpmVal) || !isFinite(wpmVal) ? 0 : wpmVal;
    wpmEl.innerText = wpmVal;
    inputField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeEl.innerText = timeLeft;
    const wpmVal = Math.round(
      (charIndex - mistakes) / 5 / ((maxTime - timeLeft) / 60)
    );
    wpmEl.innerText = wpmVal < 0 || !wpmVal || wpmVal === Infinity ? 0 : wpmVal;
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  const finalWpm = parseInt(wpmEl.innerText);
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  finalWpmEl.innerText = `${finalWpm} WPM`;
  accuracyEl.innerText = `${accuracy}%`;
  charactersEl.innerText = charIndex;
  errorCountEl.innerText = mistakes;
  let quoteIndex;
  if (finalWpm < 20) quoteIndex = 0;
  else if (finalWpm < 40) quoteIndex = 1;
  else if (finalWpm < 60) quoteIndex = 2;
  else if (finalWpm < 80) quoteIndex = 3;
  else if (finalWpm < 100) quoteIndex = 4;
  else quoteIndex = 5;
  motivationQuoteEl.innerText = motivationalQuotes[quoteIndex];
  gameAreaEl.classList.add("hide");
  resultsEl.classList.remove("hide");
  playSound(successSound);
  saveResult(finalWpm, accuracy, mistakes);
}

function saveResult(wpm, accuracy, mistakes) {
  let history = JSON.parse(localStorage.getItem("typingHistory")) || [];
  const result = {
    date: new Date().toISOString(),
    wpm,
    accuracy,
    mistakes,
    chars: charIndex,
  };
  history.push(result);
  if (history.length > 10) {
    history = history.slice(-10);
  }
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  totalChars = 0;
  correctChars = 0;
  inputField.value = "";
  timeEl.innerText = timeLeft;
  mistakesEl.innerText = 0;
  wpmEl.innerText = 0;
  cpmEl.innerText = 0;
  resultsEl.classList.add("hide");
  gameAreaEl.classList.remove("hide");
}

function startNewGame() {
  settingsEl.classList.add("hide");
  gameAreaEl.classList.remove("hide");
  resetGame();
}

function backToSettings() {
  resultsEl.classList.add("hide");
  gameAreaEl.classList.add("hide");
  settingsEl.classList.remove("hide");
}

function playSound(sound) {
  if (soundEnabled) {
    sound.currentTime = 0;
    sound.play().catch((err) => console.log("Error playing sound:", err));
  }
}

function setDifficulty(time) {
  maxTime = time;
  timeLeft = maxTime;
  timeEl.innerText = timeLeft;
  localStorage.setItem("typingMaxTime", maxTime.toString());
}

inputField.addEventListener("input", initTyping);
retryBtn.addEventListener("click", resetGame);
startGameBtn.addEventListener("click", startNewGame);
tryAgainBtn.addEventListener("click", resetGame);
newTestBtn.addEventListener("click", backToSettings);

difficultyBtns.forEach((button) => {
  button.addEventListener("click", function () {
    difficultyBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    const selectedTime = parseInt(this.dataset.time);
    setDifficulty(selectedTime);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  settingsEl.classList.remove("hide");
  gameAreaEl.classList.add("hide");
  resultsEl.classList.add("hide");
  if ("ontouchstart" in window) {
    soundEnabled = false;
  }
  const storedTime = localStorage.getItem("typingMaxTime");
  if (storedTime) {
    const timeValue = parseInt(storedTime);
    setDifficulty(timeValue);
    difficultyBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.dataset.time) === timeValue) {
        btn.classList.add("active");
      }
    });
  }
  timeEl.innerText = timeLeft;
  loadParagraph();
});

difficultyBtns.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Difficulty selected:", this.dataset.time);
    difficultyBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    const selectedTime = parseInt(this.dataset.time);
    setDifficulty(selectedTime);
  });
});
