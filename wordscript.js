const randomWordSpan = document.querySelector("#randomWordSpan");
const completeWordSpan = document.querySelector("#completeWordSpan");
const guessInput = document.querySelector("#guessInput");
const feedbackP = document.querySelector("#feedback");
const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", evaluateUserAttempt);

let wordLoading = false;
let word = "";
let hiddenWord = "";
let hiddenIndexArr = [];

async function generateRandomWord() {
  wordLoading = true;
  const wordPromise = await fetch(
    "https://random-word-api.herokuapp.com/word?length=7&diff=1",
  );
  const word = await wordPromise.json();
  wordLoading = false;
  return word[0];
}

async function main() {
  word = await generateRandomWord();
  hiddenIndexArr = generateHiddenIndexArray(word.length, 3);
  hiddenWord = getHiddenWord(word, hiddenIndexArr);
  randomWordSpan.textContent = hiddenWord;
  completeWordSpan.textContent = word;
}

function evaluateUserAttempt() {
  if (wordLoading) return;

  const char = guessInput.value[0];
  console.log(char);
  let correctGuess = false;

  let i = 0;
  while (i < hiddenIndexArr.length) {
    if (word[hiddenIndexArr[i]] == char) {
      correctGuess = true;
      hiddenIndexArr.splice(i,1);
      i = 0;
      console.log(i, hiddenIndexArr);
    }
    i++;
  }
  hiddenWord = getHiddenWord(word, hiddenIndexArr);
  randomWordSpan.textContent = hiddenWord;
  completeWordSpan.textContent = word;

  if (correctGuess) {
      if (hiddenIndexArr.length == 0) {
        feedbackP.textContent = "Word Completed!";
          setTimeout(async () => {
              feedbackP.textContent = "Loading...";
              await main();
              feedbackP.textContent = "";
            }, 1000);
        }
        else 
        feedbackP.textContent = "Correct Guess!";
  } else {
    feedbackP.textContent = "Try again!";
  }
}

function generateRandomNumber(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function generateHiddenIndexArray(wordLength, maxHiddenCount) {
  console.log(wordLength, maxHiddenCount);
  let hideCount = generateRandomNumber(1, maxHiddenCount);
  let hiddenIndexArr = [];

  for (let i = 0; i < hideCount; i++) {
    let randomNum = NaN;

    let found = true;
    while (found) {
      found = false;
      randomNum = generateRandomNumber(0, wordLength - 1);

      for (let j = 0; j < i; j++) {
        if (randomNum == hiddenIndexArr[j]) {
          found = true;
          break;
        }
      }
    }
    hiddenIndexArr.push(randomNum);
  }

  return hiddenIndexArr;
}

function getHiddenWord(word, hiddenIndexArr) {
  let newWord = "";

  for (let i = 0; i < word.length; i++) {
    if (hiddenIndexArr.indexOf(i) != -1) newWord += "_";
    else newWord += word[i];
  }

  return newWord;
}

main();
