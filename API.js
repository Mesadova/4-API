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
const url1 = "https://icanhazdadjoke.com/";
const url2 = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist";
let urlJoke = '';
const urlMeteo = "http://api.weatherapi.com/v1";
const reportJokes = [];
let currentJoke = "";
let responseUrl = "";
let rate = NaN;
const nextJokeButton = document.getElementById("nextJoke");
const clearButton = document.getElementById("clearRating");
const jokePlace = document.getElementById("jokePlace");
const jokePlaceUrl = document.getElementById("jokePlaceUrl");
const starButtons = document.querySelectorAll("#r1, #r2, #r3");
clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearRating();
});
nextJokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.rating input[type="radio"]:checked, .rating input[type="checkbox"]:checked');
    inputs.forEach(input => {
        input.checked = false;
    });
    toggleClearButton(false);
    getJoke();
});
starButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        handleStarButtonClick(3 - index);
    });
});
function handleStarButtonClick(rateValue) {
    toggleClearButton(true);
    if (reportJokes.length > 0) {
        reportJokes[reportJokes.length - 1].score = rateValue;
    }
    ;
}
function toggleClearButton(enable) {
    if (clearButton) {
        clearButton.disabled = !enable;
    }
}
function clearRating() {
    const inputs = document.querySelectorAll('.rating input[type="radio"]:checked, .rating input[type="checkbox"]:checked');
    inputs.forEach(input => {
        input.checked = false;
    });
    toggleClearButton(false);
    if (reportJokes.length > 0) {
        reportJokes[reportJokes.length - 1].score = NaN;
    }
    ;
}
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = document.querySelectorAll('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
        inputs.forEach(input => {
            input.checked = false;
        });
        toggleClearButton(false);
        let randomNumber = Math.floor(Math.random() * 4);
        if (randomNumber > 1) {
            let response = yield fetch(url1, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const responseBody = yield response.json();
            currentJoke = responseBody.joke;
            let obj = {
                joke: currentJoke,
                score: NaN,
                date: Date()
            };
            reportJokes.push(obj);
            responseUrl = response.url;
            jokePlaceUrl.textContent = responseUrl;
            jokePlace.textContent = currentJoke;
        }
        else {
            let response = yield fetch(url2, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const responseBody = yield response.json();
            if (!responseBody.joke) {
                currentJoke = responseBody.setup + ' ' + responseBody.delivery;
            }
            else {
                currentJoke = responseBody.joke;
            }
            let obj = {
                joke: currentJoke,
                score: NaN,
                date: Date()
            };
            reportJokes.push(obj);
            responseUrl = response.url;
            jokePlaceUrl.textContent = responseUrl;
            jokePlace.textContent = currentJoke;
        }
        console.log(reportJokes);
        document.body.style.backgroundImage = `url(img/${randomNumber}.jpg)`;
    });
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const apiKey = '1fb1a24156d34e3db5681947241610';
        const location = 'Barcelona';
        const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
        let response = yield fetch(endpoint);
        console.log(response);
        let data = yield response.json();
        const { current: { condition: { text, icon, code }, temp_c }, location: { name, region } } = data;
        console.log(data);
        console.log(text, icon, code);
        const weatherIcon = document.createElement('img');
        const temp = document.createElement('p');
        const cityRegion = document.createElement('p');
        temp.textContent = `${temp_c}°  |  ${text}`;
        cityRegion.textContent = `${name}, ${region}`;
        weatherIcon.src = icon;
        (_a = document.getElementById("weatherSection")) === null || _a === void 0 ? void 0 : _a.appendChild(weatherIcon);
        (_b = document.getElementById("weatherSection")) === null || _b === void 0 ? void 0 : _b.appendChild(temp);
        (_c = document.getElementById("weatherSection")) === null || _c === void 0 ? void 0 : _c.appendChild(cityRegion);
    });
}
function iniciar() {
    getJoke();
    getWeather();
}
iniciar();
