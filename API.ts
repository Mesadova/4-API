const url1 = "https://icanhazdadjoke.com/";
const url2 = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist"
let urlJoke: string = '';
const urlMeteo = "http://api.weatherapi.com/v1";

const reportJokes: ratedJoke[] = [];
let currentJoke: string = "";
let responseUrl: string = "";
let rate: number = NaN;

interface ratedJoke {
    joke: string,
    score: number,
    date: string;
}

const nextJokeButton = document.getElementById("nextJoke") as HTMLButtonElement;
const clearButton = document.getElementById("clearRating") as HTMLButtonElement;
const jokePlace = document.getElementById("jokePlace") as HTMLBodyElement;
const jokePlaceUrl = document.getElementById("jokePlaceUrl") as HTMLBodyElement;
const starButtons = document.querySelectorAll<HTMLInputElement>("#r1, #r2, #r3");

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearRating();
})

nextJokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll<HTMLInputElement>('.rating input[type="radio"]:checked, .rating input[type="checkbox"]:checked');
    inputs.forEach(input => {
      input.checked = false;
    });
    toggleClearButton(false);
    getJoke();
})

starButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        handleStarButtonClick(3 - index);
    });
});

function handleStarButtonClick(rateValue: number) {
    toggleClearButton(true);
    if (reportJokes.length > 0) {reportJokes[reportJokes.length -1].score = rateValue};
}

function toggleClearButton(enable: boolean) {
    if (clearButton) {
        clearButton.disabled = !enable;
    }
}

function clearRating() {
    const inputs = document.querySelectorAll<HTMLInputElement>('.rating input[type="radio"]:checked, .rating input[type="checkbox"]:checked');
    inputs.forEach(input => {
      input.checked = false;
    });
    toggleClearButton(false);
    if (reportJokes.length > 0) {reportJokes[reportJokes.length -1].score = NaN};
}

async function getJoke() {
    const inputs = document.querySelectorAll<HTMLInputElement>('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
    inputs.forEach(input => {
      input.checked = false;
    });
    toggleClearButton(false);
    let randomNumber = Math.floor(Math.random() * 4);
    if (randomNumber > 1) {
        let response = await fetch(url1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.json();
        currentJoke = responseBody.joke;
        let obj: ratedJoke = {
            joke: currentJoke,
            score: NaN,
            date: Date()
        }
        reportJokes.push(obj);
        responseUrl = response.url;
        jokePlaceUrl.textContent = responseUrl;
        jokePlace.textContent = currentJoke;
    } else {
        let response = await fetch(url2, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.json();
        if (!responseBody.joke) {
            currentJoke = responseBody.setup + ' ' + responseBody.delivery;
        } else {
            currentJoke = responseBody.joke;
        }
        let obj: ratedJoke = {
            joke: currentJoke,
            score: NaN,
            date: Date()
        }
        reportJokes.push(obj);
        responseUrl = response.url;
        jokePlaceUrl.textContent = responseUrl;
        jokePlace.textContent = currentJoke;
    }
    console.log(reportJokes);
    
    document.body.style.backgroundImage = `url(img/${randomNumber}.jpg)`;
}

async function getWeather() {
    const apiKey = '1fb1a24156d34e3db5681947241610';
    const location = 'Barcelona';
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    let response = await fetch(endpoint);
    console.log(response);
    let data = await response.json();
    const { current: { condition: { text, icon, code }, temp_c }, location: {name, region } } = data;
    console.log(data);
    console.log(text, icon, code);

    const weatherIcon = document.createElement('img');
    const temp = document.createElement('p');
    const cityRegion = document.createElement('p');
    temp.textContent = `${temp_c}°  |  ${text}`;
    cityRegion.textContent = `${name}, ${region}`;
    weatherIcon.src = icon;

    document.getElementById("weatherSection")?.appendChild(weatherIcon);
    document.getElementById("weatherSection")?.appendChild(temp);
    document.getElementById("weatherSection")?.appendChild(cityRegion);
}

function iniciar() {
    getJoke();
    getWeather();
}

iniciar();

