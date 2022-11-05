import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const timePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let timer = null;
const interval = 1000;

startBtn.addEventListener('click', onTimerTrigger);
startBtn.setAttribute('disabled', 'disabled');

const option = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            Notiflix.Notify.success('Push the button');
            selectedDate = selectedDates[0];
            startBtn.removeAttribute('disabled');
        }
    },
};

flatpickr(timePicker, option);

function onTimerTrigger() {
    timer = setInterval(() => {
        const diffDate = selectedDate - new Date();
        startBtn.setAttribute('disabled', 'disabled');
        timePicker.setAttribute('disabled', 'disabled');
        stopTimer(diffDate);
        
        const convertedMs = convertMs(diffDate);
        updateTimer(convertedMs);
    }, interval);
}

function stopTimer(diffDate) {
    if (diffDate <= 1000) {
        clearInterval(timer);
        timePicker.removeAttribute('disabled');
    }
}

function updateTimer({ days, hours, minutes, seconds}) {
    daysEl.textContent = onLeadingZero(days);
    hoursEl.textContent = onLeadingZero(hours);
    minutesEl.textContent = onLeadingZero(minutes);
    secondsEl.textContent = onLeadingZero(seconds);
}

function onLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }