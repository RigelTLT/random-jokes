import i18Obj from "./translate.js";
const url = 'https://api.icndb.com/jokes/random';
let language = 'en';
const jokeContainer = document.querySelector('.joke');
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
    localStorage.setItem("language", language);
}


function getLocalStorage() {
    if (localStorage.getItem("language")) {
        const language = localStorage.getItem("language");
        getTranslate(language);
    }
}

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    const joke = document.querySelector('h2');
    jokeContainer.style.opacity = '1';
    jokeContainer.style.visibility = 'visible';
    jokeContainer.style.animation = 'null';
    joke.textContent = data.value.joke;
}

async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const joke = document.querySelector('h2');
    jokeContainer.style.opacity = '1';
    jokeContainer.style.visibility = 'visible';
    jokeContainer.style.animation = 'null';
    joke.textContent = data[getRandom(101)].text;
}

function getRandom(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

function changeLanguage(event) {
    if (
        event.target.classList.contains("en") ||
        event.target.classList.contains("ru")
    ) {
        if (event.target.dataset.i18 === "ru") {
            language = "ru";
        }
        if (event.target.dataset.i18 === "en") {
            language = "en";
        }
        const languageItem = document.querySelectorAll(".link__language");
        languageItem.forEach((index) =>
            index.classList.remove("active__language")
        );
        event.target.classList.add("active__language");


        const allLanguage = document.querySelectorAll("[data-i18]");
        allLanguage.forEach(
            (index) =>
            (index.textContent =
                i18Obj[event.target.dataset.i18][index.dataset.i18])
        );
        jokeContainer.style.opacity = '0';
        jokeContainer.style.visibility = 'hidden';
        jokeContainer.style.animation = 'fadein 2s ease-in alternate infinite';
    }
}

function getTranslate(event) {
    const languageItem = document.querySelectorAll(".link__language");
    const selectedLanguage = document.querySelector(`.${event}`);
    languageItem.forEach((index) => index.classList.remove("active__language"));
    selectedLanguage.classList.add("active__language");

    const allLanguage = document.querySelectorAll("[data-i18]");
    allLanguage.forEach(
        (index) =>
        (index.textContent =
            i18Obj[selectedLanguage.dataset.i18][index.dataset.i18])
    );
}

function checkLanguage() {
    if (language === "ru") {
        getQuotes();
    }
    if (language === "en") {
        getData();
    }
}
const cat = document.querySelector(`.cat-bottom`);
let randomCat = 0;
let catForm = ''

function changeCat() {
    if (getComputedStyle(cat).transform.includes('1, -500,')) {
        catRigth();
    }
    if (getComputedStyle(cat).transform.includes('1, 500,')) {
        catLeft();
    }
}

function catRigth() {
    cat.src = '/assets/img/cat_right.png';
    cat.style.transform = 'translateX(200%)';
    randomCat = getRandom(2);
    if (randomCat === 0) {
        catForm = 'cat_lechit.png';
    }
    if (randomCat === 1) {
        catForm = 'cat_sidit.png';
    }
    setTimeout(() => cat.src = `/assets/img/${catForm}`, 2500);
}

function catLeft() {
    cat.src = '/assets/img/cat_left.png';
    cat.style.transform = 'translateX(-200%)';
    randomCat = getRandom(2);
    if (randomCat === 0) {
        catForm = 'cat_lechit.png';
    }
    if (randomCat === 1) {
        catForm = 'cat_sidit.png';
    }
    setTimeout(() => cat.src = `/assets/img/${catForm}`, 2500);
}
const languageList = document.querySelector(".language__items");
languageList.addEventListener("click", changeLanguage);
const buttonJoke = document.querySelector('.joke-btn');
buttonJoke.addEventListener('click', checkLanguage);
cat.addEventListener('mouseover', changeCat);