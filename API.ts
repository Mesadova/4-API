const url = "https://icanhazdadjoke.com/";
const reportJokes: ratedJoke[] = [];
let currentJoke: string = "";
let rate: number = NaN;

interface ratedJoke {
    joke: string,
    score: number,
    date: string;
}

const nextJokeButton = document.getElementById("nextJoke") as HTMLButtonElement;
const clearButton = document.getElementById("clearRating") as HTMLButtonElement;
const jokePlace = document.getElementById("jokePlace") as HTMLBodyElement;
const starButtons = document.querySelectorAll<HTMLButtonElement>("#r1, #r2, #r3");

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearRating();
})

nextJokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    getJoke();
})

starButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        handleStarButtonClick(3 - index);
    });
});

function handleStarButtonClick(rateValue: number) {
    toggleClearButton(true);
    reportJokes[reportJokes.length -1].score = rateValue;
    console.log(reportJokes);
}

function toggleClearButton(enable: boolean) {
    if (clearButton) {
        clearButton.disabled = !enable;
    }
}

function clearRating() {
    const inputs = document.querySelectorAll<HTMLInputElement>('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
    inputs.forEach(input => {
      input.checked = false;
    });
    toggleClearButton(false);
    reportJokes[reportJokes.length -1].score = NaN;
    console.log(reportJokes);
}

async function getJoke() {
    const inputs = document.querySelectorAll<HTMLInputElement>('.star input[type="radio"]:checked, .star input[type="checkbox"]:checked');
    inputs.forEach(input => {
      input.checked = false;
    });
    toggleClearButton(false);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const responseBody = await response.json();
    currentJoke = responseBody.joke;
    jokePlace.textContent = currentJoke;
    let obj: ratedJoke = {
        joke: currentJoke,
        score: NaN,
        date: Date()
    }
    reportJokes.push(obj);
    console.log(reportJokes);
}

getJoke();
