"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://icanhazdadjoke.com/";
const reportJokes = [];
let currentJoke = "";
let rate = NaN;
const nextJokeButton = document.getElementById("nextJoke");
const clearButton = document.getElementById("clearRating");
const jokePlace = document.getElementById("jokePlace");
const starButtons = document.querySelectorAll("#r1, #r2, #r3");
clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearRating();
});
nextJokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    getJoke();
});
starButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        handleStarButtonClick(3 - index);
    });
});
function handleStarButtonClick(rateValue) {
    toggleClearButton(true);
    reportJokes[reportJokes.length - 1].score = rateValue;
    console.log(reportJokes);
}
function toggleClearButton(enable) {
    if (clearButton) {
        clearButton.disabled = !enable;
    }
}
function clearRating() {
    const inputs = document.querySelectorAll('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
    inputs.forEach(input => {
        input.checked = false;
    });
    toggleClearButton(false);
    reportJokes[reportJokes.length - 1].score = NaN;
    console.log(reportJokes);
}
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = document.querySelectorAll('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
        inputs.forEach(input => {
            input.checked = false;
        });
        toggleClearButton(false);
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const responseBody = yield response.json();
        currentJoke = responseBody.joke;
        jokePlace.textContent = currentJoke;
        let obj = {
            joke: currentJoke,
            score: NaN,
            date: Date()
        };
        reportJokes.push(obj);
        console.log(reportJokes);
    });
}
getJoke();
