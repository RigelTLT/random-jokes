import i18Obj from "./translate.js";
const url = 'https://api.icndb.com/jokes/random';
let language = 'en';

function setLocalStorage() {
    localStorage.setItem("language", language);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem("language")) {
        const language = localStorage.getItem("language");
        getTranslate(language);
    }
}
window.addEventListener("load", getLocalStorage);
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    const joke = document.querySelector('h2');
    const jokeContainer = document.querySelector('.joke');
    jokeContainer.style.opacity = '1';
    jokeContainer.style.visibility = 'visible';
    jokeContainer.style.animation = 'null';
    joke.textContent = data.value.joke;
    console.log(data.value.joke);
}

async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const joke = document.querySelector('h2');
    const jokeContainer = document.querySelector('.joke');
    jokeContainer.style.opacity = '1';
    jokeContainer.style.visibility = 'visible';
    jokeContainer.style.animation = 'null';
    joke.textContent = data[getRandom(101)].text;
    console.log(data[getRandom(101)].text);
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

function changeCat() {

    if (cat.src.includes('cat_lechit.png')) {
        catLeft();
        console.log(cat.src);
    }
    if (cat.src.includes('cat_sidit.png')) {
        catRigth();
        console.log(cat.src);
    }
}

function catRigth() {
    cat.src = '/assets/img/cat_right.png';
    cat.style.transform = 'translateX(200%)';
    setTimeout(() => cat.src = '/assets/img/cat_lechit.png', 2500);
}

function catLeft() {
    cat.src = '/assets/img/cat_left.png';
    cat.style.transform = 'translateX(-200%)';
    setTimeout(() => cat.src = '/assets/img/cat_sidit.png', 2500);
}
const languageList = document.querySelector(".language__items");
languageList.addEventListener("click", changeLanguage);
const buttonJoke = document.querySelector('.joke-btn');
buttonJoke.addEventListener('click', checkLanguage);
cat.addEventListener('mouseover', changeCat);