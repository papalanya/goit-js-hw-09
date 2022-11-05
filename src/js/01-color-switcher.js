const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const TIME_DELAY = 1000;
let interval = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    startBtn.disabled = true;
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, TIME_DELAY);
}

function onStopBtnClick() {
    clearTimeout(interval);
    startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
