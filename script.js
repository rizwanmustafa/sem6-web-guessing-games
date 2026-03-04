const randomNumberSpan = document.querySelector("#randomNumberSpan");
const submitBtn = document.querySelector("#submitBtn");
const guessInput = document.querySelector("#guessInput");
const feedbackP = document.querySelector("#feedback");
const levelSpan = document.querySelector("#levelSpan");
const rangeSpan = document.querySelector("#rangeSpan");

submitBtn.addEventListener("click", evaluateUserInput);

let randomNumber = generateRandomNumber(1, 10);
let upperRange = 10;
let attempts = 0;
let level = 1;


levelSpan.textContent = level;
randomNumberSpan.textContent = randomNumber;
rangeSpan.textContent = upperRange;




function generateRandomNumber(low, high){
    return Math.round((Math.random() * (high - low) ) + low);
}

function evaluateUserInput(e){
    const userInput = Number(guessInput.value);

    if(userInput === randomNumber){
        level++;
        levelSpan.textContent = level;
        upperRange *= 2
        randomNumber = generateRandomNumber(1, upperRange);
        randomNumberSpan.textContent = randomNumber;
        rangeSpan.textContent = upperRange;
        feedbackP.textContent = "";
    }
    else if (userInput < randomNumber){
        attempts++;
        feedbackP.textContent = "Your guess is too low!";
    }
    else if(userInput > randomNumber){
        attempts++;
        feedbackP.textContent = "Your guess is too high!";
    }
}